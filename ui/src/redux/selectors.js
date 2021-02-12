export const getAllFeatures = store => store.featuresReducer;

export const getFeatureByRow = (store, key) => store.featuresReducer.features.features[key];