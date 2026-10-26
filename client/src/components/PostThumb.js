import React from 'react';
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {
  if (result === 0 || !posts || posts.length === 0){
    return <h5 className="text-center text-muted my-4">No Posts Yet</h5>
  }

  return (
    <div className="post_thumb">
      {posts && posts.map((post) => {
        if (!post.images || post.images.length === 0) return null;
        const media = post.images[0];
        return (
          <Link to={`/post/${post._id}`} key={post._id}>
            <div className="post_thumb_display">
              {media.url && media.url.match(/video/i) ? (
                <video controls src={media.url} alt="post-thumb" />
              ) : (
                <img src={media.url} alt="post-thumb" />
              )}

              <div className="post_thumb_menu">
                <i className="far fa-thumbs-up">{post.likes ? post.likes.length : 0}</i>
                <i className="far fa-comments">{post.comments ? post.comments.length : 0}</i>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostThumb;
