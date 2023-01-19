import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap/'
import { Link, useLocation } from 'react-router-dom';
import API from '../API';
const SERVER_URL = 'http://localhost:3001/api/';
//import { useEffect } from 'react';

const bowlsList = {
  1: { name: 'REGULAR', price: 9 },
  2: { name: 'MEDIUM', price: 11 },
  3: { name: 'LARGE', price: 14 },
};

const proteinsList = {
  4: { name: 'tuna' },
  5: { name: 'chicken' },
  6: { name: 'salmon' },
  7: { name: 'tofu' },
};

const ingredientsList = {
  8: { name: 'avocado' },
  9: { name: 'ananas' },
  10: { name: 'cashew nuts' },
  11: { name: 'kale' },
  12: { name: 'mango' },
  13: { name: 'peppers' },
  14: { name: 'corn' },
  15: { name: 'wakame' },
  16: { name: 'tomatoes' },
  17: { name: 'carrots' },
  18: { name: 'salad' },
};

function OrderTable(props) {
  useEffect(() => {
    // console.log("orders", props.orders)
  }, [props.orders]);
  
  return (
    <Table>
      <tbody>
        {
          props.orders.map((order) =>
            <OrderRow orderData={order} key={order.id} id={order.id}
              deleteOrder={props.deleteOrder} updateOrder={props.updateOrder} />
          )
        }
      </tbody>
    </Table>
  );
}

function OrderRow(props) {

  const [typeChecked, setTypeChecked] = useState([]);
  const [proteinsChecked, setProteinsChecked] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const location = useLocation();
  const [detailsVisible, setDetailsVisible] = useState(false);
  /* location hook is used to pass state to the edit view (or add view). 
   * So, we may be able to come back to the last selected filter view if cancel is pressed.
   */

  useEffect(() => {
     fetchData()
  }, []);


  const fetchData = async () => {
    try {
      const response0 = await fetch(SERVER_URL + `order_type?id=${props.orderData.id}`);
        //const response0 = await API.checkTypeDetails(props.orderData.id);
        // const response0 = await fetch(SERVER_URL + `order_type/${props.orderData.id}`);
        if (!response0.ok) throw new Error(response1.statusText);
        const data0 = await response0.json();
        // console.log("res0",data0);
        setTypeChecked(data0.vectorT);
        //setTypeChecked(Array.isArray(data0) ? data0 : []);
       const response1 = await fetch(SERVER_URL + `order_protein?id=${props.orderData.id}`);
        //const response1 = await API.checkProteinsDetails(props.orderData.id);
        // const response1 = await fetch(SERVER_URL + `order_protein/${props.orderData.id}`);
        if (!response1.ok) throw new Error(response1.statusText);
        const data1 = await response1.json();
        // console.log("res1",data1);
        setProteinsChecked(data1.vectorP);
        //setProteinsChecked(Array.isArray(data1) ? data1 : []);
        const response2 = await fetch(SERVER_URL + `order_ingredient?id=${props.orderData.id}`);
        //const response2 = await API.checkIngredientsDetails(props.orderData.id);
        // const response2 = await fetch(SERVER_URL + `order_ingredient/${props.orderData.id}`);
        if (!response2.ok) throw new Error(response2.statusText);
        const data2 = await response2.json();
        // console.log("res2",data2);
        setIngredientsChecked(data2.vectorI);
        //setIngredientsChecked(Array.isArray(data2) ? data2 : []);
    } catch (error) {
      console.log(error);
    }
  }
  const toggleDetails = async () => {
    setDetailsVisible(!detailsVisible);
  }
  
  return (
    <tr>
      <td>
        { /* Forces link to the same page so that has the same appearence of the edit link */}
        <Link to={{}}>
          <i className="bi bi-trash" onClick={() => { props.deleteOrder(props.orderData) }} />
        </Link>
      </td>
      <td>
        <p className={['category keep-white-space', props.orderData.favorite ? "bi-favorite" : ""].join(' ')
        }>
          <tr onClick={toggleDetails}>
          {`${props.orderData.bowls} bowl/s`}
          
          {detailsVisible && (
            <div>
              <p></p>
              <ul>
                {typeChecked.map((bowl, index) => (<p key={index}>{bowlsList[bowl].name}</p>))}
              </ul>
            </div>
          )}
          </tr>
        </p>
      </td>

      <td>
        <p className={['category keep-white-space', props.orderData.favorite ? "bi-favorite" : ""].join(' ')}>
          <tr onClick={toggleDetails}>
            {`${props.orderData.proteins} protein/s`}
          
          {detailsVisible && (
            <div>
              <p></p>
              <ul>
                {proteinsChecked.map((protein, index) => (<p key={index}>{proteinsList[protein].name}</p>))}
              </ul>
            </div>
          )}
          </tr>
        </p>
      </td>

      <td>
        <p className={['category keep-white-space', props.orderData.favorite ? "bi-favorite" : ""].join(' ')}>
          <tr onClick={toggleDetails}>
            {`${props.orderData.ingredients} ingredient/s`}
            {detailsVisible && (
              <div>
                <p></p>
                <ul>
                  {ingredientsChecked.map((ingredient, index) => (<p key={index}>{ingredientsList[ingredient].name}</p>))}
                </ul>
              </div>
            )}
          </tr>
        </p>
      </td>

      <td>
        <p className={['categorynohover keep-white-space', props.orderData.favorite ? "bi-favorite" : ""].join(' ')}>
          {`${props.orderData.price.toFixed(2)}€`}
        </p>
      </td>
    </tr>
  );
}

export default OrderTable;