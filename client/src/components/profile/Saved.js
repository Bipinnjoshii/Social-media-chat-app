import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadingIcon from "../LoadingIcon";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI(`getSavePosts`, auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts || []);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        const error = err.response?.data?.msg || err.message;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error } });
      });

    return () => setSavePosts([]);
  }, [dispatch, auth.token]);

  const handleLoadMore = async () => {
    setLoad(true);
    try {
      const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
      setSavePosts(res.data.savePosts || []);
      setResult(res.data.result);
      setPage(page + 1);
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={savePosts} result={result} />

      {load && <LoadingIcon size="small" text="Loading saved posts" />}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
