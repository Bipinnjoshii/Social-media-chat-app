import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [isAdmin, setIsAdmin] = useState(false);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      dispatch(login(userData));
    } else {
      dispatch(adminLogin(userData));
    }
  };

  return (
    <div className="auth_page">
      <div className="auth_container">
        {/* Left Side: Bold Editorial Studio Billboard */}
        <div className="auth_billboard d-none d-lg-flex flex-column justify-content-between">
          <div className="billboard_header">
            <div className="billboard_brand">
              <span className="brand_icon">
                <i className="fas fa-shapes" />
              </span>
              <span className="brand_title">Campus Connect</span>
            </div>
            <div className="badge_pill mt-3">The Modern Studio</div>
          </div>

          <div className="billboard_body my-auto py-4">
            <h2 className="billboard_headline">
              Where Campus Ideas Take Physical Form.
            </h2>
            <p className="billboard_desc">
              A unified creative network for student architects, designers, developers, and thinkers. Critique projects, collaborate in real time, and showcase your best work.
            </p>

            <div className="billboard_features">
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-layer-group" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Peer Critique & WIP Drops</h6>
                  <small>Share raw concepts and receive structured feedback</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-bolt" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Real-Time Messenger</h6>
                  <small>Direct socket-powered channels across departments</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-compass" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">University-Wide Showcase</h6>
                  <small>Discover student work across 40+ departments</small>
                </div>
              </div>
            </div>
          </div>

          <div className="billboard_footer">
            <small className="text-muted">Campus Connect © 2026 · Creative Commons for University Students</small>
          </div>
        </div>

        {/* Right Side: Tactile Studio Auth Form */}
        <div className="auth_form_wrapper flex-fill">
          <div className="auth_mobile_brand d-lg-none mb-4 text-center">
            <div className="brand_icon mx-auto mb-2">
              <i className="fas fa-shapes" />
            </div>
            <h3 className="fw-bold mb-1">Campus Connect</h3>
            <span className="badge_pill">The Modern Studio</span>
          </div>

          <form onSubmit={handleSubmit} className="auth_form">
            <div className="form_header mb-4">
              <h4 className="fw-bold mb-1">Welcome Back</h4>
              <p className="text-muted small m-0">Sign in to your campus studio workspace</p>
            </div>

            {/* Account Role Selector Pill */}
            <div className="role_selector_pill mb-4">
              <button
                type="button"
                className={`role_btn ${!isAdmin ? "active" : ""}`}
                onClick={() => setIsAdmin(false)}
              >
                Creator Workspace
              </button>
              <button
                type="button"
                className={`role_btn ${isAdmin ? "active" : ""}`}
                onClick={() => setIsAdmin(true)}
              >
                Admin Portal
              </button>
            </div>

            <div className="form_group mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Campus Email Address
              </label>
              <div className="input_with_icon">
                <i className="far fa-envelope input_icon" />
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  onChange={handleChangeInput}
                  value={email}
                  name="email"
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </div>

            <div className="form_group mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="loginPassword" className="form-label mb-0">
                  Password
                </label>
              </div>
              <div className="input_with_icon pass">
                <i className="fas fa-lock input_icon" />
                <input
                  type={typePass ? "text" : "password"}
                  className="form-control"
                  id="loginPassword"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="pass_toggle_btn"
                  onClick={() => setTypePass(!typePass)}
                  aria-label={typePass ? "Hide password" : "Show password"}
                >
                  <i className={typePass ? "fas fa-eye-slash" : "fas fa-eye"} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={!email || !password}
            >
              {isAdmin ? "Access Admin Console" : "Enter Studio"}
            </button>

            <div className="text-center pt-2">
              <span className="text-muted small">New to Campus Connect? </span>
              <Link to="/register" className="auth_switch_link">
                Claim your studio profile
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
