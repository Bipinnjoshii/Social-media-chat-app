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

  const disciplines = [
    { id: "all", label: "All Works" },
    { id: "design", label: "Architecture & Design" },
    { id: "visual", label: "Visual Arts" },
    { id: "tech", label: "Engineering & Code" },
    { id: "writing", label: "WIP & Critiques" },
  ];

  return (
    <div className="discover_page my-3">
      <div className="discover_hero_header mb-4 p-4 text-center">
        <div className="badge_pill mx-auto mb-2">Campus Showcase</div>
        <h2 className="discover_title">Explore Student Works & Critiques</h2>
        <p className="discover_subtitle text-muted mx-auto">
          Discover portfolio pieces, studio models, UI designs, and creative writing from students across the campus.
        </p>

        {/* Filter Pills */}
        <div className="discover_filter_bar d-flex justify-content-center flex-wrap gap-2 mt-3">
          {disciplines.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`filter_pill_btn ${filterTag === d.id ? "active" : ""}`}
              onClick={() => setFilterTag(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {discover.loading ? (
        <LoadingIcon text="Curating student works" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {load && <LoadingIcon size="small" text="Loading more works" />}

      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
