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

let features = {
    "pr_ui_designer_hint": {
      key: "pr_ui_designer_hint",
      description: "Users get hint notifications to tag UI designers on PRs",
      enabled: true,
      users: [
        "cessien",
        "sma",
        "-flam"
      ],
      groups: [
        "early-adopters"
      ],
      percentage: 75
    },
    "app_some_feature": {
      key: "app_some_feature",
      description: "Some feature we want to control",
      enabled: false,
      users: [
        "hermione",
        "sma",
        "-flam",
        "remi",
        "-scarface"
      ],
      groups: [
      ],
      percentage: 10
    },
  }

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
