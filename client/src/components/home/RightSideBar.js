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
    <div className="my-4">
      {auth && auth.user && (
        <div className="inner-shadow mb-4" style={{ borderRadius: "14px", padding: "4px" }}>
          <UserCard user={auth.user} />
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center my-2">
        <h6
          className="color-c1 m-0 fw-bold"
          style={{ letterSpacing: "0.5px" }}
        >
          Suggestions for you
        </h6>
        {suggestions && !suggestions.loading && auth && auth.token && (
          <div className="outer-shadow hover-in-shadow btn-1 d-flex justify-content-center align-items-center" style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
            <i
              className="fas fa-redo"
              style={{ cursor: "pointer", fontSize: "0.8rem" }}
              onClick={() => dispatch(getSuggestions(auth.token))}
            />
          </div>
        )}
      </div>

      {suggestions && suggestions.loading ? (
        <LoadingIcon size="small" text="Loading suggestions" />
      ) : (
        <div className="suggestions">
          {usersList.map((user) => (
            <div
              key={user._id}
              className="mb-2 inner-shadow"
              style={{ borderRadius: "12px", padding: "2px" }}
            >
              <UserCard key={user._id} user={user}>
                <FollowBtn key={user._id} user={user} />
              </UserCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
