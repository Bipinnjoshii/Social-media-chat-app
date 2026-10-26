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

  return (
    <div>
      {discover.loading ? (
        <LoadingIcon text="Discovering posts" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {load && <LoadingIcon size="small" text="Loading more" />}

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
