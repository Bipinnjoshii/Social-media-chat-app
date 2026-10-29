import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = auth && auth.user;
  const username = (user && user.username) || "Student";
  const avatar = user && user.avatar;

  return (
    <div className="status my-3 d-flex align-items-center">
      <div className="avatar_wrapper me-2">
        <Avatar src={avatar} size="big-avatar" />
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="statusBtn flex-fill text-start px-4"
        aria-label="Create a new post"
      >
        <span>
          {username}, share a project, critique, or update...
        </span>
      </button>
    </div>
  );
};

export default Status;
