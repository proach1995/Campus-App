import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';
import RegisterPopUp from "./RegisterPopUp";


const Login = () => {

  {/* https://dev.to/spukas/moving-arguments-from-child-to-parent-component-in-react-25lp */}


  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
      

      
      <Container className="routeContainer">
         <>

      
           <h1>Login</h1>
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
                    <div className="buttonBackground" >
                      <div className="centerLoginButtons">
                          <Button  className="button login-btn" variant="primary" >
                              Login
                            </Button>   
                      </div>  
                    </div>
                            <Button  onClick={handleShow} className="button register-btn login-btn" variant="secondary" >
                               Jetzt Registrieren 
                               <RegisterPopUp show={show} />
                              </Button> 


                  

          </>
      </Container>

      
    );
  };
  
  export default Login;
