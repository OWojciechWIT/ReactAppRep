import React from "react";
import { Grid } from 'semantic-ui-react';

const PizzaPal = (props) => {
  return (
    <Grid divided='vertically' stackable>
        <Grid.Row centered>
            Menu
        </Grid.Row>
        <Grid.Row>
            Order
        </Grid.Row>
  </Grid>
  )
};

export default PizzaPal;
