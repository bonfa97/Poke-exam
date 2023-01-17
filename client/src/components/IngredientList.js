import React from 'react';

const BowlList = (props) => {
  return (
    <ul className="bowl-list">
      <li className="category">{props.category}</li>
      <li className="info">{props.info}</li>
      {props.bowls.map((bowl) => (
        <li key={bowl.id} className="bowl-list__item">
          <span className="display-linebreak">{bowl.name}</span>
          {' '}
          <span className="bowl-list__price">€{bowl.price}</span>
        </li>
      ))}
    </ul>
  );
};

const ProteinList = (props) => {
  return (
    <ul className="protein-list">
      <li className="category">{props.category}</li>
      <li className="info">{props.info}</li>
      {props.proteins.map((protein) => (
        <li key={protein.id} className="protein-list__item">
          {protein.name}
        </li>
      ))}
    </ul>
  );
};

const IngredientList = (props) => {
  return (
    <ul className="ingredient-list">
      <li className="category">{props.category}</li>
      <li className="info">{props.info}</li>
      {props.ingredients.map((ingredient) => (
        <li key={ingredient.id} className="ingredient-list__item">
          {ingredient.name}
        </li>
      ))}
    </ul>
  );
};

export {BowlList, ProteinList, IngredientList};
