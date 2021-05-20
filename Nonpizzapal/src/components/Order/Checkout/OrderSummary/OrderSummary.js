import React from "react";
import { Header, List } from 'semantic-ui-react';

const OrderSummary = (props) => {

    let summary = null;

    if(props.toppings.length > 0){

        summary = (
            <div>
                <Header as='h3'>
                    Your Pizza: 
                </Header>

                <List divided verticalAlign='middle'>
                    {props.toppings.map((topping) => {
                        return( 
                            <List.Item key={topping.id}>
                                {topping.name}: {topping.count}
                            </List.Item>
                        )
                    })}
                </List>

                <Header as='h4' className='h4margin'>
                    Total Price: &euro; {props.price.toFixed(2)}
                </Header>
            </div>
        );
    }
    else{
        summary = (
            <div>
                <Header as='h4' className="h4margin">
                    Start adding some toppings! 
                </Header>
            </div>
        );
    }


    return (
        <div>
            {summary}
        </div>
    );
};

export default OrderSummary;