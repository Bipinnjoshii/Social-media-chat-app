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
        {/* Left Side: Chirp Electric Showcase Billboard */}
        <div className="auth_billboard d-none d-lg-flex flex-column justify-content-between">
          <div className="billboard_header">
            <div className="billboard_brand">
              <div className="brand_icon me-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 3L11.5 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 3L15 22L11.5 13.5L3 10L22 3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="brand_title">chirp<span className="brand_dot">.</span></span>
            </div>
            <div className="badge_pill mt-3">The Next-Gen Social Network</div>
          </div>

          <div className="billboard_body my-auto py-4">
            <h2 className="billboard_headline">
              Speak freely.<br />Connect instantly.
            </h2>
            <p className="billboard_desc">
              The high-velocity real-time social platform engineered for live conversations, spontaneous media sharing, and creator networks.
            </p>

            <div className="billboard_features">
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-bolt" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Instant Socket Engine</h6>
                  <small>Sub-15ms real-time direct delivery across peer channels</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-layer-group" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Rich Media Canvases</h6>
                  <small>Share ultra HD images, video carousels, and live stories</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Private & End-to-End Secure</h6>
                  <small>Your conversations and data stay protected with modern encryption</small>
                </div>
              </div>
            </div>

            <div className="billboard_metrics_row mt-4 pt-3 d-flex align-items-center gap-4">
              <div>
                <div className="metric_number">Free</div>
                <div className="metric_label">Forever</div>
              </div>
              <div className="metric_divider" />
              <div>
                <div className="metric_number">Zero</div>
                <div className="metric_label">Ad Clutter</div>
              </div>
              <div className="metric_divider" />
              <div>
                <div className="metric_number">Instant</div>
                <div className="metric_label">Setup</div>
              </div>
            </div>
          </div>

          <div className="billboard_footer">
            <small className="text-muted">Chirp Global Technologies © 2026 · Engineered for Speed & Delight</small>
          </div>
        </div>

        {/* Right Side: Sleek Sign-In Card */}
        <div className="auth_form_wrapper flex-fill">
          <div className="auth_mobile_brand d-lg-none mb-4 text-center">
            <div className="brand_icon mx-auto mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3L11.5 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 3L15 22L11.5 13.5L3 10L22 3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1">chirp<span className="brand_dot">.</span></h3>
            <span className="badge_pill">Real-Time Social</span>
          </div>

          <form onSubmit={handleSubmit} className="auth_form">
            <div className="form_header mb-4">
              <h4 className="fw-bold mb-1">Welcome Back</h4>
              <p className="text-muted small m-0">Sign in to join the conversation</p>
            </div>

            {/* Portal Switcher Pill */}
            <div className="role_selector_pill mb-4">
              <button
                type="button"
                className={`role_btn ${!isAdmin ? "active" : ""}`}
                onClick={() => setIsAdmin(false)}
              >
                Chirper Account
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
                Email Address
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
                  placeholder="name@example.com"
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
              className="btn_chirp_primary w-100 mb-3"
              disabled={!email || !password}
            >
              {isAdmin ? "Access Admin Console" : "Enter Chirp"}
            </button>

            <div className="text-center pt-2">
              <span className="text-muted small">Don't have an account? </span>
              <Link to="/register" className="auth_switch_link">
                Sign up for free
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
