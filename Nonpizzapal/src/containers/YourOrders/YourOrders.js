import React, { useState, useEffect } from "react";
import axios from '../../axios-orders';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import { Message } from 'semantic-ui-react';

const YourOrders = (props) => {

  const [pastOrdersState, setPastOrdersState] = useState({
    orders: [],
    ordersLoaded: false,
    error: false
  });

  useEffect(() => {
    axios.get('/orders.json')
    .then(response => {
      // get orders from firebase (returns an object)
      let ordersObject = response.data;

      // create an empty array
      let ordersArray = []; 

      // store each order object in the ordersArray
      for (let i in ordersObject){
        ordersArray.push(ordersObject[i]);
      }

      // update the state
      setPastOrdersState({orders: ordersArray, ordersLoaded: true, error: false});
      
    })
    .catch(error => {
      setPastOrdersState({orders: pastOrdersState.orders, ordersLoaded: pastOrdersState.ordersLoaded, error: true});
      console.log(pastOrdersState.error, error);
    });
  }, [])


  let orders = pastOrdersState.error ? <Message><p>Orders can't be loaded!</p></Message> : <Message><p>Orders loading...</p></Message>;

  if (pastOrdersState.ordersLoaded){

    if(pastOrdersState.orders.length > 0){
      orders = (
        <OrdersTable orders={pastOrdersState.orders} />
      );
    }
    else{
      orders = <Message><p>You haven't placed any orders yet :(</p></Message>
    }
  }


 return (
    <div>
      {orders}
    </div>
  )
};

export default YourOrders;
