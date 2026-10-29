import React, { useState } from 'react';
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import Comments from './home/Comments';
import InputComment from "./home/InputComment";

const PostCard = ({ post, theme }) => {
  const [showComments, setShowComments] = useState(false);
  const commentCount = (post && post.comments && post.comments.length) || 0;

  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} showComments={showComments} setShowComments={setShowComments} />

      {commentCount > 0 && !showComments && (
        <div className="px-3 pb-3">
          <button
            type="button"
            className="view_comments_pill"
            onClick={() => setShowComments(true)}
            aria-expanded="false"
          >
            <span>View all {commentCount} comments</span>
            <span className="material-icons" style={{ fontSize: "18px" }}>expand_more</span>
          </button>
        </div>
      )}

      {showComments && (
        <div className="comments_drawer">
          <Comments post={post} />
          <InputComment post={post} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
