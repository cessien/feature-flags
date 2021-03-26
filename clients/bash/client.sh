#!/bin/bash

function feature_flag_setup 
{
    curl_location=$(which curl)
    if [ -z "$curl_location" ]; then
        echo "curl is needed";
        return 1
    else
        echo "found curl at $curl_location"
    fi

    jq_location=$(which jq)
    if [ -z "$jq_location" ]; then
        echo "jq is needed";
        return 1
    else
        echo "found jq at $jq_location"
    fi
    
    server_url="$1"
    if [ -z "$server_url" ]; then
        echo "server_url wasn't provided"
        return 1
    fi

    export FEATURE_FLAG_SERVER_URL=$server_url
}

function feature_enabled
{
    feature_key="$1" # the key to check, if the key doesn't exist or the call fails will return the default $4
    user_id="$2" # the user to check access against. just pass in "" to send a blank token if none
    groups="$3" # a comma separated list of groups to check access. only one needs to match here
    default="${4:0}" # if the call fails or no value is found, return this default truthy/ falsey value (0 or 1, defaults to 0)
    
    IFS=',' read -r -a groups <<< "$groups"

    json="{}"
    if [ ! -z "$user_id" ]; then
        json=$(echo $json | jq --arg user_id $user_id '. + {user: $user_id}')
    fi

    for group in "${groups[@]}"
    do
        json=$(echo $json | jq --arg group $group '.groups += [$group]')
    done

    json=$(echo $json | jq -c '.')

    response=$(curl -s -XPOST -d "$json" "$FEATURE_FLAG_SERVER_URL/features/${feature_key}/access" 2>/dev/null)
    # echo "curl -s -XPOST -d \"$json\" \"$FEATURE_FLAG_SERVER_URL/features/${feature_key}/access\" 2>/dev/null"
    retVal=$?
    if [ $retVal -ne 0 ]; then
        echo "error requesting feature access for $feature_key defaulting to $default"
        return $default
    fi

    response=$(echo $response | jq '.status')
    if [[ "$response" == *"feature_not_found"* ]] || [[ "$response" == *"invalid_json"* ]]; then
        echo "$response, for $feature_key returning default $default"
        return $default
    else
        echo "$response ($feature_key)"
        if [[ "$response" == *"has_access"* ]]; then
            return 1
        else
            return 0
        fi
    fi

    return $default
}