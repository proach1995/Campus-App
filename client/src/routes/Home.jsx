import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './route.css';
import PostsRow from "../components/Content/PostsRow";
import DataServer from "../api/DataServer";






const Home = ({setAuth},{isAuthenticated}) => {

  //In den States werden die Angebote und Events gespeichert
  const [offerings, setOfferings] = useState([]);
  const [events, setEvents] = useState([]);

  const getOffers = async () => {
    try {
      //console.log("getPosts wird ausgeführt");
      const resOfferings = await DataServer.get("/Home/Offerings", {jwt_token:localStorage.token})
      
      //console.log("fetching from offer");
      //console.log(resOfferings.data);
      setOfferings(resOfferings.data.offeringList.offer);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEvents = async () => {
    try {
      //console.log("getPosts wird ausgeführt");
      const resEvents = await DataServer.get("/Home/Events", {jwt_token:localStorage.token})
      console.log("fetching from events");
      console.log(resEvents.data);
      setEvents(resEvents.data.eventList.event);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    //console.log("getPosts wird ausgeführt im UseEffekt")
    getOffers();
    getEvents();
  }, []);


 
  
  return (
    <div>
    
    <Container className="routeContainer">
   
    
    
      <>
      <Row>
        <Col>
        <h1>Willkommen zur Campusapp der Hochschule Kaiserslautern</h1>
        <p>Willkommen in unserer App. <br/>
            Brauchst du Bücher, Konsolen oder willst wissen welche Events unser Camput bietet? Dann schau mal rein! :) 
        </p>
        </Col>
      </Row>
      <div className="buttonBackground" >
        <h2>Die neuesten Angebote</h2>
      </div>



      

      {/*****           CARDS MARKTPLATZ         **********/}
      
      <PostsRow postElement={offerings}/>  
     <div className="buttonBackground " >
        <Button href="/marktplatz" className="button">Zum Marktplatz</Button>
      </div>
      <div className="buttonBackground" >
        <h2>Neue Events</h2>
      </div>
      {/*****           CARDS Events         ***********/}
      
     { <PostsRow postElement={events}/>  }
     <div className="buttonBackground" >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
       </>
    
      </Container>
  
  </div>
  
    
  );
};

export default Home;
