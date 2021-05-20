import React, { useState, useEffect } from "react";
import { Grid, Message } from 'semantic-ui-react';
import Menu from '../../components/Menu/Menu';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { v4 as uuidv4 } from 'uuid';

let orderToppings = [];

const PizzaPal = (props) => {

  const [menuState, setMenuState] = useState({
    toppings: [],
    error: false
  });

  useEffect(() => {
      axios.get('/toppings.json')
      .then(response => {
        setMenuState({toppings: response.data});
        console.log(response);
      })
      .catch(error => {
        setMenuState({toppings: menuState.toppings, error: true});
        console.log(error);
      });
  }, [])

  const [orderState, setOrderState] = useState({
    totalPrice: 5, 
    chosenToppings: []
  });  
  
  const addToppingHandler = (id) => {
    // find the chosen topping in the menu
    const menuIndex = menuState.toppings.findIndex(topping => topping.id === id);

  // check if the topping has already been added to the orderToppings array
  const orderIndex = orderToppings.findIndex(topping => topping.id === id);
  
  // if so, increase its count by 1
  if (orderIndex > -1){
    orderToppings[orderIndex].count++;
  }
  // otherwise (i.e. this topping is being added for the first time)
  // create this topping and add it to the order toppings array
  else{
    // Save the id, name and price of the chosen topping; set its count to 1
    const chosenTopping = {
      id: menuState.toppings[menuIndex].id,
      name: menuState.toppings[menuIndex].alt,
      price: menuState.toppings[menuIndex].price,
      count: 1
    };
    orderToppings.push(chosenTopping);
  }

  // Calculate the new price
  const newPrice = orderState.totalPrice + menuState.toppings[menuIndex].price;

  // Update the order state with the new price and updated toppings array
  setOrderState({
    totalPrice: newPrice,
    chosenToppings: orderToppings
  });
}


const removeToppingHandler = (id) => {
  // Find topping with matching id from the orderToppings
  const index = orderToppings.findIndex(topping => topping.id === id);

  // Get the current price
  let price = orderState.totalPrice; 

  // If topping was found, update the price and decrease the count
  if(index >= 0){
    price = price - orderToppings[index].price;
    orderToppings[index].count--;

    // If the count is now 0, remove the topping completely
    if(orderToppings[index].count < 1){
      orderToppings.splice(index, 1);
    }
  }

  // Update order state with updated price and updated toppings array
  setOrderState({
    totalPrice: price,
    chosenToppings: orderToppings
  });
} 


  let checkoutDisabled = true;

  if (orderState.chosenToppings.length > 0){
    checkoutDisabled = false;
  }

  const checkoutHandler = () => {

      // get order from orderState
      let order = orderState;

      // add unique id
      order.id = uuidv4();

      // create formatted date
      let orderDate = new Date();

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      let dayNum = orderDate.getDay();
      let day = days[dayNum];
    
      let monthNum = orderDate.getMonth();
      let month = months[monthNum];
    
      let date = orderDate.getDate();
      let year = orderDate.getFullYear();
    
      // saves date in the format "Fri 19 Mar 2021"
      let formattedDate = day + " " + date + " " + month + " " + year;

      // add formattedDate to order
      order.date = formattedDate;

      axios.post('/orders.json', order)
      .then(response => {
          alert('Order saved!');
          // set order state and orderToppings back to starting values
          setOrderState({
            totalPrice: 5,
            chosenToppings: []
          });
          orderToppings=[];
      })
      .catch(error => {
        setMenuState({toppings: menuState.toppings, error: true});
        alert('Something went wrong :(');
        console.log(error);
        });
  }

  let pizzapalMenu = menuState.error ? <Message><p>Pizza Pal menu can't be loaded!</p></Message> : <Message><p>Menu loading...</p></Message>;

  if (menuState.toppings.length > 0) {
    pizzapalMenu = (
      <Grid divided='vertically' stackable>
          <Grid.Row centered>
              <Menu menu={menuState.toppings} />
          </Grid.Row>
          <Order 
            menu={menuState.toppings}
            toppingAdded={addToppingHandler}
            toppingRemoved={removeToppingHandler}
            chosenToppings={orderState.chosenToppings}
            totalPrice={orderState.totalPrice}
            checkout={checkoutHandler}
            disabled={checkoutDisabled}
          />
      </Grid>
    );
  }

  return (
    <div>{pizzapalMenu}</div>
  )
};

export default PizzaPal;
