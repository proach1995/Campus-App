import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';






const EventsRecent = () => {
  return (
    <Container>

      <Row>
      <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className="  text-center ">
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher mieten</Card.Title>
          </Card.Body>
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher mieten</Card.Title>
          </Card.Body> 
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher mieten</Card.Title>
          </Card.Body>   
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./490.jpg" />
          <Card.Body>
            <Card.Title>Rasenmäher mieten</Card.Title>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsRecent;