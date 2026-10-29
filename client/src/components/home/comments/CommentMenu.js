import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../redux/actions/commentAction';

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        dispatch(deleteComment({ post, auth, comment, socket }));
      }
    }
  };

  const isAuthor = comment.user._id === auth.user._id;
  const isPostOwner = post.user._id === auth.user._id;

  if (!isAuthor && !isPostOwner) return null;

  return (
    <div className="nav-item dropdown">
      <button
        type="button"
        className="action_btn comment_menu_btn"
        id={`commentMenu-${comment._id}`}
        data-bs-toggle="dropdown"
        aria-label="Comment options"
        aria-expanded="false"
      >
        <span className="material-icons" style={{ fontSize: "18px" }}>more_vert</span>
      </button>

      <div className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby={`commentMenu-${comment._id}`}>
        {isAuthor && (
          <button
            type="button"
            className="dropdown-item"
            onClick={() => setOnEdit(true)}
          >
            <span className="material-icons text-primary me-2">create</span> Edit
          </button>
        )}

        <button
          type="button"
          className="dropdown-item text-danger"
          onClick={handleRemove}
        >
          <span className="material-icons text-danger me-2">delete_outline</span> Delete
        </button>
      </div>
    </div>
  );
};

export default CommentMenu;
