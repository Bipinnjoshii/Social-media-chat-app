import React from 'react';
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {
  if (result === 0 || !posts || posts.length === 0) {
    return <h5 className="text-center text-muted my-4">No Posts Yet</h5>;
  }

  return (
    <div className="post_thumb">
      {posts && posts.map((post) => {
        if (!post.images || post.images.length === 0) return null;
        const media = post.images[0];
        return (
          <Link to={`/post/${post._id}`} key={post._id} aria-label={`View post by ${post.user ? post.user.username : 'user'}`}>
            <div className="post_thumb_display">
              {media.url && media.url.match(/video/i) ? (
                <video src={media.url} />
              ) : (
                <img
                  src={media.url}
                  alt={`Post by ${post.user ? post.user.username : 'user'}`}
                  loading="lazy"
                />
              )}

              <div className="post_thumb_menu">
                <span className="thumb_metric">
                  <i className="far fa-heart" /> {post.likes ? post.likes.length : 0}
                </span>
                <span className="thumb_metric">
                  <i className="far fa-comments" /> {post.comments ? post.comments.length : 0}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostThumb;
