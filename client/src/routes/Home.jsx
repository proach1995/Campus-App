import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './route.css';
import PostsRow from "../components/Content/PostsRow";





const Home = () => {

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

const data = [
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
},
{
  title: 'Ersti',
  imagesrc: './490.jpg',
  url: '/meineposts'
},
{
  title: 'Ersti',
  imagesrc: './490.jpg',
  url: '/meineposts'
},

];


  


  return (
    <div>
    <Container className="routeContainer">
      <Row>
        <Col>
        <h1>Willkommen zur Campusapp der Hochschule Kaiserslautern</h1>
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
      
      <PostsRow data={data}/>
      <div className="buttonBackground " >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      <div className="buttonBackground" >
        <h2>Neues im Marktplatz</h2>
      </div>
      {/*****           CARDS Events         **********/}
      
     <PostsRow data={data}/>
     <div className="buttonBackground" >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      </Container>

  </div>
    
  );
};

export default Home;
