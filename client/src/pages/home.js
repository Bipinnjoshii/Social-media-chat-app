import React from "react";
import { useSelector } from "react-redux";

import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";
import LoadingIcon from "../components/LoadingIcon";

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {homePosts.loading ? (
          <LoadingIcon text="Loading feed" />
        ) : homePosts.result === 0 ? (
          <div className="empty_feed_state text-center my-4">
            <div className="empty_feed_icon mb-3">
              <i className="fas fa-feather-alt" />
            </div>
            <h4>Feed is Quiet</h4>
            <p className="text-muted" style={{ fontSize: "0.92rem", maxWidth: "420px", margin: "auto" }}>
              Be the first to drop a chirp, spark a discussion, or share a breakthrough with the community.
            </p>
          </div>
        ) : (
          <Posts />
        )}
      </div>

      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
