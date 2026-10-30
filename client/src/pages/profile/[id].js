import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useSelector, useDispatch } from "react-redux";
import LoadingIcon from "../../components/LoadingIcon";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Saved from '../../components/profile/Saved';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile && profile.ids && profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile]);

  const isCurrentUser = Boolean(auth && auth.user && auth.user._id === id);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      {isCurrentUser && (
        <div className="profile_tab">
          <button
            type="button"
            className={saveTab ? "" : "active"}
            onClick={() => setSaveTab(false)}
            aria-label="View posted studio works"
          >
            <i className="fas fa-th-large mr-2" /> Studio Works
          </button>
          <button
            type="button"
            className={saveTab ? "active" : ""}
            onClick={() => setSaveTab(true)}
            aria-label="View saved collections"
          >
            <i className="fas fa-bookmark mr-2" /> Saved Collections
          </button>
        </div>
      )}

      {profile && profile.loading ? (
        <LoadingIcon text="Loading profile" />
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
