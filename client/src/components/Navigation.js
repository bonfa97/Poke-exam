import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './Homepage';

const Navigation = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Navbar bg="primary" expand="sm" variant="dark" fixed="top" className="navbar-padding">
      <Link to="/">
        <Navbar.Brand>
        <i className="bi bi-cart3 icon-size"/> Hawaiian Poke
        </Navbar.Brand>
      </Link>
      <Nav className="ml-md-auto">
        <Navbar.Text className="mx-2">
          {props.user && props.user.name && `Welcome, ${props.user.name}!`}
        </Navbar.Text>
        <Form className="mx-2">
          {props.loggedIn ? <LogoutButton logout={props.logout} /> : <></>}
        </Form>
      </Nav>
    </Navbar>
  );
}

export { Navigation }; 