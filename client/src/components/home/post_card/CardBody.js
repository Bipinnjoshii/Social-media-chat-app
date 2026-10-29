import React, { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);
  const images = post.images || [];

  return (
    <div className="card_body">
      <div className="card_body-content">
        <span>
          {post.content && (
            post.content.length < 180
              ? post.content
              : readMore
              ? post.content + " "
              : post.content.slice(0, 180) + "..."
          )}
        </span>
        {post.content && post.content.length >= 180 && (
          <button
            type="button"
            className="readMore_btn"
            onClick={() => setReadMore(!readMore)}
            aria-expanded={readMore}
          >
            {readMore ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      {images.length > 0 && (
        <Carousel images={images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
