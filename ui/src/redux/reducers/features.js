import { ADD_FEATURE, GET_FEATURES, TOGGLE_FEATURE } from "../actionTypes";

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
      const encaped = {}
      encaped[action.payload.key] = action.payload
 
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
    case GET_FEATURES: {
        // refresh from server
        return {
          ...state,
          features: {...features}
        };
    }
    case TOGGLE_FEATURE: {
      // set a feature toggle state
      state.features[action.payload.key].enabled = action.payload.enabled;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
