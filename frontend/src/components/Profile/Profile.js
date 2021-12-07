import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../app/features/userSlice";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./Profile.css";

const Profile = ({ history }) => {
  // eslint-disable-next-line
  const { auth, data, isLoading, isSuccess, error } = useSelector(userSelector);
  const user = data?.user;
  useEffect(() => {
    if (auth === false) {
      history.push("/login");
    }
  }, [history, auth]);

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <MetaData title={user?.name}></MetaData>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={`${process.env.REACT_APP_API_URL}${user?.avatar?.url}`}
                alt={user?.name}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
