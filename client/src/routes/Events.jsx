import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";
import Button from 'react-bootstrap/Button';
import Filterbar from "../components/navigation/Filterbar";




const Events = () => {

  const [events, setEvents] = useState([]);

  const [isActive, setIsActive] = useState(false);

  const toggleFilter=(e)=>{
    e.preventDefault();
    console.log("Filter: ", isActive);
    setIsActive(prevState => !prevState);
  }

  const getEvents = async () => {
    try {
      console.log("getPosts wird ausgeführt");
      const resEvents = await DataServer.post("/Events/", {jwt_token:localStorage.token,
                                                                    offerType:"latest"});
      console.log("fetching from events");
      console.log(resEvents.data);
      setEvents(resEvents.data.eventList.event);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getFilteredOffers = async(jsonFile) =>{
    jsonFile = ({...jsonFile,jwt_token:localStorage.token });
    console.log(jsonFile);
    const resEvents = await DataServer.post("/Events", jsonFile)
    console.log("filtered", resEvents);
    setEvents(resEvents.data.eventList.event);

  }

  useEffect(() => {
    console.log("getPosts wird ausgeführt im UseEffekt")
    getEvents();
  }, []);

  



  return (
    <Container className="routeContainer">
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1>Willkommen zum Marktplatz der Hochschule Kaiserslautern</h1>
        <p>Hier findest du alle spannenden Events im Umfeld der HSKL. Von Studis für Studis</p>
        
        <Button variant="success" onClick={(e)=>{toggleFilter(e)}}>Filter</Button>
          
          {isActive === true &&
          <Filterbar toggleFilter={toggleFilter} isActive={isActive}
                      getFilteredOffers={getFilteredOffers}/>
          }
        
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