const initialState = {
  settings: {
    API_URL: "https://tiny-be.herokuapp.com",
    bypassLANCache: Date.now(), //I will use timestamp only to bypass if you have cache server inplace in local area network
    appName: "TINY",
  },
  loggedInUser: localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : {}, //hold the current logged in user
  stories: [],
  storiesByID: [],
  users: [],
  isLoading: false,
  viewedUser: [],
  viewedUserStories: [],
  follows: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };

    case "SET_LOGGED_IN_USER":
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      return { ...state, loggedInUser: action.payload };

    case "LOGOUT":
      localStorage.removeItem("loggedInUser");
      return { ...state, loggedInUser: {} };

    case "LOAD_STORIES":
      return { ...state, stories: action.payload };

    case "LOAD_STORY_BY_ID":
      return { ...state, storiesByID: action.payload, isLoading: true };

    case "LOAD_USERS":
      return { ...state, users: action.payload };

    case "LOAD_VIEWED_USER_STORIES":
      return { ...state, viewedUserStories: action.payload };

    case "LOAD_VIEWED_USER":
      return { ...state, viewedUser: action.payload };

    case "LOAD_UPDATED_LOGGEDINUSER":
      return { ...state, loggedInUser: action.payload };

    case "LOAD_VIEWED_USER_FOLLOWS":
      return { ...state, follows: action.payload}

    default:
      return state;
  }
};

export default reducer;
