import React from "react";
import { Menu } from 'semantic-ui-react';

const Nav = (props) => {
  return (
    <Menu color='red' stackable inverted>
    <Menu.Item>
      <img src='images/logo.png' alt='Pizza Pal Logo' />
    </Menu.Item>

    <Menu.Item active>
      Pizza Pal
    </Menu.Item>

    <Menu.Item>
      Your Orders
    </Menu.Item>

  </Menu>
  )
};

export default Nav;
