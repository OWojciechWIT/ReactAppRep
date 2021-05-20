import { Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";

import logo from "../../assets/logo.png";

const Nav = (props) => {

  const auth = useContext(AuthContext);

  return (
    <Menu color="red" stackable inverted>
      <Menu.Item>
        <img src={logo} alt="Pizza Pal Logo" />
      </Menu.Item>

      <Menu.Item as={NavLink} to="/" exact>
        Pizza Pal
      </Menu.Item>

      {auth.isLoggedIn && (
        <Menu.Item as={NavLink} to={`/orders/${auth.userId}`}>
          Your Orders
        </Menu.Item>
      )}

      {auth.isLoggedIn && (
        <Menu.Item as={NavLink} to={`/users/${auth.userId}`}>
          Your Account
        </Menu.Item>
      )}

      {!auth.isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/authenticate">
            Signup/Login
          </Menu.Item>
        </Menu.Menu>
      )}

      {auth.isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/" onClick={auth.logout}>
            Log out
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default Nav;
