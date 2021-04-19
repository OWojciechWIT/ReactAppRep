import React, { useState, useEffect } from "react";
import Menu from '../../components/Menu/Menu';
import { Grid } from 'semantic-ui-react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

const PizzaPal = (props) => {
  
  const [menuState, setMenuState] = useState({
    toppings: [],
    error: false
  });
  /* const [menuState, setMenuState] = useState({
    toppings: [
      { id: 0, name: 'mozzarella', price: .75, image: 'images/toppings/mozzarella.jpg', alt: 'Mozzarella' },
      { id: 1, name: 'cheddar', price: .75, image: 'images/toppings/cheddar.jpg', alt: 'Cheddar' },
      { id: 2, name: 'basil', price: .5, image: 'images/toppings/basil.jpg', alt: 'Basil' },
      { id: 3, name: 'tomato', price: .5, image: 'images/toppings/tomato.jpg', alt: 'Tomato' },
      { id: 4, name: 'olives', price: .5, image: 'images/toppings/olives.jpg', alt: 'Olives' },
      { id: 5, name: 'onion', price: .5, image: 'images/toppings/onion.jpg', alt: 'Onion' },
      { id: 6, name: 'pineapple', price: .5, image: 'images/toppings/pineapple.jpg', alt: 'Pineapple' },
      { id: 7, name: 'mushroom', price: .5, image: 'images/toppings/mushroom.jpg', alt: 'Mushroom' },
      { id: 8, name: 'pepper', price: .5, image: 'images/toppings/pepper.jpg', alt: 'Pepper' },
      { id: 9, name: 'chili', price: .5, image: 'images/toppings/chili.jpg', alt: 'Chili' },
      { id: 10, name: 'jalapeno', price: .5, image: 'images/toppings/jalapeno.jpg', alt: 'Jalapeno' },
      { id: 11, name: 'bacon', price: 1, image: 'images/toppings/bacon.jpg', alt: 'Bacon' },
      { id: 12, name: 'ham', price: 1, image: 'images/toppings/ham.jpg', alt: 'Ham' },
      { id: 13, name: 'salami', price: 1, image: 'images/toppings/salami.jpg', alt: 'Salami' },
      { id: 14, name: 'bbq', price: .75, image: 'images/toppings/bbq.jpg', alt: 'BBQ Sauce' },
      { id: 15, name: 'hot', price: .75, image: 'images/toppings/hot.jpg', alt: 'Hot Sauce' },
    ]
  });  */

  useEffect(() => {
    axios.get('/toppings.json')
    .then(response => {
      setMenuState({toppings: response.data, error: false});
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
    console.log(id);
  }
  const removeToppingHandler = (id) => {
    // Find topping with matching id from the orderState
    const index = orderState.chosenToppings.findIndex(topping => topping.id === id);

    // Get the current price
    let price = orderState.totalPrice; 

    // If topping was found, update the price and then remove it
    if(index >= 0){
      price = price - orderState.chosenToppings[index].price;
      orderToppings.splice(index, 1);
    }

    // Update order state with updated price and updated toppings array
    setOrderState({
      totalPrice: price,
      chosenToppings: orderToppings
    });
  }

  const checkoutHandler = () => {
    axios.post('/orders.json', orderState)
    .then(response => {
        alert('Order saved!');
        console.log(response);
    })
    .catch(error => {
    setMenuState({toppings: menuState.toppings, error: true});
    alert('Something went wrong :(');
    console.log(error);
    });
}




  console.log(orderState);
  let pizzapalMenu = menuState.error ? <Message><p>Pizza Pal menu can't be loaded!</p></Message> : <Message><p>Menu loading...</p></Message>;

  if (menuState.toppings.length > 0) {
    pizzapalMenu = (
        <Grid divided='vertically' stackable>
        <Grid.Row centered>
            <Menu menu={menuState.toppings} />
        </Grid.Row>
        <Order 
            menu={menuState.toppings}
            chosenToppings={orderState.chosenToppings}
            totalPrice={orderState.totalPrice}
            toppingAdded={addToppingHandler}
            toppingRemoved={removeToppingHandler}
            checkout={checkoutHandler}
        />
        </Grid>
    );
}

return (
  <div>
    {pizzapalMenu}
  </div>
)


  /* return (
    <Grid divided='vertically' stackable>
        <Grid.Row centered>
            <Menu menu={menuState.toppings} />
        </Grid.Row>
        
        <Order 
    menu={menuState.toppings}
    chosenToppings={orderState.chosenToppings}
    totalPrice={orderState.totalPrice}
    toppingAdded={addToppingHandler}
    toppingRemoved={removeToppingHandler}
    checkout={checkoutHandler}
  />
  </Grid>
  ) */
};

export default PizzaPal;
