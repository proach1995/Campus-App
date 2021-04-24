import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function LoginPopUp() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
  
    return (
      <>
        <Button size="lg" className="button login-btn" variant="primary" onClick={handleShow}>
          Login
        </Button>

      
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Willkommen beim Login!</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="test0001@hs-kl.de" />
   
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Passwort</Form.Label>
    <Form.Control type="password" placeholder="Passwort" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="eingeloggt bleiben" />
  </Form.Group>
    
</Form>


          </Modal.Body>
          <Modal.Footer>
                <div className="buttonBackground" >
                    <Button href="/home" className="button">Login</Button>
                </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  

  export default LoginPopUp;