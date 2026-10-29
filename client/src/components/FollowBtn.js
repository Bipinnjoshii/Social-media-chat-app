import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const { auth, profile, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth && auth.user && auth.user.following && auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth, user._id]);

  const handleFollow = async () => {
    if (load) return;
    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;
    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <button
          type="button"
          className="btn_unfollow"
          disabled={load}
          onClick={handleUnFollow}
          aria-label={`Unfollow ${user.username}`}
        >
          Following
        </button>
      ) : (
        <button
          type="button"
          className="btn_follow"
          disabled={load}
          onClick={handleFollow}
          aria-label={`Follow ${user.username}`}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
