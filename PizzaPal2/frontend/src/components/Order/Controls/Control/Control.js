import React from "react";
import { Grid, Button, Icon } from 'semantic-ui-react';

const Control = (props) => {
  return (
    <Grid.Column mobile={4} computer={2} textAlign='center'>
        <p>{props.alt}</p>
        <Button.Group size='mini'>
            <Button color='green' icon onClick={props.added}>
                <Icon name='plus' />
            </Button>
            <Button color='red' icon onClick={props.removed}>
                <Icon name='minus' />
            </Button>
        </Button.Group>
    </Grid.Column>  
  )
};

export default Control;
