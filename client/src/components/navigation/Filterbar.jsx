import React, { useEffect, useState } from "react";
import { HamburgerSpring } from 'react-animated-burgers';
import { IconContext } from 'react-icons';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import './Filterbar.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


//Funktion toggleFilter übergeben
const Filterbar = ({toggleFilter}) =>{

  const [ value, setValue ] = React.useState(50);

    const searchHandler =(e) =>{
        //kommt noch
    }



return(
    <>
    <div>

        <nav className='nav-menu active'>
  
    <Container className="filterContainer">

    <Form >
    
        {/*Suchleiste*/ }
        <Row>
            <InputGroup size="sm">
          
                <FormControl
                  placeholder="search..." onChange={(e)=>{searchHandler(e)}}
                />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" className="textIcon"><i class="fas fa-search"></i></InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>   
        </Row>

        {/*Dropdown für Kategorie und Preistyp*/ }
        <br></br>
        <Form.Row >
    <Col>
    <Dropdown>
        <Dropdown.Toggle variant="success" size="sm">
    Festpreis 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item>Festpreis</Dropdown.Item>
    <Dropdown.Item>Verhandelbar</Dropdown.Item>
    <Dropdown.Item>Leihen</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</Col>

<Col>
<Dropdown>
        <Dropdown.Toggle variant="success" size="sm">
    Angebot 
  </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown.Item>Angebot</Dropdown.Item>
        <Dropdown.Item>Gesucht</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
</Col>
</Form.Row>

         {/*Slider üfür preis*/ }
      
        <Row>
          <Col>
          <input type="range" class="slider" />
          </Col>
        </Row>
      
         

            <div className="logout-btn-container">
            <Button className="button logout-btn login-btn" variant="secondary" onClick={(e)=>{toggleFilter(e)}} >
                      Abbruch
            </Button>
            </div>
    </Form>
    </Container>
        </nav>
      
          
  
    </div>
    </>
)

}
export default Filterbar;