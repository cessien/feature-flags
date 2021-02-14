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

export const removeFeature = feature => {}

export const getFeatures = () => ({
    type: GET_FEATURES,
    payload: {},
})

export const toggleFeature = async (feature, status) => ({
    type: TOGGLE_FEATURE,
    payload: {
        key: feature.key,
        enabled: status,
    },
})

export const addGroupToFeature = (feature, group) => {}

export const removeGroupFromFeature = (feature, group) => {}

export const addUserToFeature = (feature, user) => {}

export const removeUserFromFeature = (feature, user) => {}

export const setFeaturePercentage = (feature, percentage) => {}
