import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";
import LoadingIcon from "../LoadingIcon";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    try {
      const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
      dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } });
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };

  const postsList = (homePosts && homePosts.posts) || [];

  return (
    <div className="posts">
      {postsList.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <LoadingIcon size="small" text="Loading more" />}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
