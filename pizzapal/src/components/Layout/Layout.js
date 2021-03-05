import React from "react";
import './Layout.css';
import { Container } from 'semantic-ui-react';
import Nav from '../Nav/Nav';

const Layout = (props) => {
  return (
    <Container>
      <Nav />
      <main>
        {props.children}
      </main>
    </Container>
  )
};

export default Layout;