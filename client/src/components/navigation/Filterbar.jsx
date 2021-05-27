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
import { FormGroup } from "@material-ui/core";


//Funktion toggleFilter übergeben
const Filterbar = ({toggleFilter}) =>{

  const [ choosePrice, setChoosePrice ] = useState(100);

    const searchHandler =(e) =>{
        //kommt noch
    }

return(
    <>
    <div>
      <nav class="filterBar">
      <Container className="filterContainer">
        <Form >
        
        {/*input Textfeld*/}
        <Form.Group className="mb-3">
              <InputGroup size="sm">
                <FormControl
                  placeholder="search..." onChange={(e)=>{searchHandler(e)}}
                />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2" className="textIcon"><i class="fas fa-search"></i></InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>   
        </Form.Group>
        <br></br>
        {/*Dropboxen für Kategorie und Preistyp*/}
        <Form.Group className="mb-3">
        <Row >
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
        </Row>
        </Form.Group>
        <br></br>
        {/*slider für Preis*/}

      <Form.Group className="mb-3">
        <Row>
          <Col>
          <input type="range" class="slider" min="0" max="10000" onChange={(e)=>{setChoosePrice(e.target.value)}} />
          </Col>
        </Row>

        <Row>
          <Col className="sm-4">
            <Form.Label>
              Preis:
            </Form.Label>
          </Col>

          <Col className="sm-8" >
            <Form.Label >
              {choosePrice}
            </Form.Label>
          </Col>
        </Row>      
      </Form.Group>

          <Row>
            <Col >
              <Button className="button logout-btn login-btn" variant="secondary" onClick={(e)=>{toggleFilter(e)}} >
                      Abbruch
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

        

      </nav>
      
          
  
    </div>
    </>
)

}
export default Filterbar;