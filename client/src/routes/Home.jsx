import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import './route.css';



const Home = () => {
  return (
    <Container className="routeContainer">
      <Row>
        <Col>
        <h1>Willkommen zum Marktplatz der Hochschule Kaiserslautern</h1>
        <p>Willkommen in unserer App. <br/>
            Brauchst du Bücher, Konsolen oder willst wissen welche Events unser Camput bietet? Dann schau mal rein! :) 
        </p>
        </Col>
      </Row>

            {/*****           SLIDER         **********/}

      <Row>
      <Carousel>
        <Carousel.Item className="carouselItem">
          <img
            className="d-block w-100 "
            src="./pb.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Ihre Vorteile auf einen Blick</h3>
            <p>Freunde finden. Regional handeln. Zusammenhalt stärken.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./face.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Ihr Nachteile auf einen Blick</h3>
            <p>Keine.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./trump.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Warum die Campusapp der heiße Scheiß ist.</h3>
            <p>Es gibt mindestens 1000 Gründe.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      </Row>

      {/*****           CARDS MARKTPLATZ         **********/}
      <Row>
      <Col>
        <Card className=" Card text-center col-sm-6">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Gepostet vor 3 Minuten</small>
          </Card.Footer>
        </Card>
        </Col>
        <Col>
        <Card className="Card text-center col-sm-6">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Gepostet vor 3 Minuten</small>
          </Card.Footer>
        </Card>
        </Col>
        <Col>
        <Card className="Card text-center col-sm-6">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Gepostet vor 3 Minuten</small>
          </Card.Footer>
        </Card>
        </Col>
      </Row>

      <div className="buttonBackground" >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      {/*****           CARDS Events         **********/}
      <Row>
      <CardDeck>
        <Card >
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher gesucht</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher gesucht</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher gesucht</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
        <div className="buttonBackground" >
          <Button href="/marktplatz" className="button">Zum Marktplatz</Button>
        </div>
      
      </Row>
    </Container>
     
      
    
  );
};

export default Home;
