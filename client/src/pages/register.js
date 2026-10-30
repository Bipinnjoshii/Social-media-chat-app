import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from '../redux/actions/authAction';

const Register = () => {
  const { auth, alert } = useSelector(state => state);
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
              Claim Your Studio Handle & Showcase Your Craft.
            </h2>
            <p className="billboard_desc">
              Connect with fellow student innovators, post architectural models, drop UI designs, and find collaborators across your campus.
            </p>

            <div className="billboard_features">
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-id-card" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Permanent Creative Showcase</h6>
                  <small>Build a public campus portfolio that commands respect</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-users" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Cross-Discipline Networking</h6>
                  <small>Work with engineers, designers, and thinkers</small>
                </div>
              </div>
              <div className="feature_item">
                <div className="feature_icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <div>
                  <h6 className="m-0 fw-bold">Verified Campus Network</h6>
                  <small>Exclusive collegiate environment for authentic collaboration</small>
                </div>
              </div>
            </div>
          </div>

          <div className="billboard_footer">
            <small className="text-muted">Campus Connect © 2026 · Built for University Creators</small>
          </div>
        </div>

        {/* Right Side: Tactile Studio Register Form */}
        <div className="auth_form_wrapper flex-fill">
          <div className="auth_mobile_brand d-lg-none mb-4 text-center">
            <div className="brand_icon mx-auto mb-2">
              <i className="fas fa-shapes" />
            </div>
            <h3 className="fw-bold mb-1">Campus Connect</h3>
            <span className="badge_pill">The Modern Studio</span>
          </div>

          <form onSubmit={handleSubmit} className="auth_form">
            <div className="form_header mb-3">
              <h4 className="fw-bold mb-1">Create Account</h4>
              <p className="text-muted small m-0">Join your campus creative community</p>
            </div>

            <div className="row g-2 mb-2">
              <div className="col-sm-6">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                  name="fullname"
                  placeholder="Maya Lin"
                  required
                />
                {alert.fullname && (
                  <small className="form-text text-danger">{alert.fullname}</small>
                )}
              </div>

              <div className="col-sm-6">
                <label htmlFor="username" className="form-label">
                  Studio Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, "")}
                  name="username"
                  placeholder="mayalin"
                  required
                />
                {alert.username && (
                  <small className="form-text text-danger">{alert.username}</small>
                )}
              </div>
            </div>

            <div className="form_group mb-2">
              <label htmlFor="email" className="form-label">
                Campus Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChangeInput}
                value={email}
                name="email"
                placeholder="maya@university.edu"
                required
              />
              {alert.email && (
                <small className="form-text text-danger">{alert.email}</small>
              )}
            </div>

            <div className="row g-2 mb-3">
              <div className="col-sm-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="pass position-relative">
                  <input
                    type={typePass ? "text" : "password"}
                    className="form-control"
                    id="password"
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
                {alert.password && (
                  <small className="form-text text-danger">{alert.password}</small>
                )}
              </div>

              <div className="col-sm-6">
                <label htmlFor="cf_password" className="form-label">
                  Confirm Password
                </label>
                <div className="pass position-relative">
                  <input
                    type={typeCfPass ? "text" : "password"}
                    className="form-control"
                    id="cf_password"
                    onChange={handleChangeInput}
                    value={cf_password}
                    name="cf_password"
                    placeholder="••••••••"
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
                {alert.cf_password && (
                  <small className="form-text text-danger">{alert.cf_password}</small>
                )}
              </div>
            </div>

            {/* Gender Segmented Selection */}
            <div className="mb-4">
              <label className="form-label mb-2">Gender Identification</label>
              <div className="d-flex p-1 gender_segmented_pill">
                <button
                  type="button"
                  className={`gender_pill_btn ${gender === "male" ? "active" : ""}`}
                  onClick={() => setUserData({ ...userData, gender: "male" })}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`gender_pill_btn ${gender === "female" ? "active" : ""}`}
                  onClick={() => setUserData({ ...userData, gender: "female" })}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`gender_pill_btn ${gender === "other" ? "active" : ""}`}
                  onClick={() => setUserData({ ...userData, gender: "other" })}
                >
                  Non-Binary / Other
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
            >
              Join Campus Studio
            </button>

            <div className="text-center pt-2">
              <span className="text-muted small">Already have a studio account? </span>
              <Link to="/" className="auth_switch_link">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
