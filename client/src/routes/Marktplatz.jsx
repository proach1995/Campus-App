import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";




const Marktplatz = () => {

  const [offerings, setOfferings] = useState([]);

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

  useEffect(() => {
    //console.log("getPosts wird ausgeführt im UseEffekt")
    getOffers();
  }, []);
  {/*
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await DataServer.get("/Post/Marktplatz");
        console.log(response + "in fetch posts marktplatz");

        setPosts(response.data.postlist.post);
      } catch (err) {
        console.log(err);
        console.log("FetchPosts in Marktplatz hat nicht funktioniert");
      }
    };

    fetchPosts();
  }, []);



console.log(posts);

*/}

  




  return (
    <Container className="routeContainer">
      
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1> Marktplatz </h1>
        <p>Hier finden sie alle Posts aus den Kategorien An- und Verkauf, Verleihen sowie Verschenken am Campus Zweibrücken.</p>
  
            <Dropdown >
              <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
              Filter
              </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Angebote</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Gesuche</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Nach Preis</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Nach Datum</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
       

        <div className="buttonBackground" >
          <h2>Alle Posts</h2>
        </div>
            {offerings !==null && (
              <>
            <PostsRow postElement={offerings}/>  
            </>
            )}
    </Container>
  );
};

export default Marktplatz;