import { 
    GET_FEATURES,
    ADD_FEATURE,
    REMOVE_FEATURE,
    TOGGLE_FEATURE,
    UPDATE_FEATURE_GROUPS,
    UPDATE_FEATURE_USERS,
    UPDATE_FEATURE_PERCENTAGE,
} from './actionTypes';

export const addFeature = feature => ({
    type: ADD_FEATURE,
    payload: feature,
})

export const removeFeature = feature => ({
    type: REMOVE_FEATURE,
    payload: feature,
})

export const getFeatures = () => ({
    type: GET_FEATURES,
    payload: {},
})

export const toggleFeature = (key, status) => ({
    type: TOGGLE_FEATURE,
    payload: {
        key: key,
        enabled: status,
    },
})

export const updateFeatureGroups = (key, groups) => ({
    type: UPDATE_FEATURE_GROUPS,
    payload: {
        key: key,
        groups: groups,
    }
})

export const updateFeatureUsers = (key, users) => ({
    type: UPDATE_FEATURE_USERS,
    payload: {
        key: key,
        users: users,
    }
})

export const setFeaturePercentage = (key, percentage) => ({
    type: UPDATE_FEATURE_PERCENTAGE,
    payload: {
        key: key,
        percentage: percentage,
    }
})
