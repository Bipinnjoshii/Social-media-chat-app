import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentCard post={post} comment={comment} commentId={comment._id}>
        <div className="ps-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <button
              type="button"
              className="btn_link reply_toggle_btn"
              onClick={() => setNext(next + 10)}
            >
              Load more replies ({replyCm.length - next})
            </button>
          ) : (
            replyCm.length > 1 && (
              <button
                type="button"
                className="btn_link reply_toggle_btn text-muted"
                onClick={() => setNext(1)}
              >
                Hide replies
              </button>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
