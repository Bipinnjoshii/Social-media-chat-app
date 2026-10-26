import { GLOBALTYPES } from "../actions/globalTypes";

const getInitialUserType = () => {
  try {
    if (typeof window !== "undefined") {
      const ut = localStorage.getItem("userType");
      if (ut) return ut;
    }
  } catch (e) {}
  return "user";
};

const userTypeReducer = (state = getInitialUserType(), action) => {
  switch (action.type) {
    case GLOBALTYPES.USER_TYPE:
      return action.payload;

    default:
      return state;
  }
};

export default userTypeReducer;
