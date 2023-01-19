import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ListGroup } from 'react-bootstrap/';
import { NavLink } from 'react-router-dom';

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




const RouteFilters = (props) => {
  const { items, selected } = props;

  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);

  return (
    <ListGroup as="ul" variant="flush">
      {
        filterArray.map(([filterName, { label }]) => {
          return (
            <NavLink key={filterName} to={`/filter/${filterName}`} style={{ textDecoration: 'none' }}>
              <ListGroup.Item as="li" key={filterName} 
                action active={selected === filterName} >
                {label}
              </ListGroup.Item>
            </NavLink>
          );
        })
      }
    </ListGroup>
  )
}

export { RouteFilters, Navigation };
