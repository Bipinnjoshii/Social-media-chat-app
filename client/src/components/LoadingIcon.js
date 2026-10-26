import React from "react";

const LoadingIcon = ({ size = "medium", text = "" }) => {
  const dimension = size === "small" ? 22 : size === "large" ? 44 : 32;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-4 my-2 w-100">
      <div
        className="aesthetic_spinner"
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
          borderWidth: size === "small" ? "2px" : "2.5px"
        }}
      />
      {text && <span className="aesthetic_loading_text">{text}</span>}
    </div>
  );
};

export default LoadingIcon;
