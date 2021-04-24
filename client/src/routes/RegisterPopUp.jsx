import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function RegisterPopUp() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button  className="button register-btn login-btn" variant="primary" onClick={handleShow}>
          Registrieren
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registriere dich!</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
          <Form.Row>
            <Form.Group  controlId="formGridEmail">
            <Form.Label>E-Mail Adresse</Form.Label>
            <Form.Control type="email" placeholder="test0001@stud.hs-kl.de" />
            </Form.Group>

            <Form.Group  controlId="formGridPassword">
            <Form.Label>Passwort</Form.Label>
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
    
</Form>


          </Modal.Body>
          <Modal.Footer>
            <div className="buttonBackground" >
                <Button href="/home" className="button">Registrieren</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  

  export default RegisterPopUp;