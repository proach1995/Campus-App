import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
      const resOfferings = await DataServer.post("/Home/Offerings", {jwt_token:localStorage.token})
      
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
      const resEvents = await DataServer.post("/Home/Events", {jwt_token:localStorage.token})
      //console.log("fetching from events");
      //console.log(resEvents.data);
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

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      console.log("Sicher ausgeloggt");

    } catch (err) {
      console.error(err.message);
    }
  };

 
  
  return (
    <div>
    
    <Container className="routeContainer">
    <Button  onClick={e => logout(e)} href="/" className="button logout-btn login-btn" variant="secondary" >
                      Logout
            </Button>
    
    
    
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
        <h2>Die neuesten Events</h2>
      </div>



      

      {/*****           CARDS MARKTPLATZ         **********/}
      
      <PostsRow postElement={offerings}/>  
     <div className="buttonBackground " >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      <div className="buttonBackground" >
        <h2>Neues im Marktplatz</h2>
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
