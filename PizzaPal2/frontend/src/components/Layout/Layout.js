import React, { useState, useCallback, useEffect, Suspense } from "react";
import Loader from '../Feedback/Loader/Loader';
import { Container } from "semantic-ui-react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./Layout.css";

import Nav from "../Nav/Nav";
import PizzaPal from "../../containers/PizzaPal/PizzaPal";
/* import YourOrders from "../../containers/YourOrders/YourOrders";
import PlaceOrder from "../../containers/PlaceOrder/PlaceOrder";
import OrderSuccess from "../../containers/PlaceOrder/OrderSuccess/OrderSuccess";
import Authenticate from "../../containers/Authenticate/Authenticate";
import YourAccount from "../../containers/YourAccount/YourAccount";
import AccountUpdate from "../../containers/YourAccount/AccountUpdate/AccountUpdate"; */
import AuthContext from "../../context/auth-context";


const YourOrders = React.lazy(() => import("../../containers/YourOrders/YourOrders"));
const PlaceOrder = React.lazy(() => import("../../containers/PlaceOrder/PlaceOrder"));
const OrderSuccess = React.lazy(() => import("../../containers/PlaceOrder/OrderSuccess/OrderSuccess"));
const Authenticate = React.lazy(() => import("../../containers/Authenticate/Authenticate"));
const YourAccount = React.lazy(() => import("../../containers/YourAccount/YourAccount"));
const AccountUpdate = React.lazy(() => import("../../containers/YourAccount/AccountUpdate/AccountUpdate"));


let logoutTimer;

const Layout = (props) => {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const history = useHistory();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
    history.push("/");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if ( storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={PizzaPal} />
        <Route path="/orders/:uid" component={YourOrders} />
        <Route path="/place-order" component={PlaceOrder} />
        <Route path="/order-success" component={OrderSuccess} />
        <Route path="/users/:uid" component={YourAccount} />
        <Route path="/update-account" component={AccountUpdate} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={PizzaPal} />
        <Route path="/authenticate" component={Authenticate} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value = {{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Container>
        <Nav />
        <Suspense fallback={<div><Loader active='true' /></div>}>
    {routes}
</Suspense>
      </Container>
    </AuthContext.Provider>
  );
};

export default Layout;
