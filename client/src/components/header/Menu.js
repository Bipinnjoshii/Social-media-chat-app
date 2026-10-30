import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const navLinks = [
    { label: "Feed", icon: "dashboard", path: "/" },
    { label: "Chat", icon: "chat_bubble_outline", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = auth && auth.user;
  const username = (user && user.username) || "User";
  const email = (user && user.email) || "";
  const avatar = user && user.avatar;
  const userId = (user && user._id) || "";

  const isActive = (pn) => {
    if (pn === pathname) return "active";
    return "";
  };

  const notifyList = (notify && notify.data) || [];

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row align-items-center mb-0">
        <div className="nav_pills_container d-none d-md-flex align-items-center">
          {navLinks.map((link, index) => (
            <li className={`nav-item ${isActive(link.path)}`} key={index}>
              <Link className="nav_pill_link" to={link.path}>
                <span className="material-icons pill_icon">{link.icon}</span>
                <span className="pill_label">{link.label}</span>
              </Link>
            </li>
          ))}
        </div>

        {/* Mobile icons */}
        <div className="d-flex d-md-none align-items-center">
          {navLinks.map((link, index) => (
            <li className={`nav-item px-1 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path} title={link.label}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}
        </div>

        {/* Notifications Dropdown */}
        <li className="nav-item dropdown px-2" style={{ opacity: "1" }}>
          <button
            type="button"
            className="action_btn notify_btn position-relative"
            id="notifyDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="View notifications"
          >
            <span
              style={{ color: notifyList.length > 0 ? "var(--primary)" : "inherit" }}
              className="material-icons"
            >
              notifications_none
            </span>
            {notifyList.length > 0 && (
              <span className="notify_length">{notifyList.length}</span>
            )}
          </button>

          <div className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="notifyDropdown">
            <NotifyModal />
          </div>
        </li>

        {/* User Profile & Settings Dropdown */}
        <li className="nav-item dropdown px-1" style={{ opacity: "1" }}>
          <button
            type="button"
            className="avatar_btn dropdown-toggle d-flex align-items-center p-0 border-0 bg-transparent"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="User profile and settings"
          >
            <div className="avatar_ring">
              <Avatar src={avatar} size="medium-avatar" />
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="userDropdown">
            <li>
              <div className="dropdown-header px-3 py-2">
                <div className="fw-bold text-truncate" style={{ maxWidth: "160px" }}>
                  {username}
                </div>
                {email && (
                  <small className="text-muted text-truncate d-block" style={{ maxWidth: "160px" }}>
                    {email}
                  </small>
                )}
              </div>
            </li>
            <li><hr className="dropdown-divider my-1" /></li>
            <li>
              <Link className="dropdown-item d-flex align-items-center py-2" to={userId ? `/profile/${userId}` : "#"}>
                <span className="material-icons me-2" style={{ fontSize: "19px" }}>person_outline</span>
                <span>Profile Showcase</span>
              </Link>
            </li>
            <li>
              <div
                className="dropdown-item d-flex align-items-center py-2 cursor-pointer"
                onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}
              >
                <span className="material-icons me-2" style={{ fontSize: "19px" }}>
                  {theme ? "light_mode" : "dark_mode"}
                </span>
                <span>{theme ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
              </div>
            </li>
            <li><hr className="dropdown-divider my-1" /></li>
            <li>
              <Link
                className="dropdown-item d-flex align-items-center py-2 text-danger"
                to="/"
                onClick={() => dispatch(logout())}
              >
                <span className="material-icons me-2 text-danger" style={{ fontSize: "19px" }}>logout</span>
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
