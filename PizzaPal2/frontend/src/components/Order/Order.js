import { Grid, Header, Button, Dimmer } from "semantic-ui-react";
import Controls from "./Controls/Controls";
import Checkout from "./Checkout/Checkout";
import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { Link } from 'react-router-dom';

const Order = (props) => {

  const auth = useContext(AuthContext);
  let active = !auth.isLoggedIn;

  return (
    <Grid.Row>
      <Dimmer.Dimmable as={Grid} blurring dimmed={active}>
        <Grid.Row columns={2} centered>
          <Controls
            menu={props.menu}
            toppingAdded={props.toppingAdded}
            toppingRemoved={props.toppingRemoved}
          />
          <Checkout
            menu={props.menu}
            toppings={props.chosenToppings}
            price={props.totalPrice}
            checkout={props.checkout}
            disabled={props.disabled}
          />
        </Grid.Row>
        <Dimmer active={active}>
          <Header as="h2" inverted>
            Log in to start creating your pizza!
          </Header>
          <Button as={Link} to="/authenticate" color="red" size="large">
            Signup/Login
          </Button>
        </Dimmer>
      </Dimmer.Dimmable>
    </Grid.Row>
  );
};

export default Order;
