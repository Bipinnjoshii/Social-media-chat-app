import { GLOBALTYPES } from '../actions/globalTypes';

const getInitialAuthState = () => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        return { token, user: JSON.parse(userStr) };
      }
    }
  } catch (e) {}
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
