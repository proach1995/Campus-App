import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';



{/* https://stackoverflow.com/questions/58450315/react-js-cards-using-for-loop */}


const MarktplatzRecent = () => {

  {/*
  componentDidMount() {
    fetch('http://localhost:8080/UIServices/rest/dataService/getUserDetails?userName=SIVASO')
      .then((response) => {
          return response.json()
      }).then((json) => {
          this.setState({data: json})
      })
}
*/}


  return (
    
    <Container>
      <Row>
      <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className="  text-center ">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body> 
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>   
        </Card>
        </Col>
        <Col className="col-6 col-md-6 col-lg-3 card">
        <Card className=" text-center ">
          <Card.Img variant="top" src="./party.jpg" />
          <Card.Body>
            <Card.Title>Erstiparty Heute</Card.Title>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MarktplatzRecent;