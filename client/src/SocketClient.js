import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { ADMIN_TYPES } from "./redux/actions/adminAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";
import { MESSAGE_TYPES } from "./redux/actions/messageAction";

import audioTone from "./audio/pristine-609.mp3";

const spawnNotification = (body, icon, url, title) => {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    let options = { body, icon };
    let n = new Notification(title, options);
    n.onclick = (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    };
  } catch (e) {
    console.error("spawnNotification error:", e);
  }
};

const SocketClient = () => {
  const { auth, socket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const audioRef = useRef();

  // If socket is not yet initialized or connected, do not render or attach listeners
  const hasValidSocket = Boolean(
    socket &&
    typeof socket.on === "function" &&
    typeof socket.emit === "function"
  );

  //!connection
  useEffect(() => {
    if (!hasValidSocket || !auth || !auth.user) return;
    if (auth.user.role === "user") {
      socket.emit("joinUser", auth.user._id);
    } else if (auth.user.role === "admin") {
      socket.emit("joinAdmin", auth.user._id);
    }
  }, [hasValidSocket, socket, auth]);

  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("getActiveUsersToClient", (totalActiveUsers) => {
      dispatch({
        type: ADMIN_TYPES.GET_TOTAL_ACTIVE_USERS,
        payload: totalActiveUsers,
      });
    });
    return () => socket.off && socket.off("getActiveUsersToClient");
  }, [hasValidSocket, socket, dispatch]);

  //!like Post
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off && socket.off("likeToClient");
  }, [hasValidSocket, socket, dispatch]);

  //!Unlike Post
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off && socket.off("unLikeToClient");
  }, [hasValidSocket, socket, dispatch]);

  //!Comments
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off && socket.off("createCommentToClient");
  }, [hasValidSocket, socket, dispatch]);

  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off && socket.off("deleteCommentToClient");
  }, [hasValidSocket, socket, dispatch]);

  //!Follow
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });
    return () => socket.off && socket.off("followToClient");
  }, [hasValidSocket, socket, dispatch, auth]);

  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("unFollowToClient", (newUser) => {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, user: newUser },
      });
    });
    return () => socket.off && socket.off("unFollowToClient");
  }, [hasValidSocket, socket, dispatch, auth]);

  //!Notifications
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });

      if (notify && notify.sound && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      if (msg && msg.user) {
        spawnNotification(
          (msg.user.username || "") + " " + (msg.text || ""),
          msg.user.avatar || "",
          msg.url || "",
          "Chirp"
        );
      }
    });
    return () => socket.off && socket.off("createNotifyToClient");
  }, [hasValidSocket, socket, dispatch, notify]);

  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });
    return () => socket.off && socket.off("removeNotifyToClient");
  }, [hasValidSocket, socket, dispatch]);

  //!Messages
  useEffect(() => {
    if (!hasValidSocket) return;
    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
    });
    return () => socket.off && socket.off("addMessageToClient");
  }, [hasValidSocket, socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
