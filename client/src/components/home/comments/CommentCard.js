import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import { useSelector, useDispatch } from "react-redux";
import { updateComment, likeComment, unLikeComment } from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [loadLike, setLoadLike] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex align-items-center comment_username">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-2 mb-0">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              rows="3"
              className="comment_edit_textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  to={`/profile/${comment.tag._id}`}
                  className="comment_tag me-1"
                >
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content && (content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...")}
              </span>
              {content && content.length > 100 && (
                <button
                  type="button"
                  className="btn_link readMore_link"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}

          <div className="comment_meta_bar d-flex align-items-center">
            <small className="text-muted me-2">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="fw-semibold me-2 text-muted">
              {comment.likes ? comment.likes.length : 0} likes
            </small>

            {onEdit ? (
              <>
                <button
                  type="button"
                  className="comment_action_btn fw-semibold"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="comment_action_btn fw-semibold text-muted"
                  onClick={() => setOnEdit(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="comment_action_btn fw-semibold"
                onClick={handleReply}
              >
                {onReply ? "Cancel" : "Reply"}
              </button>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center ms-2">
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />

          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link
            className="comment_tag me-1"
            to={`/profile/${onReply.user._id}`}
          >
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
