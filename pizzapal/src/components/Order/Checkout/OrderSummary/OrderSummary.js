import React from "react";
import { Header, List } from 'semantic-ui-react';

const OrderSummary = (props) => {
  
  // get all the ids of the chosen toppings
  const toppingIdsArray = [];
  for(let i in props.toppings){
      toppingIdsArray.push(props.toppings[i].id);
  };

  // function to count occurences of each topping
  const countOccurrences = (array, value) => array.reduce((count, num) => (num === value ? count + 1 : count), 0);

  // create an empty array for storing the toppings with their counts
  const toppingsSummary = [];

  // loop through and check for all 16 ids
  for(let id=0; id<16; id++){

      // use countOccurences to count occurences of each id
      let toppingCount = countOccurrences(toppingIdsArray, id);

      // if a topping has a count more than 0
      if (toppingCount > 0) {

          // create a new object for that topping that includes the count
          const toppingWithCount = {
              id: id,
              name: props.menu[id].alt,
              count: toppingCount
          };

          // add the toppingWithCount to the toppingsSummary array
          toppingsSummary.push(toppingWithCount);
      }
  }
    
    return (
    <div>
      <Header as='h4' className='h4margin'>
      Total Price: &euro; {props.price.toFixed(2)} 
    </Header>

    <List divided verticalAlign='middle'>
      {toppingsSummary.map((topping) => {
          return( 
              <List.Item key={topping.id}>
                  {topping.name}: {topping.count}
              </List.Item>
          )
      })}
  </List>
    </div>
  )
};

export default OrderSummary;
