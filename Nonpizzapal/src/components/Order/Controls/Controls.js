import React from "react";
import { Grid, Header } from 'semantic-ui-react';
import Control from './Control/Control';

const Controls = (props) => {
  return (
    <Grid.Column width={8}>
        <Header as='h2' textAlign='center' className='step'>
            Step 1: Choose your toppings
        </Header>
        <Grid>
            {props.menu.map((toppings, index) => {
            return <Control 
                key={toppings.id}
                alt={toppings.alt}
                added={() => props.toppingAdded(toppings.id)}
                removed={() => props.toppingRemoved(toppings.id)}
            />
            })}
        </Grid>
    </Grid.Column>
  )
};

export default Controls;
