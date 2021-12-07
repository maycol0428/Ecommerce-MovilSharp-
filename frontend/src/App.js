import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fonts from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import { store } from "./app/store";
import { loadUser } from "./services/user";
import UserOptions from "./components/layout/Header/UserOptions";
import NotFound from "./components/layout/Not Found/NotFound";
import { useSelector } from "react-redux";
import { userSelector } from "./app/features/userSlice";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Loader from "./components/layout/Loader/Loader";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import ForgotPassword from "./components/Profile/ForgotPassword";
import ResetPassword from "./components/Profile/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import { api } from "./services/axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProtectedRouteAdmin from "./components/Route/ProtectedRouteAdmin";
import Notauthorized from "./components/layout/Not Authorized/Notauthorized";
import ProductList from "./components/Admin/ProductList";
import UpdateProduct from "./components/Admin/UpdateProduct";
import NewProduct from "./components/Admin/NewProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
function App() {
  const { auth, data, isLoading } = useSelector(userSelector);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStypeApyKey() {
    const { data } = await api.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    fonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStypeApyKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return isLoading ? (
    <Loader></Loader>
  ) : (
    <Router>
      <Header></Header>
      {auth && <UserOptions user={data?.user}></UserOptions>}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRouteAdmin
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRouteAdmin
          exact
          path="/admin/products"
          component={ProductList}
        />
        <ProtectedRouteAdmin
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRouteAdmin
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRouteAdmin exact path="/admin/orders" component={OrderList} />
        <ProtectedRouteAdmin
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        {/*


        <ProtectedRouteAdmin exact path="/admin/users" component={UsersList} />

        <ProtectedRouteAdmin
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />

        <ProtectedRouteAdmin
          exact
          path="/admin/reviews"
          component={ProductReviews}
        /> */}
        <Route exact path="/notauthorized" component={Notauthorized} />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
