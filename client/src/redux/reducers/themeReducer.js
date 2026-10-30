import { GLOBALTYPES } from "../actions/globalTypes";

const getInitialTheme = () => {
  try {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) return savedTheme === "true";
      // Default to dark mode for Chirp's signature obsidian experience
      return true;
    }
  } catch (e) {}
  return true;
};

const initialState = getInitialTheme();

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", action.payload);
        }
      } catch (e) {}
      return action.payload;

    default:
      return state;
  }
};

export default themeReducer;
