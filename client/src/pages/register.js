import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from '../redux/actions/authAction';

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password, gender } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
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
              Claim Your Handle.<br />Start Creating.
            </h2>
            <p className="billboard_desc">
              Connect with fellow developers, designers, entrepreneurs, and friends worldwide. Build your audience, drop updates, and chat in real-time.
            </p>

            <div className="billboard_features">
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-at" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Global Unique Handle</h6>
                  <small>Lock in your personal @username before someone else does</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-globe-americas" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Instant Community Reach</h6>
                  <small>Drop thoughts, code snippets, photos, and project highlights</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-sparkles" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Dark-First Fluid Design</h6>
                  <small>Obsidian aesthetics crafted with precision typography</small>
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
            <small className="text-muted">Chirp Global Technologies © 2026 · Speed, Privacy & Freedom</small>
          </div>
        </div>

        {/* Right Side: Account Creation Form */}
        <div className="auth_form_wrapper flex-fill">
          <div className="auth_mobile_brand d-lg-none mb-4 text-center">
            <div className="brand_icon mx-auto mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3L11.5 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 3L15 22L11.5 13.5L3 10L22 3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="fw-bold mb-1">chirp<span className="brand_dot">.</span></h3>
            <span className="badge_pill">Join Free</span>
          </div>

          <form onSubmit={handleSubmit} className="auth_form">
            <div className="form_header mb-4">
              <h4 className="fw-bold mb-1">Create Account</h4>
              <p className="text-muted small m-0">Get started with your free Chirp profile</p>
            </div>

            <div className="form_group mb-3">
              <label htmlFor="fullname" className="form-label">
                Full Name
              </label>
              <div className="input_with_icon">
                <i className="far fa-user input_icon" />
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                  placeholder="e.g. Alex Morgan"
                  style={{ background: `${alert.fullname ? "rgba(244, 63, 94, 0.08)" : ""}` }}
                  required
                />
              </div>
              <small className="form-text text-danger">{alert.fullname}</small>
            </div>

            <div className="form_group mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input_with_icon">
                <i className="fas fa-at input_icon" />
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, "")}
                  placeholder="alexmorgan"
                  style={{ background: `${alert.username ? "rgba(244, 63, 94, 0.08)" : ""}` }}
                  required
                />
              </div>
              <small className="form-text text-danger">{alert.username}</small>
            </div>

            <div className="form_group mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <div className="input_with_icon">
                <i className="far fa-envelope input_icon" />
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  onChange={handleChangeInput}
                  value={email}
                  placeholder="alex@example.com"
                  style={{ background: `${alert.email ? "rgba(244, 63, 94, 0.08)" : ""}` }}
                  required
                />
              </div>
              <small className="form-text text-danger">{alert.email}</small>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-md-6">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="input_with_icon pass">
                  <i className="fas fa-lock input_icon" />
                  <input
                    type={typePass ? "text" : "password"}
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    onChange={handleChangeInput}
                    value={password}
                    placeholder="Min 6 characters"
                    style={{ background: `${alert.password ? "rgba(244, 63, 94, 0.08)" : ""}` }}
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
                <small className="form-text text-danger">{alert.password}</small>
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="cf_password" className="form-label">
                  Confirm Password
                </label>
                <div className="input_with_icon pass">
                  <i className="fas fa-shield-alt input_icon" />
                  <input
                    type={typeCfPass ? "text" : "password"}
                    className="form-control"
                    id="cf_password"
                    name="cf_password"
                    onChange={handleChangeInput}
                    value={cf_password}
                    placeholder="Repeat password"
                    style={{ background: `${alert.cf_password ? "rgba(244, 63, 94, 0.08)" : ""}` }}
                    required
                  />
                  <button
                    type="button"
                    className="pass_toggle_btn"
                    onClick={() => setTypeCfPass(!typeCfPass)}
                    aria-label={typeCfPass ? "Hide password" : "Show password"}
                  >
                    <i className={typeCfPass ? "fas fa-eye-slash" : "fas fa-eye"} />
                  </button>
                </div>
                <small className="form-text text-danger">{alert.cf_password}</small>
              </div>
            </div>

            {/* Gender Selector Capsule */}
            <div className="form_group mb-4">
              <label className="form-label mb-2 d-block">Gender Identification</label>
              <div className="gender_pills_container">
                <label className={`gender_pill_label ${gender === "male" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked
                    onChange={handleChangeInput}
                  />
                  <i className="fas fa-mars me-1" /> Male
                </label>
                <label className={`gender_pill_label ${gender === "female" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChangeInput}
                  />
                  <i className="fas fa-venus me-1" /> Female
                </label>
                <label className={`gender_pill_label ${gender === "other" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChangeInput}
                  />
                  <i className="fas fa-genderless me-1" /> Other
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn_chirp_primary w-100 mb-3"
              disabled={!fullname || !username || !email || !password || !cf_password}
            >
              Create My Account
            </button>

            <div className="text-center pt-2">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/" className="auth_switch_link">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
