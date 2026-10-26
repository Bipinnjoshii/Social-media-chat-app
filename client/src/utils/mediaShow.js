import React from "react";

export const imageShow = (src) => {
  return (
    <img
      src={src}
      className="img-thumbnail"
      alt="uploaded pic"
      style={{ maxHeight: "300px", objectFit: "cover" }}
    />
  );
};

export const videoShow = (src) => {
  return (
    <video
      controls
      src={src}
      className="img-thumbnail"
      alt="uploaded video"
      style={{ maxHeight: "300px", objectFit: "contain" }}
    />
  );
};
