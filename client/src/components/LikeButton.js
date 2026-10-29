import React from 'react';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <button
      type="button"
      className={`action_btn like_btn ${isLike ? 'liked' : ''}`}
      aria-label={isLike ? "Unlike post" : "Like post"}
      aria-pressed={isLike}
      onClick={isLike ? handleUnLike : handleLike}
    >
      {isLike ? (
        <i className="fas fa-heart text-danger" />
      ) : (
        <i className="far fa-heart" />
      )}
    </button>
  );
};

export default LikeButton;
