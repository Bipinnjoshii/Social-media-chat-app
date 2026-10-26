import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import valid from "../../utils/valid";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("userType", res.data.user.role || "user");
    localStorage.setItem("firstLogin", "true");

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response ? err.response.data.msg : err.message },
    });
  }
};

export const changePassword = ({oldPassword, newPassword, cnfNewPassword, auth}) => async (dispatch) => {
  if(!oldPassword || oldPassword.length === 0){
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please enter your old password." },
    });
  }
  if(!newPassword || newPassword.length === 0){
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please enter your new password." },
    });
  }
  if(!cnfNewPassword || cnfNewPassword.length === 0){
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please confirm your new password." },
    });
  }
  if(newPassword !== cnfNewPassword){
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Your passwords do not match." },
    });
  }
  
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} });
    const res = await postDataAPI('changePassword', {oldPassword, newPassword}, auth.token );
    dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false, success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response ? err.response.data.msg : err.message },
    });
  }
};

export const adminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("admin_login", data);

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("userType", res.data.user.role || "admin");
    localStorage.setItem("firstLogin", "true");

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response ? err.response.data.msg : err.message },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const storedUserType = localStorage.getItem("userType");

  if (token && storedUser) {
    try {
      const user = JSON.parse(storedUser);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token, user },
      });
      dispatch({
        type: GLOBALTYPES.USER_TYPE,
        payload: storedUserType || user.role,
      });
    } catch (e) {
      console.error(e);
    }
  }

  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const res = await postDataAPI("refresh_token");
      if (res && res.data && res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userType", res.data.user.role || "user");

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: { token: res.data.access_token, user: res.data.user },
        });

        dispatch({
          type: GLOBALTYPES.USER_TYPE,
          payload: res.data.user.role,
        });
      }
    } catch (err) {
      // Cross-origin cookie refresh might be restricted in some browsers; localStorage token handles session
      console.log("Cookie refresh fallback to local session");
    }
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("userType", res.data.user.role || "user");
    localStorage.setItem("firstLogin", "true");

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });

    dispatch({
      type: GLOBALTYPES.USER_TYPE,
      payload: res.data.user.role,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response ? err.response.data.msg : err.message },
    });
  }
};

export const registerAdmin = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register_admin", data);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response ? err.response.data.msg : err.message },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    window.location.href = "/";
  }
};
