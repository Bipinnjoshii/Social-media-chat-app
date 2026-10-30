import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverPosts, DISCOVER_TYPES } from "../redux/actions/discoverAction";
import LoadingIcon from "../components/LoadingIcon";
import PostThumb from "../components/PostThumb";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [filterTag, setFilterTag] = useState("all");

  useEffect(() => {
    if (!discover.firstLoad && auth && auth.token) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    try {
      const res = await getDataAPI(`post_discover?num=${discover.page * 8}`, auth.token);
      dispatch({ type: DISCOVER_TYPES.UPDATE_POSTS, payload: res.data });
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };

  const categories = [
    { id: "all", label: "All Chirps" },
    { id: "trending", label: "🔥 Trending" },
    { id: "tech", label: "💻 Tech & Code" },
    { id: "design", label: "🎨 Visual Arts" },
    { id: "ideas", label: "💡 Thoughts & Drops" },
  ];

  return (
    <div className="discover_page my-3">
      <div className="discover_hero_header mb-4 p-4 text-center">
        <div className="badge_pill mx-auto mb-2">Explore Chirp</div>
        <h2 className="discover_title">What's Buzzing in the World</h2>
        <p className="discover_subtitle text-muted mx-auto">
          Trending creations, viral discussions, visual portfolios, and real-time ideas from creators across the globe.
        </p>

        {/* Filter Capsules */}
        <div className="discover_filter_bar d-flex justify-content-center flex-wrap gap-2 mt-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter_pill_btn ${filterTag === c.id ? "active" : ""}`}
              onClick={() => setFilterTag(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {discover.loading ? (
        <LoadingIcon text="Curating the feed" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      <LoadMoreBtn
        result={discover.result}
        page={discover.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Discover;
