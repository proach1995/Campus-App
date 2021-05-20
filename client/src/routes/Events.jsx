import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";




const Events = () => {

  const [events, setEvents] = useState([]);

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
    getEvents();
  }, []);

  



  return (
    <Container className="routeContainer">
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1>Willkommen zum Marktplatz der Hochschule Kaiserslautern</h1>
        <p>Hier findest du alle spannenden Events im Umfeld der HSKL. Von Studis für Studis</p>
        
        <Dropdown >
              <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
              Filter
              </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Neueste Events</Dropdown.Item>
                  
                </Dropdown.Menu>
            </Dropdown>
        
          <div className="buttonBackground" >
           <h2>Alle Events</h2>
          </div>
            {events!==null && (
              <>
            <PostsRow postElement={events}/>  
            </>
            )}
    </Container>
  );
};

export default Events;