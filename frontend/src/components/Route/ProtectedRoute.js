import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { userSelector } from "../../app/features/userSlice";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector(userSelector);
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
        return <Component {...props}></Component>;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
