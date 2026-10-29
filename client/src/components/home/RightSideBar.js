import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadingIcon from "../LoadingIcon";

import { getSuggestions } from "../../redux/actions/suggestionsAction";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const usersList = (suggestions && suggestions.users) || [];

  return (
    <div className="right_sidebar my-4">
      {auth && auth.user && (
        <div className="current_user_card mb-4 p-2">
          <UserCard user={auth.user} />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="sidebar_heading m-0">
          Campus Connections
        </h6>
        {suggestions && !suggestions.loading && auth && auth.token && (
          <button
            type="button"
            className="action_btn refresh_btn"
            aria-label="Refresh suggestions"
            onClick={() => dispatch(getSuggestions(auth.token))}
          >
            <i className="fas fa-redo" style={{ fontSize: "0.82rem" }} />
          </button>
        )}
      </div>

      {suggestions && suggestions.loading ? (
        <LoadingIcon size="small" text="Discovering peers" />
      ) : (
        <div className="suggestions">
          {usersList.length === 0 ? (
            <p className="text-muted small">No new suggestions right now.</p>
          ) : (
            usersList.map((user) => (
              <div
                key={user._id}
                className="suggestion_item mb-2 p-1"
              >
                <UserCard user={user}>
                  <FollowBtn user={user} />
                </UserCard>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
