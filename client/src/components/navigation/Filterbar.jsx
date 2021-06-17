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
const Filterbar = ({toggleFilter, isActive, getFilteredOffers}) =>{

  const [title, setTitle] = useState("");
  const [postPriceType, setPostPriceType] = useState("Alle");
  const [postCategory, setPostCategory] =useState("Alle");
  const [ choosedPrice, setChoosedPrice ] = useState(1000);
  const [dateBegin, setDateBegin] =useState("");
  const [dateEnd, setDateEnd] =useState("");


    const choosePriceFunktion=(e)=>{

      if(e.target.value==0){
        setChoosedPrice("Leihbar");
        setPostPriceType("Leihen");
      }
      else{
        setChoosedPrice(e.target.value);
      }
    }

    const setPostPriceTypeFunction = async(e) =>{

      if(choosedPrice != "Leihbar"){
        setPostPriceType(e.target.name);
      }
    }

    const agreedButton =(e)=>{
      e.preventDefault();
      let jsonFile = ({ offerType:"filtered"});

      //Check ob ein Titel hinzugefügt wurde
      if(title==""){
        jsonFile = ({...jsonFile, title:"%"});
      }
      else{
        jsonFile = ({...jsonFile, title:"%"+title+"%"});
      }

      //Check auf PostPriceType
      if(postPriceType=="Alle"){
        jsonFile = ({...jsonFile, postPriceType:"%"});
      }
      else{
        jsonFile = ({...jsonFile, postPriceType:postPriceType});
      }
      
      //Check auf postType
      if(postCategory=="Alle"){
        jsonFile = ({...jsonFile, postCategory:"%"});
      }
      else{
        jsonFile = ({...jsonFile, postCategory:postCategory});
      }

      //Ausgewählter preis
      if(choosedPrice=="Leihbar"){
        jsonFile = ({...jsonFile, choosedPrice:0});
      }
      else{
        jsonFile = ({...jsonFile, choosedPrice:choosedPrice});
      }

      //Check auf Anfangsdatum
      if(dateBegin==""){
        jsonFile = ({...jsonFile, dateBegin:"2021-01-01"});
      }
      else{
        jsonFile = ({...jsonFile, dateBegin:dateBegin});
      }
      
      //Check auf Enddatum
      if(dateEnd==""){
        let time = new Date();
        jsonFile = ({...jsonFile, dateEnd:time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()});
      }
      else{
        jsonFile = ({...jsonFile, dateEnd:dateEnd});
      }
      
      getFilteredOffers(jsonFile);
      toggleFilter(e);
    }

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
                  placeholder="search Produkt Titel" onChange={(e)=>{setTitle(e.target.value)}}
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
            <Form.Label className="dropdownLabel">Handels Typ</Form.Label>
          </Col>

          <Col className="col-Filter">
            <Form.Label className="dropdownLabel">Post Typ</Form.Label>
          </Col>
        </Row>

        <Row>
        <Col className="col-Filter">
            <Dropdown className="dropdownFilter">
              <Dropdown.Toggle variant="success" size="sm">
              {postPriceType} 
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={(e)=>{setPostPriceTypeFunction(e)}}>
              <Dropdown.Item name='Alle'>Alle</Dropdown.Item>
                <Dropdown.Item name='Festpreis'>Festpreis</Dropdown.Item>
                <Dropdown.Item name ='Verhandelbar'>Verhandelbar</Dropdown.Item>
                <Dropdown.Item name='Leihen'>Leihen</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </Col>

          <Col  className="col-Filter">
            <Dropdown className="dropdownFilter">
              <Dropdown.Toggle variant="success" size="sm">
              {postCategory} 
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={(e)=>{setPostCategory(e.target.name)}}>
              <Dropdown.Item name='Alle'>Alle</Dropdown.Item>
                <Dropdown.Item name='Angebot'>Angebot</Dropdown.Item>
                <Dropdown.Item name= 'Gesucht'>Gesucht</Dropdown.Item>
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
          <input type="range" class="slider" min="0" max="10000" onChange={(e)=>{choosePriceFunktion(e)}} />
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
              {choosedPrice}
            </Form.Label>
          </Col>
        </Row>      
      </Form.Group>

      {/*Datum*/}
      <Form.Group className="mb-3">
      <Row>
        <Col className="col-Filter">
          <Form.Label  className="datumLabel">Postdatum</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col className="col-pricingLabelTitle">{/*Name verwirrend, aber macht flex-start*/ }
          <Form.Label  className="preisLabel">von</Form.Label>
        </Col>

        <Col className="col-pricingLabelTitle">{/*Name verwirrend, aber macht flex-start*/ }
          <Form.Label  className="preisLabel">bis</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col className="col-pricingLabelTitle">
            <Form.Control
                required
                type="date"
                size="sm"
                onChange={(e)=>{setDateBegin(e.target.value)}}
                />
        </Col>

        <Col className="col-pricingLabelTitle">
            <Form.Control
                required
                type="date"
                size="sm"
                onChange={(e)=>{setDateEnd(e.target.value)}}
                />
        </Col>
      </Row> 
    </Form.Group>
  
    <br></br>
          {/*Buttons Abbruch, OK*/}
          <Row>
            <Col className="col-Filter">
              <Button className="button logout-btn login-btn" variant="secondary" size="sm" onClick={(e)=>{toggleFilter(e)}} >
                      Abbruch
              </Button>
            </Col>

            <Col className="col-Filter">
              <Button className="button logout-btn login-btn ok"
                      variant="success"
                      size="sm"
                      onClick={(e)=>{agreedButton(e)}} >
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