import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(3);
  const [replyComments, setReplyComments] = useState([]);

  const postComments = (post && post.comments) || [];

  useEffect(() => {
    const newCm = postComments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post, next]);

  useEffect(() => {
    const newReply = postComments.filter((cm) => cm.reply);
    setReplyComments(newReply);
  }, [post]);

  return (
    <div className="comments">
      {showComments.map((comment, index) => (
        <CommentDisplay
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}

      {comments.length - next > 0 ? (
        <button
          type="button"
          onClick={() => setNext(next + 5)}
          className="btn_link p-2 border-top w-100 text-center"
        >
          Load previous comments ({comments.length - next})
        </button>
      ) : (
        comments.length > 3 && (
          <button
            type="button"
            onClick={() => setNext(3)}
            className="btn_link p-2 border-top w-100 text-center text-muted"
          >
            Show fewer comments
          </button>
        )
      )}
    </div>
  );
};

export default Comments;
