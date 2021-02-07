import { ADD_FEATURE, GET_FEATURES, TOGGLE_FEATURE } from "../actionTypes";

const initialState = {
  features: [],
};

let features = [
    {
      key: "pr.ui-designer-hint",
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
    {
      key: "app.some-feature",
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
]

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FEATURE: {
      features = [...features, action.payload]
      return {
        ...state,
        features: features
      };
    }
    case GET_FEATURES: {
        // refresh from server
        return {
            ...state,
            features: features
        }
    }
    case TOGGLE_FEATURE: {
      // set a feature toggle state
      var s = {...state}
      s.features[action.payload.row].enabled = action.payload.enabled;
      return s
  }
    default:
      return state;
  }
}
