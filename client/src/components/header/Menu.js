import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "chat_bubble_outline", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
    return "";
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row align-items-center mb-0">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path} title={link.label}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        {/* Notifications Dropdown */}
        <li className="nav-item dropdown px-2" style={{ opacity: "1" }}>
          <span
            className="nav-link position-relative cursor-pointer"
            id="notifyDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              style={{ color: notify.data.length > 0 ? "var(--primary)" : "" }}
              className="material-icons"
            >
              notifications_none
            </span>
            {notify.data.length > 0 && (
              <span className="notify_length">{notify.data.length}</span>
            )}
          </span>

          <div className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="notifyDropdown">
            <NotifyModal />
          </div>
        </li>

        {/* User Profile & Settings Dropdown */}
        <li className="nav-item dropdown px-2" style={{ opacity: "1" }}>
          <span
            className="nav-link dropdown-toggle d-flex align-items-center cursor-pointer p-0"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>
          <ul className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="userDropdown">
            <li>
              <div className="dropdown-header px-3 py-2">
                <div className="fw-bold text-truncate" style={{ maxWidth: "160px" }}>
                  {auth.user.username}
                </div>
                <small className="text-muted text-truncate d-block" style={{ maxWidth: "160px" }}>
                  {auth.user.email}
                </small>
              </div>
            </li>
            <li><hr className="dropdown-divider my-1" /></li>
            <li>
              <Link className="dropdown-item d-flex align-items-center py-2" to={`/profile/${auth.user._id}`}>
                <span className="material-icons me-2" style={{ fontSize: "19px" }}>person_outline</span>
                <span>Profile</span>
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
                <span>{theme ? "Light Mode" : "Dark Mode"}</span>
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
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
