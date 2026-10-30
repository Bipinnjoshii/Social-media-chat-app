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
        <div className="container-fluid d-flex align-items-center justify-content-between px-2 px-md-3">
          <Link to="/" className="brand_logo" onClick={handleRefreshHome} aria-label="Chirp Home">
            <div className="brand_icon">
              {/* Bespoke Geometric Origami Bird / Signal Pulse SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3L11.5 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 3L15 22L11.5 13.5L3 10L22 3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="brand_meta">
              <span className="brand_name">chirp<span className="brand_dot">.</span></span>
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
