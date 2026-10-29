import React from "react";

const Carousel = ({ images, id }) => {
  const isActive = index => {
    if (index === 0) return "active";
    return "";
  };

  return (
    <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#image${id}`}
            data-bs-slide-to={index}
            className={isActive(index)}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1} of ${images.length}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            {img.url.match(/video/i) ? (
              <video
                controls
                src={img.url}
                className="d-block w-100"
                style={{ maxHeight: "600px", objectFit: "contain", background: "#000" }}
              />
            ) : (
              <img
                src={img.url}
                className="d-block w-100"
                alt={img.alt || `Post media ${index + 1} of ${images.length}`}
                loading={index === 0 ? "eager" : "lazy"}
                style={{ maxHeight: "600px", objectFit: "cover", minHeight: "260px" }}
              />
            )}
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            style={{ width: "8%" }}
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#image${id}`}
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            style={{ width: "8%" }}
            className="carousel-control-next"
            type="button"
            data-bs-target={`#image${id}`}
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
