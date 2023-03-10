  import { useState } from 'react';
// // import { Form, Button, Alert, Col, Row } from 'react-bootstrap';
  import { Link, useLocation, useNavigate} from 'react-router-dom';
// // import React from 'react';
import { IngredientList }from './IngredientList';
import { ProteinList } from './IngredientList';
import { BowlList } from './IngredientList';

// // function LoginForm(props) {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');

// //   const [show, setShow] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // if user has been redirected here from another page, go back to that urls
// //   const oldPath = location?.state?.pathname || "";


// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const credentials = { username, password };

// //     props.login(credentials)
// //       .then( () => navigate( oldPath ) )
// //       .catch((err) => { 
// //         setErrorMessage(err.error); setShow(true); 
// //       });
// //   };

// // const bowls = [
// //   {id: 1, name: 'REGULAR \n 1 protein and up to 4 ingredients \n', price: 9},
// //   {id: 2, name: 'MEDIUM \n 2 proteins and up to 4 ingredients \n', price: 11},
// //   {id: 3, name: 'LARGE \n 3 proteins and up to 6 ingredients \n', price: 14},
// // ];

// // const proteins = [
// //   {id: 1, name: 'tuna'},
// //   {id: 2, name: 'chicken'},
// //   {id: 3, name: 'salmon'},
// //   {id: 4, name: 'tofu'},
// // ];

// // const ingredients = [
// //   {id: 1, name: 'avocado'},
// //   {id: 2, name: 'ananas'},
// //   {id: 3, name: 'cashew nuts'},
// //   {id: 4, name: 'kale'},
// //   {id: 5, name: 'mango'},
// //   {id: 6, name: 'peppers'},
// //   {id: 7, name: 'corn'},
// //   {id: 8, name: 'wakame'},
// //   {id: 9, name: 'tomatoes'},
// //   {id: 10, name: 'carrots'},
// //   {id: 11, name: 'salad'},
// // ];

// //   return (
    
// //     <Row className="vh-100 justify-content-md-center">
// //     <Col md={4} >
// //     <div className="pb-3 rainbow">Login and order!</div>

// //       <Form  className="login-form" onSubmit={handleSubmit}>
// //           <Alert
// //             dismissible
// //             show={show}
// //             onClose={() => setShow(false)}
// //             variant="danger">
// //             {errorMessage}
// //           </Alert>
// //           <Form.Group className="mb-3" controlId="username">
// //             <Form.Label>email:</Form.Label>
// //             <Form.Control
// //               type="email"
// //               value={username} placeholder="Example: john.doe@polito.it"
// //               onChange={(ev) => setUsername(ev.target.value)}
// //               required={true}
// //             />
// //           </Form.Group>
// //           <Form.Group className="mb-3" controlId="password">
// //             <Form.Label>password:</Form.Label>
// //             <Form.Control
// //               type="password"
// //               value={password} placeholder="Enter the password."
// //               onChange={(ev) => setPassword(ev.target.value)}
// //               required={true} minLength={6}
// //             />
// //           </Form.Group>
// //           <Button className="mt-3 distance" type="submit">Login</Button>
// //       </Form>
      
// //       </Col>
// //       <h1 className="welcome" >Check out all our menu options!</h1>
// //         <div className="container">
// //           <BowlList category="BOWLS" info="10% discount if you order more than 4 bowls" bowls={bowls} />
// //           <ProteinList category="PROTEINS" info="20% increase for each extra added" proteins={proteins} />
// //           <IngredientList category="INGREDIENTS" info="20% increase for each extra added" ingredients={ingredients} />
// //         </div>
// //       </Row>

// //   )
// // };

// // function LogoutButton(props) {
// //   return (
// //         <Button variant="outline-light" onClick={props.logout}>Logout</Button>
// //   )
// // }

// // export { LoginForm, LogoutButton };

// import React from 'react';
// import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
// import { BowlList, ProteinList, IngredientList } from './IngredientList';
import { Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';


function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // if user has been redirected here from another page, go back to that urls
  const oldPath = location?.state?.pathname || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    props.login(credentials)
      .then( () => navigate( oldPath ) )
      .catch((err) => { 
        setErrorMessage(err.error); setShow(true); 
      });
  };

  const bowls = [
    {id: 1, name: 'REGULAR \n 1 protein and up to 4 ingredients \n', price: 9},
    {id: 2, name: 'MEDIUM \n 2 proteins and up to 4 ingredients \n', price: 11},
    {id: 3, name: 'LARGE \n 3 proteins and up to 6 ingredients \n', price: 14},
  ];

  const proteins = [
    {id: 1, name: 'tuna'},
    {id: 2, name: 'chicken'},
    {id: 3, name: 'salmon'},
    {id: 4, name: 'tofu'},
  ];

  const ingredients = [
    {id: 1, name: 'avocado'},
    {id: 2, name: 'ananas'},
    {id: 3, name: 'cashew nuts'},
    {id: 4, name: 'kale'},
    {id: 5, name: 'mango'},
    {id: 6, name: 'peppers'},
    {id: 7, name: 'corn'},
    {id: 8, name: 'wakame'},
    {id: 9, name: 'tomatoes'},
    {id: 10, name: 'carrots'},
    {id: 11, name: 'salad'},
  ];

  // const BowlList = (props) => {
  //   return (
  //     <ul className="bowl-list">
  //       <li className="categorynohover">{props.category}</li>
  //       <li className="info">{props.info}</li>
  //       {props.bowls.map((bowl) => (
  //         <li key={bowl.id} className="bowl-list__item">
  //           <span className="display-linebreak">{bowl.name}</span>
  //           {' '}
  //           <span className="bowl-list__price">???{bowl.price}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  
  // const ProteinList = (props) => {
  //   return (
  //     <ul className="protein-list">
  //       <li className="categorynohover">{props.category}</li>
  //       <li className="info">{props.info}</li>
  //       {props.proteins.map((protein) => (
  //         <li key={protein.id} className="protein-list__item">
  //           {protein.name}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  
  // const IngredientList = (props) => {
  //   return (
  //     <ul className="ingredient-list">
  //       <li className="categorynohover">{props.category}</li>
  //       <li className="info">{props.info}</li>
  //       {props.ingredients.map((ingredient) => (
  //         <li key={ingredient.id} className="ingredient-list__item">
  //           {ingredient.name}
  //         </li>
  //       ))}
  //   </ul>
  //   );
  // };
  

