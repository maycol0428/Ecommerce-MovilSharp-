import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { userSelector } from "../../app/features/userSlice";
const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const { auth, data } = useSelector(userSelector);
  const user = data?.user;
  return (
    <Route
      {...rest}
      render={(props) => {
        const redirectURL = props.location.pathname;
        if (!auth) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: redirectURL },
              }}
            ></Redirect>
          );
        }
        if (auth && !user.role.includes("admin")) {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            ></Redirect>
          );
        }
        return <Component {...props}></Component>;
      }}
    ></Route>
  );
};

export default ProtectedRouteAdmin;
