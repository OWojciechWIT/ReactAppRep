import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import MenuItem from "./MenuItem/MenuItem";

const Menu = (props) => {
  return (
    <Grid.Column width={12}>
      <Segment color="red">
        <Header as="h2" textAlign="center" color="red">
          Pizza Pal Menu
        </Header>
      </Segment>
      <Grid>
        {props.menu.map((toppings, index) => {
          return (
            <MenuItem
              key={toppings.id}
              image={toppings.image}
              alt={toppings.alt}
              price={toppings.price}
            />
          );
        })}
      </Grid>
    </Grid.Column>
  );
};

export default Menu;
