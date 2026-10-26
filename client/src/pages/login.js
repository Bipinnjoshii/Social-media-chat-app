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
      <form onSubmit={handleSubmit}>
        <h3 className="auth-heading">
          Campus Connect
        </h3>

        {/* Account Role Selector Pill */}
        <div 
          className="d-flex mb-4 p-1"
          style={{
            background: "var(--bg-card-subtle)",
            borderRadius: "14px",
            border: "1px solid var(--border-color)"
          }}
        >
          <button
            type="button"
            className="flex-fill py-2 border-0 fw-bold"
            style={{
              borderRadius: "10px",
              background: !isAdmin ? "var(--background-1)" : "transparent",
              color: !isAdmin ? "#ffffff" : "var(--text-muted)",
              transition: "all 0.2s ease",
              fontSize: "0.88rem",
              boxShadow: !isAdmin ? "0 2px 8px rgba(194, 94, 62, 0.25)" : "none"
            }}
            onClick={() => setIsAdmin(false)}
          >
            User Login
          </button>
          <button
            type="button"
            className="flex-fill py-2 border-0 fw-bold"
            style={{
              borderRadius: "10px",
              background: isAdmin ? "var(--background-1)" : "transparent",
              color: isAdmin ? "#ffffff" : "var(--text-muted)",
              transition: "all 0.2s ease",
              fontSize: "0.88rem",
              boxShadow: isAdmin ? "0 2px 8px rgba(194, 94, 62, 0.25)" : "none"
            }}
            onClick={() => setIsAdmin(true)}
          >
            Admin Portal
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            value={email}
            name="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
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
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={email && password ? false : true}
        >
          {isAdmin ? "Sign In as Admin" : "Sign In"}
        </button>

        <p className="my-2 text-center" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
