import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import {  userSelector } from "../../app/features/userSlice";
import {  resetPassword } from "../../services/user";
import { useParams } from "react-router";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { token } = useParams();

  // eslint-disable-next-line
  const { auth, data, isLoading, isSuccess, error } = useSelector(userSelector);
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isSuccess) {
      alert.success("Password Updated Successfully");
      history.push("/account");
    }
  }, [dispatch, error, alert, history, isSuccess]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
