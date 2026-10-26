import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from 'moment';
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from '../redux/actions/notifyAction';

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleIsRead = (msg) => {
      dispatch(isReadNotify({msg, auth}));
    };

    const handleDeleteAll = () => {
      const newArr = notify.data.filter(item => item.isRead === false)
      if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

      if(window.confirm(`You have ${newArr.length} unread notifications. Do you want to delete all notifications?`)){
        return dispatch(deleteAllNotifies(auth.token))
      }
    };

    const handleSound = () => {
      dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
    };

    return (
      <div
        className="mt-1"
        style={{
          minWidth: "300px",
          maxWidth: "360px",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid var(--border-color)",
          background: "var(--bg-card)",
          color: "var(--text-main)",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold" style={{ color: "var(--text-main)", fontSize: "1.05rem" }}>
            Notifications
          </h5>
          {notify.sound ? (
            <i
              className="fas fa-bell text-warning"
              style={{ fontSize: "1.1rem", cursor: "pointer" }}
              title="Mute notification sound"
              onClick={handleSound}
            />
          ) : (
            <i
              className="fas fa-bell-slash text-muted"
              style={{ fontSize: "1.1rem", cursor: "pointer" }}
              title="Enable notification sound"
              onClick={handleSound}
            />
          )}
        </div>
        <hr className="my-2" style={{ borderColor: "var(--border-color)", opacity: 0.8 }} />
        {notify.data.length === 0 && (
          <div className="text-muted w-100 text-center py-4" style={{ fontSize: "0.9rem" }}>
            No new notifications
          </div>
        )}
        <div style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}>
          {notify.data.map((msg, index) => (
            <div className="px-2 mb-3" key={index}>
              <Link
                to={`${msg.url}`}
                style={{ textDecoration: "none", color: "var(--text-main)" }}
                className="d-flex align-items-center"
                onClick={() => handleIsRead(msg)}
              >
                <Avatar src={msg.user.avatar} size="big-avatar" />

                <div className="flex-fill mx-2">
                  <div style={{ fontSize: "0.88rem", lineHeight: "1.35" }}>
                    <strong className="me-1">{msg.user.username}</strong>
                    <span style={{ color: "var(--text-muted)" }}>{msg.text}</span>
                  </div>
                  {msg.content && (
                    <small style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                      {msg.content.slice(0, 24)}...
                    </small>
                  )}
                </div>
                <div style={{ width: "32px", flexShrink: 0 }}>
                  {msg.image && <Avatar src={msg.image} size="medium-avatar" />}
                </div>
              </Link>
              <small className="text-muted d-flex justify-content-between px-2 mt-1" style={{ fontSize: "0.75rem" }}>
                <span>{moment(msg.createdAt).fromNow()}</span>
                {!msg.isRead && <i className="fas fa-circle" style={{ color: "var(--primary)", fontSize: "8px" }} />}
              </small>
            </div>
          ))}
        </div>
        {notify.data.length > 0 && (
          <>
            <hr className="my-2" style={{ borderColor: "var(--border-color)", opacity: 0.8 }} />
            <div
              className="text-end me-1 fw-bold"
              style={{ cursor: "pointer", color: "var(--primary)", fontSize: "0.85rem" }}
              onClick={handleDeleteAll}
            >
              Clear All
            </div>
          </>
        )}
      </div>
    );
}

export default NotifyModal;
