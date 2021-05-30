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
const Filterbar = ({toggleFilter, isActive}) =>{

  const [ choosePrice, setChoosePrice ] = useState(100);
  
  
  
 

    const searchHandler =(e) =>{
        //kommt noch
    }
    useEffect(()=>{
      console.log("isActive=", isActive);
    })

return(
    <>
    <div>
      
      <nav class={isActive?'filterBar active':'filterBar inactive'}>
        
      <Container className="filterContainer">
        <Form className="filterForm">
        
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
          <Col className="col-Filter">
            <Dropdown className="dropdownFilter">
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

          <Col  className="col-Filter">
            <Dropdown className="dropdownFilter">
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
          <Col className="col-Filter">
          <input type="range" class="slider" min="0" max="10000" onChange={(e)=>{setChoosePrice(e.target.value)}} />
          </Col>
        </Row>

        <Row>
          <Col className="col-pricingLabelTitle">
            <Form.Label className="preisLabel">
              Preis €:
            </Form.Label>
          </Col>

          <Col className="col-pricingLabelPrice">
            <Form.Label className="preisLabel">
              {choosePrice}
            </Form.Label>
          </Col>
        </Row>      
      </Form.Group>

          <Row>
            <Col className="col-Filter">
              <Button className="button logout-btn login-btn" variant="secondary" size="sm" onClick={(e)=>{toggleFilter(e)}} >
                      Abbruch
              </Button>
            </Col>

            <Col className="col-Filter">
              <Button className="button logout-btn login-btn ok" variant="success" size="sm" >
                      OK
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