import { 
  ADD_FEATURE, 
  GET_FEATURES, 
  REMOVE_FEATURE, 
  TOGGLE_FEATURE, 
  UPDATE_FEATURE_GROUPS, 
  UPDATE_FEATURE_USERS, 
  UPDATE_FEATURE_PERCENTAGE 
} from "../actionTypes";

const initialState = {
  features: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FEATURE: {
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: {
            ...action.payload,
          },
        },
      };
    }
    case REMOVE_FEATURE: {
      return {
        ...state,
        features: Object.keys(state.features).reduce((result, key) => {
          if (key !== action.payload.key) {
            result[key] = state.features[key];
          }

          return result;
        }, {})
      }
    }
    case GET_FEATURES: {
        return {
          ...state,
          ...action.payload
        };
    }
    case TOGGLE_FEATURE: {
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: {
            ...state.features[action.payload.key],
            enabled: action.payload.enabled,
          }
        }
      };
    }
    case UPDATE_FEATURE_GROUPS: {
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: {
            ...state.features[action.payload.key],
            groups: action.payload.groups,
          }
        }
      }
    }
    case UPDATE_FEATURE_USERS: {
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: {
            ...state.features[action.payload.key],
            users: action.payload.users,
          }
        }
      }
    }
    case UPDATE_FEATURE_PERCENTAGE: {
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: {
            ...state.features[action.payload.key],
            percentage: action.payload.percentage,
          }
        }
      }
    }
    default:
      return state;
  }
}