//   return (
//     <Container >
//       <Row >
//         <Col md={8}>
//         <h1 className="text-center">Menu</h1>
//           <Row>
//             <Col md={4}>
//               <BowlList bowls={bowls}/>
//             </Col>
//             <Col md={4}>
//               <ProteinList proteins={proteins}/>
//             </Col>
//             <Col md={4}>
//               <IngredientList ingredients={ingredients}/>
//             </Col>
//           </Row>
//         </Col>
//         <Col md={4}>
        // <h1 className="text-center">Login</h1>
        //   <Form onSubmit={handleSubmit}>
        //     <Alert
        //       dismissible
        //       show={show}
        //       onClose={() => setShow(false)}
        //       variant="danger">
        //       {errorMessage}
        //     </Alert>
        //     <Form.Group className="mb-3" controlId="username">
        //       <Form.Label>email:</Form.Label>
        //       <Form.Control
        //         type="email"
        //         value={username} placeholder="Example: john.doe@polito.it"
        //         onChange={(ev) => setUsername(ev.target.value)}
        //         required={true}
        //       />
        //     </Form.Group>
        //     <Form.Group className="mb-3" controlId="password">
        //       <Form.Label>password:</Form.Label>
        //       <Form.Control
        //         type="password"
        //         value={password} placeholder="Enter the password."
        //         onChange={(ev) => setPassword(ev.target.value)}
        //         required={true} minLength={6}
        //       />
        //     </Form.Group>
        //     <Button className="mt-3 distance" type="submit">Login</Button>
        //   </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
// function LogoutButton(props) {
//   return (
//         <Button variant="outline-light" onClick={props.logout}>Logout</Button>
//   )
// }

// export { LoginForm, LogoutButton };

//              <BowlList category="BOWLS" info="10% discount if you order more than 4 bowls" bowls={bowls} />
// //           <ProteinList category="PROTEINS" info="20% increase for each extra added" proteins={proteins} />
//              <IngredientList category="INGREDIENTS" info="20% increase for each extra added" ingredients={ingredients} />
  return (
    <Container>
      <Row className='d-flex align-items-stretch' xs={12} md={6} xxl={12}>
        <Col className='align-items-stretch' xs={12} md={12} xxl={12}>
          {/* menu */}
          <BowlList category="BOWLS" info="10% discount if you order more than 4 bowls" bowls={bowls}/>
          <ProteinList category="PROTEINS" info="20% increase for each extra added" proteins={proteins}/>
        </Col>
        </Row>
        <Row className='d-flex align-items-stretch' xs={12} md={6} xxl={12}>
        <Col className='align-items-stretch' xs={12} md={12} xxl={12}>
          {/* menu */}
          <IngredientList category="INGREDIENTS" info="20% increase for each extra added" ingredients={ingredients}/>
          
        </Col>
        </Row>
        <Row className="d-flex align-items-stretch" xs={12} md={6} xxl={12}>
        <Col className='align-items-stretch' xs={12} md={12} xxl={12}>
          {/* login form */}
          <h1 className="text-center">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Alert
              dismissible
              show={show}
              onClose={() => setShow(false)}
              variant="danger">
              {errorMessage}
            </Alert>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>email:</Form.Label>
              <Form.Control
                type="email"
                value={username} placeholder="Example: john.doe@polito.it"
                onChange={(ev) => setUsername(ev.target.value)}
                required={true}
              />
            </Form.Group>
            <Form.Group className="mb-" controlId="password">
              <Form.Label>password:</Form.Label>
              <Form.Control
                type="password"
                value={password} placeholder="Enter the password."
                onChange={(ev) => setPassword(ev.target.value)}
                required={true} minLength={6}
              />
            </Form.Group>
            <Button className="mt-3 distance" type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}
function LogoutButton(props) {
  return (
        <Button variant="outline-light" onClick={props.logout}>Logout</Button>
  )
}

export { LoginForm, LogoutButton };