import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';


const Register = () => {
    return (
      <Container className="routeContainer">
          <h1>Registriere dich!</h1>
       <Form>
  <Form.Row>
    <Form.Group  controlId="formGridEmail">
      <Form.Label>E-Mail Adresse</Form.Label>
      <Form.Control type="email" placeholder="test0001@stud.hs-kl.de" />
    </Form.Group>

    <Form.Group  controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Passwort" />
    </Form.Group>
  </Form.Row>

  

  

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Addresse</Form.Label>
    <Form.Control placeholder="Amerikastraße 1" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Stadt</Form.Label>
      <Form.Control placeholder="Zweibrücken"/>
    </Form.Group>

    <Form.Group controlId="formGridAddress1">
    <Form.Label>Postleitzahl</Form.Label>
    <Form.Control placeholder="66450" />
  </Form.Group>

    

    
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Datenschutzbestimmungen" />
  </Form.Group>

 
    <div className="buttonBackground" >
        <Button href="/home" className="button">Registrieren</Button>
    </div>
      
</Form>
      </Container>
  
    );
  };
  
  export default Register;