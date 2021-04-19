import React from "react";
import { Button, Modal } from 'semantic-ui-react';
import OrderSummary from '../OrderSummary/OrderSummary';

const ORderModal = (props) => {
  
    const OrderModal = (props) => {

        const [open, setOpen] = useState(false);
    
        return (
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='green' size='large'>Order Now!</Button>}
            >
                <Modal.Header>Confirm your choices:</Modal.Header>
                <Modal.Content>
    
                  <OrderSummary 
                   menu = {props.menu}
                   toppings = {props.toppings}
                   price = {props.price}/>
    
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' onClick={() => setOpen(false)}>
                      Go Back
                  </Button>
                  <Button color='green' onClick={() => setOpen(false)}>
                      Check out
                  </Button>
                </Modal.Actions>
          </Modal>
        )
    
    };

    
};

export default ORderModal;
