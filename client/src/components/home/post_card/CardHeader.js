import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from '../../../utils/config';

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost, reportPost } from "../../../redux/actions/postAction";

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this chirp?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push("/");
    }
  };

  const handleReportPost = () => {
    dispatch(reportPost({ post, auth }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex align-items-center">
        <div className="outer-shadow big-avatar-cover me-2">
          <Avatar src={post.user.avatar} size="big-avatar" />
        </div>
        <div className="card_name">
          <h6 className="m-0">
            <Link className="post_username" to={`/profile/${post.user._id}`}>
              {post.user.username}
            </Link>
          </h6>
          <small className="post_timestamp text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <button
          type="button"
          className="action_btn post_menu_btn"
          id={`postMenu-${post._id}`}
          data-bs-toggle="dropdown"
          aria-label="Chirp options"
          aria-expanded="false"
        >
          <span className="material-icons">more_horiz</span>
        </button>

        <div className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby={`postMenu-${post._id}`}>
          {auth.user._id === post.user._id && (
            <>
              <button type="button" className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons text-info me-2">create</span>
                Edit Chirp
              </button>
              <button type="button" className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons text-danger me-2">delete</span>
                Delete Chirp
              </button>
            </>
          )}

          <button type="button" className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons text-primary me-2">content_copy</span>
            Copy Link
          </button>
          <button type="button" className="dropdown-item" onClick={handleReportPost}>
            <span className="material-icons text-warning me-2">report_problem</span>
            Report this chirp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
