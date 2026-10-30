import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postAction";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

const Header = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (auth && auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg justify-content-between p-0">
        <div className="container-fluid d-flex align-items-center justify-content-between px-2">
          <Link to="/" className="brand_logo" onClick={handleRefreshHome} aria-label="Campus Connect Home">
            <div className="brand_icon">
              <i className="fas fa-shapes" />
            </div>
            <div className="brand_meta">
              <span className="brand_name">Campus Connect</span>
              <span className="brand_edition">The Modern Studio</span>
            </div>
          </Link>

          <Search />

          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
