import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import './NavbarTop.css';



const NavbarTop = ({isActive},{toggleButton}) => {
  return (
    <>

  <Navbar className="background-color" variant="light">
    <Navbar.Brand href="#home">
        <img
            src="https://pbs.twimg.com/profile_images/603568605796634624/Nq0nXZZA_400x400.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
        />
        </Navbar.Brand>
        <Dropdown>
            <Dropdown.Toggle Classname="color" rvariant="success" id="dropdown-basic">
            Kategorien
            </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Bücher</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Veranstaltungen</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-3">Etwas Posten</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form>
    
  </Navbar>
</>
  );
};

export default NavbarTop;