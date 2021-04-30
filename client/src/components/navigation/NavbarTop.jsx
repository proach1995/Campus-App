import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import './NavbarTop.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';



const NavbarTop = ({isActive},{toggleButton}) => {
  return (
    <>

  <Navbar className="navbarStyling" variant="light">  
    <a href="/" className="branding">Campus<span className="brandingFat">APP</span></a>
    {/*https://react-bootstrap.github.io/layout/grid/#grid-props 
      Positioning with offset , sm und md
    
    */}
  </Navbar>
  <Navbar className="navbarSubline">
    <Row >
      <Col>
        <Dropdown >
            <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
            Kategorien
            </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="/marktplatz">Marktplatz</Dropdown.Item>
                  <Dropdown.Item href="/events">Veranstaltungen</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/postupload">Etwas Posten</Dropdown.Item>
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
  </Navbar>

</>
  );
};

export default NavbarTop;