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
            <i className="far fa-comments" />
          </div>
          <h4
            style={{
              fontWeight: 700,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Your Direct Messages
          </h4>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.93rem",
              maxWidth: "340px",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            Connect instantly with friends and peers. Select a conversation on
            the left or search for a user to start chatting.
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
            <i className="fas fa-shield-alt text-success" />
            <span>End-to-end real-time socket channel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
