import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import './NavbarTop.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const NavbarTop = ({isActive},{toggleButton}) => {
  return (
    <>

  <Navbar className="navbar" variant="light">  
    <Navbar.Brand href="#home">
      
      <img
      src="https://pbs.twimg.com/profile_images/603568605796634624/Nq0nXZZA_400x400.jpg"
      width="30"
      height="30"
      className="d-inline-block align-top"
      alt="React Bootstrap logo"
    />
    
    
      </Navbar.Brand>

      <div>
      <Button variant="primary" className="login-btn">Login</Button>{' '}
    </div>
    <div>
      <Button variant="primary" className="login-btn">Registrieren</Button>{' '}
    </div> 
  </Navbar>

    {/*https://react-bootstrap.github.io/layout/grid/#grid-props 
      Positioning with offset , sm und md
    
    */}

  <Container >
    <Row>
      <Col>
        <Dropdown >
            <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
            Kategorien
            </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Bücher</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Veranstaltungen</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">Etwas Posten</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <Form.Label htmlFor="inlineFormInput" srOnly>
          Search
        </Form.Label>
        <Form.Control
          className="mb-2"
          id="inlineFormInput"
          placeholder="Search"
        />
      </Col>
    </Row>
  </Container> 

</>
  );
};

export default NavbarTop;