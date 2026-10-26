import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || err.message },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        title="Enter to Search"
        name="search"
        value={search}
        id="search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
        }
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Enter to Search</span>
      </div>

      <div
        onClick={handleClose}
        className="close_search"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && (
        <div className="loading py-1">
          <div
            className="aesthetic_spinner"
            style={{ width: "20px", height: "20px", borderWidth: "2px" }}
          />
        </div>
      )}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
