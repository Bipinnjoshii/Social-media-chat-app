import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../redux/actions/authAction";

const ChangePassword = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCnf, setShowCnf] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword, cnfNewPassword, auth }));
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit} className="edit_profile_card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0 font-weight-bold" style={{ letterSpacing: "-0.02em", color: "var(--text-main)" }}>
            Security & Password
          </h4>
          <button
            type="button"
            className="btn_close_circle"
            onClick={() => setChangePassword(false)}
            aria-label="Close change password modal"
          >
            &times;
          </button>
        </div>

        <div className="form_group mb-3">
          <label htmlFor="oldPassword">Current Password</label>
          <div className="position-relative">
            <input
              type={showOld ? "text" : "password"}
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
            <span
              className="position-absolute"
              style={{
                top: "50%",
                right: "14px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              onClick={() => setShowOld(!showOld)}
              aria-label={showOld ? "Hide password" : "Show password"}
            >
              <i className={`far ${showOld ? "fa-eye-slash" : "fa-eye"}`} />
            </span>
          </div>
        </div>

        <div className="form_group mb-3">
          <label htmlFor="newPassword">New Password</label>
          <div className="position-relative">
            <input
              type={showNew ? "text" : "password"}
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
            <span
              className="position-absolute"
              style={{
                top: "50%",
                right: "14px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              onClick={() => setShowNew(!showNew)}
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              <i className={`far ${showNew ? "fa-eye-slash" : "fa-eye"}`} />
            </span>
          </div>
        </div>

        <div className="form_group mb-4">
          <label htmlFor="cnfNewPassword">Confirm New Password</label>
          <div className="position-relative">
            <input
              type={showCnf ? "text" : "password"}
              className="form-control"
              id="cnfNewPassword"
              name="cnfNewPassword"
              value={cnfNewPassword}
              onChange={(e) => setCnfNewPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
            <span
              className="position-absolute"
              style={{
                top: "50%",
                right: "14px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              onClick={() => setShowCnf(!showCnf)}
              aria-label={showCnf ? "Hide password" : "Show password"}
            >
              <i className={`far ${showCnf ? "fa-eye-slash" : "fa-eye"}`} />
            </span>
          </div>
        </div>

        <button className="btn_chirp_primary w-100 justify-content-center" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
