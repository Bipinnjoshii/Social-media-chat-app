import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = auth && auth.user;
  const username = (user && user.username) || "Friend";
  const avatar = user && user.avatar;

  return (
    <div className="status my-3 d-flex align-items-center">
      <div className="outer-shadow big-avatar-cover">
        <Avatar src={avatar} size="big-avatar" />
      </div>
      <button
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="btn-1 outer-shadow hover-in-shadow statusBtn flex-fill text-start px-4"
        style={{ marginLeft: "12px", borderRadius: "14px", height: "50px" }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          {username}, what's on your mind?
        </span>
      </button>
    </div>
  );
};

export default Status;
