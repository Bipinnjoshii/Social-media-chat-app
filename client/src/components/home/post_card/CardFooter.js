import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from "react-redux";
import { likePost, savePost, unLikePost, unSavePost } from "../../../redux/actions/postAction";
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (post && post.likes && auth && auth.user && auth.user._id && post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post, auth]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth && auth.user && auth.user.saved && post && auth.user.saved.find(id => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post, auth]);

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div className="d-flex align-items-center">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link
            to={`/post/${post._id}`}
            className="action_btn comment_btn"
            aria-label={`View comments on post by ${post.user ? post.user.username : 'user'}`}
          >
            <i className="far fa-comments" />
          </Link>
          <button
            type="button"
            className="action_btn share_btn"
            aria-label="Share post"
            onClick={() => setIsShare(!isShare)}
          >
            <i className="fa fa-share" />
          </button>
        </div>

        <button
          type="button"
          className="action_btn bookmark_btn"
          aria-label={saved ? "Remove bookmark" : "Bookmark post"}
          aria-pressed={saved}
          onClick={saved ? handleUnSavePost : handleSavePost}
        >
          {saved ? (
            <i className="fas text-info fa-bookmark" />
          ) : (
            <i className="far fa-bookmark" />
          )}
        </button>
      </div>

      <div className="d-flex justify-content-start post_meta_counts">
        <h6 className="post_metric">
          <span>{(post && post.likes && post.likes.length) || 0}</span> likes
        </h6>
        <h6 className="post_metric">
          <span>{(post && post.comments && post.comments.length) || 0}</span> comments
        </h6>
      </div>

      {isShare && (
        <ShareModal
          url={`${BASE_URL}/post/${post._id}`}
          theme={theme}
          setIsShare={setIsShare}
        />
      )}
    </div>
  );
};

export default CardFooter;
