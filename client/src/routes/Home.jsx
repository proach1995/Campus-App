import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './route.css';
import MarktplatzRecent from "./../components/Content/MarktplatzRecent";
import EventsRecent from "./../components/Content/EventsRecent";





const Home = () => {
  return (
    <div>
    <Container className="routeContainer">
      <Row>
        <Col>
        <h1>Willkommen zum Marktplatz der Hochschule Kaiserslautern</h1>
        <p>Willkommen in unserer App. <br/>
            Brauchst du Bücher, Konsolen oder willst wissen welche Events unser Camput bietet? Dann schau mal rein! :) 
        </p>
        </Col>
      </Row>
      <div className="buttonBackground" >
        <h2>Die neuesten Events</h2>
      </div>
            {/*****           SLIDER         **********/}

      

      {/*****           CARDS MARKTPLATZ         **********/}
      
      <MarktplatzRecent/>
      <div className="buttonBackground " >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      <div className="buttonBackground" >
        <h2>Neues im Marktplatz</h2>
      </div>
      {/*****           CARDS Events         **********/}
      
     <EventsRecent/>
     <div className="buttonBackground" >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      </Container>

  </div>
    
  );
};

export default Home;
