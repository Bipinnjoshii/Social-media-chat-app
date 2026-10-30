import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Following from './Following';
import Followers from './Followers';
import ChangePassword from './ChangePassword';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit || changePassword) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, changePassword, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => {
        const isMe = user._id === auth.user._id;

        return (
          <div key={user._id} className="profile_card">
            {/* Chirp Electric Panoramic Banner */}
            <div className="profile_chirp_banner">
              <div className="profile_banner_mesh" />
              <div className="profile_creator_badge">
                <i className="fas fa-check-circle me-1" style={{ color: "var(--primary)" }} /> Chirp Member
              </div>
            </div>

            <div className="profile_card_body">
              {/* Avatar + Main Actions */}
              <div className="profile_identity_row">
                <div className="profile_avatar_wrapper">
                  <Avatar src={user.avatar} size="supper-avatar" />
                </div>

                <div className="profile_actions_cluster">
                  {isMe ? (
                    <div className="profile_btn_group">
                      <button
                        type="button"
                        className="btn_chirp_primary"
                        onClick={() => setOnEdit(true)}
                        aria-label="Edit profile settings"
                      >
                        <i className="fas fa-user-edit me-1" /> Edit Profile
                      </button>
                      <button
                        type="button"
                        className="btn_chirp_secondary"
                        onClick={() => setChangePassword(true)}
                        aria-label="Change account password"
                      >
                        <i className="fas fa-lock me-1" /> Security
                      </button>
                    </div>
                  ) : (
                    <div className="profile_btn_group">
                      <FollowBtn user={user} />
                      <Link
                        to={`/message/${user._id}`}
                        className="btn_chirp_secondary"
                        style={{ textDecoration: 'none' }}
                        aria-label={`Send direct message to ${user.username}`}
                      >
                        <i className="far fa-paper-plane me-1" /> Message
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Identity & Bio */}
              <div className="profile_details">
                <div className="profile_names">
                  <h2 className="profile_username">
                    {user.username}
                    <i className="fas fa-check-circle verified_mark" title="Verified Member" />
                  </h2>
                  <h4 className="profile_fullname">{user.fullname}</h4>
                </div>

                {user.story && (
                  <p className="profile_story">{user.story}</p>
                )}

                {/* Metadata Pills */}
                <div className="profile_meta_chips">
                  {user.website && (
                    <a
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="profile_meta_pill profile_link_pill"
                      title={user.website}
                    >
                      <i className="fas fa-link me-2" />
                      <span>{user.website.replace(/^https?:\/\//, '')}</span>
                      <i className="fas fa-external-link-alt ms-1" style={{ fontSize: '0.72rem', opacity: 0.7 }} />
                    </a>
                  )}

                  {user.address && (
                    <span className="profile_meta_pill">
                      <i className="fas fa-map-marker-alt me-2" />
                      <span>{user.address}</span>
                    </span>
                  )}

                  {user.email && (
                    <span className="profile_meta_pill">
                      <i className="fas fa-envelope me-2" />
                      <span>{user.email}</span>
                    </span>
                  )}

                  {user.mobile && (
                    <span className="profile_meta_pill">
                      <i className="fas fa-phone-alt me-2" />
                      <span>{user.mobile}</span>
                    </span>
                  )}
                </div>

                {/* Quantitative Stats Bar */}
                <div className="profile_stats_bar">
                  <div
                    className="profile_stat_item clickable"
                    onClick={() => setShowFollowers(true)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${user.followers?.length || 0} Followers`}
                  >
                    <span className="stat_number">{user.followers?.length || 0}</span>
                    <span className="stat_label">Followers</span>
                  </div>

                  <div className="profile_stat_divider" />

                  <div
                    className="profile_stat_item clickable"
                    onClick={() => setShowFollowing(true)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${user.following?.length || 0} Following`}
                  >
                    <span className="stat_number">{user.following?.length || 0}</span>
                    <span className="stat_label">Following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modals */}
            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            {changePassword && <ChangePassword setChangePassword={setChangePassword} />}

            {showFollowers && (
              <Followers
                users={user.followers}
                setShowFollowers={setShowFollowers}
              />
            )}
            {showFollowing && (
              <Following
                users={user.following}
                setShowFollowing={setShowFollowing}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Info;
