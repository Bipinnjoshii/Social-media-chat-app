import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = auth && auth.user;
  const username = (user && user.username) || "Chirper";
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
          aria-label="Start a new chirp post"
        >
          <span>
            What's on your mind, {username}? Start a chirp...
          </span>
        </button>
      </div>

      <div className="status_action_row mt-3 pt-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-1">
          <button
            type="button"
            className="status_quick_action"
            onClick={handleOpenStatus}
            title="Attach Media"
          >
            <i className="fas fa-images me-2" style={{ color: "var(--primary)" }} />
            <span>Photo / Video</span>
          </button>

          <button
            type="button"
            className="status_quick_action"
            onClick={handleOpenStatus}
            title="Live Stream / Camera"
          >
            <i className="fas fa-camera text-info me-2" />
            <span>Camera</span>
          </button>

          <button
            type="button"
            className="status_quick_action"
            onClick={handleOpenStatus}
            title="Share Code or Project Highlight"
          >
            <i className="fas fa-code text-warning me-2" />
            <span>Snippet</span>
          </button>
        </div>

        <button
          type="button"
          className="btn_chirp_mini_post"
          onClick={handleOpenStatus}
        >
          <i className="fas fa-feather-alt me-1" />
          <span>Chirp</span>
        </button>
      </div>
    </div>
  );
};

export default Status;
