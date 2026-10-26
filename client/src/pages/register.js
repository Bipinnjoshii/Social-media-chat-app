import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from '../redux/actions/authAction';

const Register = () => {
    const { auth, alert } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = { fullname: "", username: "", email: "", password: "", cf_password: "", gender: "male" };
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
        <form onSubmit={handleSubmit}>
          <h3 className="auth-heading">
            Campus Connect
          </h3>

          <div className="mb-3">
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
              placeholder="Bipin Joshi"
              required
            />
            {alert.fullname && (
              <small className="form-text text-danger">{alert.fullname}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              placeholder="bipinjoshi"
              required
            />
            {alert.username && (
              <small className="form-text text-danger">{alert.username}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChangeInput}
              value={email}
              name="email"
              placeholder="name@example.com"
              required
            />
            {alert.email && (
              <small className="form-text text-danger">{alert.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="pass">
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
              <small onClick={() => setTypePass(!typePass)}>
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
            {alert.password && (
              <small className="form-text text-danger">{alert.password}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="cf_password" className="form-label">
              Confirm Password
            </label>
            <div className="pass">
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
              <small onClick={() => setTypeCfPass(!typeCfPass)}>
                {typeCfPass ? "Hide" : "Show"}
              </small>
            </div>
            {alert.cf_password && (
              <small className="form-text text-danger">{alert.cf_password}</small>
            )}
          </div>

          <div className="d-flex justify-content-evenly mb-4 p-2" style={{ background: "var(--bg-card-subtle)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <label className="d-flex align-items-center cursor-pointer mb-0" style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleChangeInput}
                className="me-2"
              />
              Male
            </label>

            <label className="d-flex align-items-center cursor-pointer mb-0" style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleChangeInput}
                className="me-2"
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
          >
            Create Account
          </button>
          
          <p className="my-2 text-center" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
              Login Now
            </Link>
          </p>
        </form>
      </div>
    );
};

export default Register;
