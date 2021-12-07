import React from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import profileDefault from "../../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../services/user";
import { Backdrop } from "@material-ui/core";
import { cartSelector } from "../../../app/features/cartSlice";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector(cartSelector);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: _logoutUser },
  ];
  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function _logoutUser() {
    dispatch(logoutUser());
    alert.success("Logout Successfully");
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }}></Backdrop>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={
              `${process.env.REACT_APP_API_URL}${user?.avatar?.url}` ??
              profileDefault
            }
            alt="Profile"
          ></img>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            // tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
