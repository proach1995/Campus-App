import React from "react";
<<<<<<< Updated upstream


const Login = () => {
  return (
    <div>
      {/* Add components here*/}


    </div>
  );
};

export default Login;
=======
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';

const Login = () => {
    return (
      <Container className="routeContainer">
        <h1>Willkommen beim Login!</h1>
          
      
        
          <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="test0001@hs-kl.de" />
   
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="eingeloggt bleiben" />
  </Form.Group>
    <div className="buttonBackground" >
        <Button href="/home" className="button">Login</Button>
    </div>
</Form>
        
      </Container>

  
    );
  };
  
  export default Login;
>>>>>>> Stashed changes
