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

  const handleOpenStatus = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: true });
  };

  return (
    <div className="status_creator_card my-3">
      <div className="status_input_row d-flex align-items-center">
        <div className="avatar_wrapper me-3">
          <Avatar src={avatar} size="big-avatar" />
        </div>
        <button
          type="button"
          onClick={handleOpenStatus}
          className="status_input_btn flex-fill text-start"
          aria-label="Create a new project or status post"
        >
          <span>
            {username}, share a project draft, critique request, or studio update...
          </span>
        </button>
      </div>

      <div className="status_action_row mt-3 pt-2 d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="status_quick_action"
          onClick={handleOpenStatus}
        >
          <i className="fas fa-images me-2" style={{ color: "var(--primary)" }} />
          <span>Photo / Video</span>
        </button>

        <button
          type="button"
          className="status_quick_action"
          onClick={handleOpenStatus}
        >
          <i className="fas fa-camera text-success me-2" />
          <span>Camera Stream</span>
        </button>

        <button
          type="button"
          className="status_quick_action"
          onClick={handleOpenStatus}
        >
          <i className="fas fa-layer-group text-warning me-2" />
          <span>Project Critique</span>
        </button>
      </div>
    </div>
  );
};

export default Status;
