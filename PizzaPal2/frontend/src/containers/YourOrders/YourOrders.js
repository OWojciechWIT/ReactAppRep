import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios-orders";

import OrdersTable from "../../components/OrdersTable/OrdersTable";
import Loader from "../../components/Feedback/Loader/Loader";
import ErrorModal from "../../components/Feedback/ErrorModal/ErrorModal";
import AuthContext from "../../context/auth-context";

const YourOrders = (props) => {

  const auth = useContext(AuthContext);

  // ORDER, ERROR AND LOADING STATE

  const [pastOrdersState, setPastOrdersState] = useState({
    orders: [],
  });

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: null,
  });

  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    ordersLoaded: false,
    loadFailed: false,
  });

  // FETCH ORDERS
  
  useEffect(() => {

    let uid = auth.userId;
    let path = "/orders/" + uid;
    axios
      .get(path, { headers: { Authorization: "Bearer " + auth.token }})
      .then((response) => {
        setPastOrdersState({ orders: response.data.orders });
        setLoadingState({
          isLoading: false,
          ordersLoaded: true,
          loadFailed: loadingState.loadFailed,
        });
      })
      .catch((error) => {
        setErrorState({
          error: true,
          errorMessage: error.response.data.message,
        });
        setLoadingState({
          isLoading: false,
          ordersLoaded: loadingState.ordersLoaded,
          loadFailed: loadingState.loadFailed,
        });
      });
  }, []);

  // ERROR HANDLER

  const errorHandler = () => {
    setErrorState({
      error: false,
      errorMessage: null,
    });
    setLoadingState({
      isLoading: loadingState.isLoading,
      ordersLoaded: loadingState.ordersLoaded,
      loadFailed: true,
    });
  };

  // DISPLAY ORDERS

  let orders = errorState.error ? (
    <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />
  ) : (
    <Loader active={loadingState.isLoading} />
  );

  if (loadingState.ordersLoaded && pastOrdersState.orders.length > 0) {
    orders = <OrdersTable orders={pastOrdersState.orders} />;
  } else if (loadingState.loadFailed) {
    orders = <p>We can't load your orders... maybe try creating one?</p>;
  }

  return <div>{orders}</div>;
};

export default YourOrders;
