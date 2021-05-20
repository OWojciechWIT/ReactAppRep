import React from "react";
import { Grid, Image, Label } from "semantic-ui-react";

const MenuItem = (props) => {
  return (
    <Grid.Column mobile={4} computer={2} textAlign="center">
      <Image src={props.image} alt={props.alt} size="tiny" centered />
      <Label pointing>&euro; {props.price.toFixed(2)} </Label>
    </Grid.Column>
  );
};

export default MenuItem;
