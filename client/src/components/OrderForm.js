
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Order } from '../models/Order';
import API from '../API';

const SERVER_URL = 'http://localhost:3001/api/';

const bowlsList = {
  1: { name: 'REGULAR', price: 9, maxProteins: 1, maxIngredients: 4 },
  2: { name: 'MEDIUM', price: 11, maxProteins: 2, maxIngredients: 4 },
  3: { name: 'LARGE', price: 14, maxProteins: 3, maxIngredients: 6 },
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


const OrderForm = (props) => {

  const [selectedBowls, setSelectedBowls] = useState([]);
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [proteinsCount, setProteinsCount] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);

  const [bowlType, setBowlType] = useState(props.order ? props.order.bowls : 0);
  const [bowls, setBowls] = useState(props.order ? props.order.bowls : 0);
  const [proteins, setProteins] = useState(props.order ? props.order.proteins : 0);
  const [ingredients, setIngredients] = useState(props.order ? props.order.ingredients : 0);
  const [price, setPrice] = useState(props.order ? props.order.price : 0);

  function computePrice (type, b, p, i)  {
    const bowl = bowlsList[type];
    let price = bowl.price
    if (p > bowl.maxProteins) {
      price += (p - bowl.maxProteins) * (bowl.price / 5)
    }
    if (i > bowl.maxIngredients) {
      price += (i - bowl.maxIngredients) * (bowl.price / 5)
    }
    if (b > 4) {
      price -= price / 10
    }
    setPrice((price * b).toFixed(2));
  }


  const setBowlsQuantity = (event) => {
    const { value } = event.target;
    setBowls(value);
    computePrice(bowlType, value, proteins, ingredients);
  }


  const handleBowlChange = (event) => {
    const { id, value, checked } = event.target;
    if (checked) {
      setSelectedBowls([...selectedBowls, id]);
      setSelectedCheckboxId(id);
    } else {
      setSelectedBowls(selectedBowls.filter((bowl) => bowl !== id));
      setSelectedCheckboxId(null);
    }
    setBowlType(value);
    computePrice(value, bowls, proteins, ingredients);
  }

  const handleProteinChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedProteins([...selectedProteins, id]);
      setProteinsCount(proteinsCount + 1);
      setProteins(proteinsCount + 1);
      computePrice(bowlType, bowls, proteinsCount + 1, ingredients);
    } else {
      setSelectedProteins(selectedProteins.filter((protein) => protein !== id));
      setProteinsCount(proteinsCount - 1);
      setProteins(proteinsCount - 1);
      computePrice(bowlType, bowls, proteinsCount - 1, ingredients);
    }
  }

  const handleIngredientChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, id]);
      setIngredientsCount(ingredientsCount + 1);
      setIngredients(ingredientsCount + 1);
      computePrice(bowlType, bowls, proteinsCount, ingredients + 1);
    } else {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== id));
      setIngredientsCount(ingredientsCount - 1);
      setIngredients(ingredientsCount - 1);
      computePrice(bowlType, bowls, proteinsCount, ingredients - 1);
    }
  }

  const navigate = useNavigate();   // useNavigate hook is necessary to change page
  const location = useLocation();  // useLocation hook is used to remember with filter was selected when we reached this form
  const nextpage = location.state?.nextpage || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(bowls < 1){
      alert('Please select a number of bowls');
      return;
  }  
    try {
      const response = await fetch(SERVER_URL + `check-availability?bowlType=${bowlType}&bowls=${bowls}`);
      const data = await response.json();
      if (data.status === 'success' && data.availability.availability >= bowls) {
        const newQuantity = data.availability.availability - bowls;
        const order = new Order({ bowls, proteins, ingredients, price });

        const newOrder = await props.addOrder(order)

        alert('Order placed successfully');
        //await API.updateAvailability(bowlType, newQuantity);
        await fetch(SERVER_URL + `update-availability?a=${bowlType}&b=${newQuantity}`);

        API.insertOrderProtein(newOrder.id, selectedProteins);
        API.insertOrderIngredient(newOrder.id, selectedIngredients);
        navigate('/');
        // }

      } 
      else {
        alert('Order denied, not enough ' + bowlsList[bowlType].name + ' poke bowls');
      }
    } catch (err) {
      console.error(err);
      alert('There was an error placing your order. Please try again later.');
    }
  }

  return (
    <Form className="block-example border border-primary rounded mb-0 form-padding" onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>Bowls: {bowls}</Form.Label>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(bowlsList).map((id) => (
            <li key={id}>
              <input
                type="checkbox"
                id={id}
                value={id}
                checked={id === selectedCheckboxId}
                onChange={handleBowlChange}
              />
              <label htmlFor={id}>{bowlsList[id].name}</label>
            </li>
          ))}
        </ul>
        <Form.Select aria-label="Bowls" defaultValue={bowlsList} onClick={setBowlsQuantity}>
          {[...Array(12)].map((v, i) => <option key={i} value={i}>{i}</option>)}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Proteins: {proteins}</Form.Label>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(proteinsList).map((id) => (
            <li key={id}>
              <input
                type="checkbox"
                id={id}
                value={id}
                onChange={handleProteinChange}
              />
              <label htmlFor={id}>{proteinsList[id].name}</label>
            </li>
          ))}
        </ul>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ingredients: {ingredients}</Form.Label>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(ingredientsList).map((id) => (
            <li key={id}>
              <input
                type="checkbox"
                id={id}
                value={id}
                onChange={handleIngredientChange}
              />
              <label htmlFor={id}>{ingredientsList[id].name}</label>
            </li>
          ))}
        </ul>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>  Price: {price}€ </Form.Label>
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">Save</Button>
      &nbsp;
      <Link to={nextpage}>
        <Button className="mb-3" variant="danger" >Cancel</Button>
      </Link>
    </Form>
  )
  //&nbsp è spazio bianco per quando non vuoi andare a capo
}

export default OrderForm;
