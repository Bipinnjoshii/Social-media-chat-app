import React, { useEffect } from "react";

const Toast = ({ msg, handleShow, bgColor, type = "info" }) => {
  // Auto dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleShow();
    }, 4000);
    return () => clearTimeout(timer);
  }, [handleShow]);

  const isSuccess = bgColor && bgColor.includes("success");
  const isError = bgColor && bgColor.includes("danger");

  return (
    <div
      className="modern-toast"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 999999,
        minWidth: "320px",
        maxWidth: "420px",
        background: isSuccess
          ? "linear-gradient(135deg, rgba(21, 128, 61, 0.95), rgba(16, 185, 129, 0.95))"
          : isError
          ? "linear-gradient(135deg, rgba(185, 28, 28, 0.95), rgba(220, 38, 38, 0.95))"
          : "linear-gradient(135deg, rgba(14, 19, 31, 0.96), rgba(20, 27, 42, 0.96))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "#ffffff",
        borderRadius: "16px",
        padding: "16px 20px",
        boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.3), 0 8px 16px -4px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        animation: "toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {isSuccess ? (
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>✓</span>
        ) : isError ? (
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>!</span>
        ) : (
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>ℹ</span>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: "700",
            fontSize: "0.95rem",
            letterSpacing: "-0.01em",
            marginBottom: "2px",
          }}
        >
          {msg.title}
        </div>
        <div
          style={{
            fontSize: "0.88rem",
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.45,
            wordBreak: "break-word",
          }}
        >
          {msg.body}
        </div>
      </div>

      <button
        onClick={handleShow}
        style={{
          background: "transparent",
          border: "none",
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "20px",
          cursor: "pointer",
          padding: "0 4px",
          lineHeight: "1",
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
        onMouseLeave={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.7)")}
      >
        &times;
      </button>

      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
