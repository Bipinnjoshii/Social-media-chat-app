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
          <div className="text-center py-5">
            <i className="far fa-newspaper mb-3" style={{ fontSize: "3rem", color: "var(--text-muted)", opacity: 0.5 }} />
            <h4 style={{ color: "var(--text-main)", fontWeight: 600 }}>No Posts Yet</h4>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>Share your first post above or connect with people!</p>
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
