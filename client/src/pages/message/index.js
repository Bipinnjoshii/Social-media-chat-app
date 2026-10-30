import React from "react";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  return (
    <div className="message d-flex">
      <div
        className="col-md-4 px-0"
        style={{ borderRight: "1px solid var(--border-color)" }}
      >
        <LeftSide />
      </div>

      <div className="col-md-8 px-0">
        <div className="message_empty_state">
          <div className="message_empty_icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h4
            style={{
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.03em",
              marginBottom: "8px",
            }}
          >
            Chirp Direct Messages
          </h4>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.94rem",
              maxWidth: "360px",
              lineHeight: 1.6,
              marginBottom: "22px",
            }}
          >
            Fast, private, socket-powered messaging. Select a conversation on the left or search a username to start chatting.
          </p>
          <div
            className="d-inline-flex align-items-center px-3 py-2"
            style={{
              background: "var(--bg-card-subtle)",
              borderRadius: "9999px",
              border: "1px solid var(--border-color)",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              gap: "8px",
            }}
          >
            <span className="live_ping_dot" />
            <span>12ms Real-Time WebSocket Channel Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
