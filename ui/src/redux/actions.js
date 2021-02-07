import { 
    ADD_FEATURE, 
    GET_FEATURES,
    TOGGLE_FEATURE,
} from './actionTypes';

export const addFeature = feature => ({
    type: ADD_FEATURE,
    payload: { ...feature },
})

export const getFeatures = () => ({
    type: GET_FEATURES,
    payload: {},
})

export const toggleFeature = feature => ({
    type: TOGGLE_FEATURE,
    payload: { ...feature },
})
