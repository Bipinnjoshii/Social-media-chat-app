import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        background: "rgba(8, 11, 17, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        top: 0,
        left: 0,
        zIndex: 9999,
        transition: "opacity 0.25s ease",
      }}
      className="position-fixed vh-100 w-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div className="aesthetic_spinner"></div>
      <span className="aesthetic_loading_text">Loading</span>
    </div>
  );
};

export default Loading;
