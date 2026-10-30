import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";
import { checkImage } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit} className="edit_profile_card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0 font-weight-bold" style={{ letterSpacing: "-0.02em", color: "var(--text-main)" }}>
            Edit Chirp Profile
          </h4>
          <button
            type="button"
            className="btn_close_circle"
            onClick={() => setOnEdit(false)}
            aria-label="Close edit profile modal"
          >
            &times;
          </button>
        </div>

        <div className="info_avatar">
          <img
            alt="profile"
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          />
          <span>
            <i className="fas fa-camera me-1" />
            <p className="m-0">Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form_group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="position-absolute"
              style={{
                top: "50%",
                right: "12px",
                transform: "translateY(-50%)",
                color: fullname.length > 25 ? "var(--danger)" : "var(--text-muted)",
                fontSize: "0.75rem",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="mobile">Mobile / Phone</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleInput}
            placeholder="+1 555-0199"
          />
        </div>

        <div className="form_group">
          <label htmlFor="address">Location</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={handleInput}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="form_group">
          <label htmlFor="website">Website / Portfolio</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={website}
            onChange={handleInput}
            placeholder="https://chirp.social"
          />
        </div>

        <div className="form_group">
          <label htmlFor="story">Bio / Story</label>
          <textarea
            cols="30"
            rows="4"
            className="form-control"
            id="story"
            name="story"
            value={story}
            onChange={handleInput}
            placeholder="Share your interests, work, or what you're building..."
          />
          <small
            className="d-block text-right mt-1"
            style={{
              color: story.length > 200 ? "var(--danger)" : "var(--text-muted)",
              fontSize: "0.75rem",
            }}
          >
            {story.length}/200
          </small>
        </div>

        <div className="form_group mb-4">
          <label htmlFor="gender">Gender</label>
          <select
            className="custom-select text-capitalize"
            name="gender"
            id="gender"
            onChange={handleInput}
            value={gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button className="btn_chirp_primary w-100 justify-content-center" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
