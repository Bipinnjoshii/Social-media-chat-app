import React from 'react';

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1) ? null : (
        !load && (
          <button
            type="button"
            className="btn_load_more"
            onClick={handleLoadMore}
            aria-label="Load more posts"
          >
            Load more posts
          </button>
        )
      )}
    </>
  );
};

export default LoadMoreBtn;
