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
    feature_id="$1"
    user_id="$2"
}