import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetUpdating, userSelector } from "../../app/features/userSlice";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import profilePNG from "../../images/Profile.png";
import { loadUser, updateProfileUser } from "../../services/user";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  // eslint-disable-next-line
  const { auth, data, isLoading, error, isSuccess, isUpdating } =
    useSelector(userSelector);
  const user = data?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profilePNG);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ name, email, avatar }));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(`${process.env.REACT_APP_API_URL}${user.avatar.url}`);
    }

    if (error) {
      alert.error(error);
    }

    if (isUpdating) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/account");
      dispatch(resetUpdating());
    }
  }, [dispatch, error, alert, history, user, isLoading, isUpdating]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
