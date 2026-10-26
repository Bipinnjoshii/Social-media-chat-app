import { GLOBALTYPES } from '../actions/globalTypes';

const getInitialAuthState = () => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (
        token &&
        userStr &&
        token !== "undefined" &&
        token !== "null" &&
        userStr !== "undefined" &&
        userStr !== "null"
      ) {
        const user = JSON.parse(userStr);
        if (user && user._id) {
          return { token, user };
        }
      }
    }
  } catch (e) {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {}
  }
  return {};
};

const initialState = getInitialAuthState();

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case GLOBALTYPES.AUTH:
        return action.payload;

      default:
        return state;
    }
}

export default authReducer;
