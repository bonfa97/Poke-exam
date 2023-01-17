import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';

import OrderForm from './OrderForm';
import OrderTable from './PastOrders';
import { LoginForm } from './Homepage';
import { RouteFilters } from './Filters';

import MessageContext from '../messageCtx';
import API from '../API';

/**
 * Except when we are waiting for the data from the server, this layout is always rendered.
 * <Outlet /> component is replaced according to which route is matching the URL.
 */
function DefaultLayout(props) {

  const location = useLocation();

  const { filterLabel } = useParams();
  const filterId = filterLabel || (location.pathname === "/" && 'filter-all');

  return (
    <Row className="vh-100">
      <Col md={4} bg="light" className="below-nav" id="left-sidebar">
        <RouteFilters items={props.filters} selected={filterId} />
      </Col>
      <Col md={8} className="below-nav">
        <Outlet />
      </Col>
    </Row>
  );

}

function MainLayout(props) {

  const [orders, setOrders] = useState([]);
  const [dirty, setDirty] = useState(true);

  const location = useLocation();

  const {handleErrors} = useContext(MessageContext);


  const { filterLabel } = useParams();
  const filterName = props.filters[filterLabel] ? props.filters[filterLabel].label : 'Past orders';
  const filterId = filterLabel || (location.pathname === "/" && 'filter-past_orders');

  // Without this we do not pass the if(dirty) test in the [filterId, dirty] useEffect
  useEffect(() => {
    setDirty(true);
  }, [filterId])


  useEffect(() => {
    if (dirty) {
      API.getOrders(filterId)
        .then(orders => {
          setOrders(orders);
          setDirty(false);
        })
        .catch(e => { handleErrors(e);  } ); 
    }
  }, [filterId, dirty]);

  const deleteOrder = (order) => {
    API.deleteOrder(order)
      .then(() => { setDirty(true);})
      .catch(e => handleErrors(e)); 
  }

  // update a film into the list
  const updateOrder = (order) => {
    API.updateOrder(order)
      .then(() => { setDirty(true); })
      .catch(e => handleErrors(e)); 
  }

  // When an unpredicted filter is written, all the orders are displayed.
  const filteredOrders = orders; 


  return (
    <>
      <h1 className="pb-3">Filter: <span className="notbold">{filterName}</span></h1>
      <OrderTable orders={filteredOrders}
        deleteOrder={deleteOrder} updateOrder={updateOrder} />
      <Link to="/add" state={{ nextpage: location.pathname }}>
        <Button variant="primary" size="lg" className="fixed-right-bottom" > Proceed with the order </Button>
      </Link>
    </>
  )
}

function AddLayout(props) {

  const {handleErrors} = useContext(MessageContext);

  // add a order into the list
  const addOrder = (order) => {
    return API.addOrder(order)
      .catch(e => handleErrors(e)); 
  }
  return (
    <OrderForm addOrder={addOrder} />
  );
}

function EditLayout(props) {

  const {handleErrors} = useContext(MessageContext);

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.getOrder(orderId)
      .then(order => {
        setOrder(order);
      })
      .catch(e => {
        handleErrors(e); 
      }); 
  }, [orderId]);

  // update a film into the list
  const editOrder = (order) => {
    API.updateOrder(order)
      .catch(e => handleErrors(e)); 
  }


  return (
    order ? <OrderForm order={order} editOrder={editOrder} /> : <></>
  );
}


function NotFoundLayout() {
  return (
    <>
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">
        <Button variant="primary">Go Home!</Button>
      </Link>
    </>
  );
}

function LoginLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={12} className="below-nav">
        <LoginForm login={props.login} />
      </Col>
    </Row>
  );
}

/**
 * This layout shuld be rendered while we are waiting a response from the server.
 */
function LoadingLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={4} bg="light" className="below-nav" id="left-sidebar">
      </Col>
      <Col md={8} className="below-nav">
        <h1>Too many orders are creating some traffic...</h1>
      </Col>
    </Row>
  )
}

export { DefaultLayout, AddLayout, EditLayout, NotFoundLayout, LoginLayout, MainLayout, LoadingLayout }; 