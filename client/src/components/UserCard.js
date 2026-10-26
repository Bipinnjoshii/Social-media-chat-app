import React from 'react';
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg
}) => {

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex justify-content-between p-2 w-100 align-items-center ${border || ""}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center text-decoration-none"
        >
          <div className="big-avatar-cover">
            <Avatar src={user.avatar} size="big-avatar" />
          </div>
          <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block fw-bold text-main" style={{ color: "var(--text-main)" }}>
              {user.username}
            </span>

            <small className="d-flex text-muted" style={{ flexWrap: "wrap", color: "var(--text-muted)" }}>
              {msg ? (
                <>
                  <div>{user.text}</div>
                  {user.media && user.media.length > 0 && <div>{user.media.length} <i className="fas fa-image" /></div>}
                </>
              ) : (
                user.fullname
              )}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
