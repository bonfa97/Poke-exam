
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

  const testPrice = (type, b, p, i) => {
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
    return price * b
  }


  function computePrice(type, b, p, i) {
    const test = testPrice(type, b, p, i)
    console.log("test", test)

    let priceUpdated = 0;

    if (type == 1 && b < 5) {
      if (p > 1 && i > 4)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 1) + (bowlsList[type].price / 5) * (i - 4)) * b);
      else if (i > 4)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (i - 4)) * b);
      else if (p > 1)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 1)) * b);
      else
        setPrice((bowlsList[type].price) * b);
    }
    else if (type == 1 && b > 4) {
      if (p > 1 && i > 4) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 1) + (bowlsList[type].price / 5) * (i - 4)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (i > 4) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (i - 4)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (p > 1) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 1)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else {
        priceUpdated = (bowlsList[type].price) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
    }
    else if (type == 2 && b < 5) {
      if (p > 2 && i > 4)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 2) + (bowlsList[type].price / 5) * (i - 4)) * b);
      else if (i > 4)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (i - 4)) * b);
      else if (p > 2)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 2)) * b);
      else
        setPrice((bowlsList[type].price) * b);
    }
    else if (type == 2 && b > 4) {
      if (p > 2 && i > 4) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 2) + (bowlsList[type].price / 5) * (i - 4)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (i > 4) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (i - 4)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (p > 2) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 2)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else {
        priceUpdated = (bowlsList[type].price) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
    }
    else if (type == 3 && b < 5) {
      if (p > 3 && i > 6)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 3) + (bowlsList[type].price / 5) * (i - 6)) * b);
      else if (i > 6)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (i - 6)) * b);
      else if (p > 3)
        setPrice((bowlsList[type].price + (bowlsList[type].price / 5) * (p - 3)) * b);
      else
        setPrice((bowlsList[type].price) * b);
    }
    else if (type == 3 && b > 4) {
      if (p > 3 && i > 6) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 3) + (bowlsList[type].price / 5) * (i - 6)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (i > 6) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (i - 6)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else if (p > 3) {
        priceUpdated = (bowlsList[type].price + (bowlsList[type].price / 5) * (p - 3)) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
      else {
        priceUpdated = (bowlsList[type].price) * b;
        setPrice(priceUpdated - priceUpdated / 10);
      }
    }
  }

  const setBowlsQuantity = (event) => {
    const { value } = event.target;
    setBowls(value);
    computePrice(bowlType, value, proteins, ingredients);
  }

  const setProteinsQuantity = (event) => {
    const { value } = event.target;
    setProteins(value);
    computePrice(bowlType, bowls, value, ingredients);
  }

  const setIngredientsQuantity = (event) => {
    const { value } = event.target;
    setIngredients(value);
    computePrice(bowlType, bowls, proteins, value);
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

    try {
      const response = await fetch(SERVER_URL + `check-availability?bowlType=${bowlType}&bowls=${bowls}`);
      const data = await response.json();
      if (data.status === 'success' && data.availability.availability >= bowls) {
        const newQuantity = data.availability.availability - bowls;
        const order = new Order({ bowls, proteins, ingredients, price });

        console.log('bowlType', bowlType);
        console.log('newQuantity', newQuantity);
        console.log('selectedProteins', selectedProteins);
        console.log('selectedIngredients', selectedIngredients);

        // if (props.order === undefined) {
        const newOrder = await props.addOrder(order)

        alert('Order placed successfully');
        // await API.updateAvailability(bowlType, newQuantity);
        await fetch(SERVER_URL + `update-availability?a=${bowlType}&b=${newQuantity}`);
        // } else {
        //   order.id = props.order.id;
        //   props.editOrder(order);
        //   alert('Order updated successfully');
        // }
        // for (let i = 0; i < selectedProteins.length; i++) {
        //   API.insertOrderProtein(order, selectedProteins[i]);
        // }
        // for (let i = 0; i < selectedIngredients.length; i++) {
        //   API.insertOrderIngredient(order, selectedIngredients[i]);
        // }

        API.insertOrderProtein(newOrder.id, selectedProteins);
        API.insertOrderIngredient(newOrder.id, selectedIngredients);
        navigate('/');
        // }

      } else {
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
        <Form.Select aria-label="Proteins" defaultValue={proteinsList} onClick={setProteinsQuantity}>
          {[...Array(5)].map((v, i) => <option key={i} value={i}>{i}</option>)}
        </Form.Select>
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
        <Form.Select aria-label="Ingredients" defaultValue={ingredientsList} onClick={setIngredientsQuantity}>
          {[...Array(8)].map((v, i) => <option key={i} value={i}>{i}</option>)}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>type: {bowlType} -- b: {bowls} -- p: {proteins} -- i: {ingredients} -- Price: {price} -- Pchecked: {proteinsCount} -- Ichecked: {ingredientsCount}</Form.Label>
        <Form.Select aria-label="Price" defaultValue={price} onChange={event => setPrice(event.target.value)}>
          {[...Array(20)].map((v, i) => <option key={i} value={i}>{i}</option>)}
        </Form.Select>
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
