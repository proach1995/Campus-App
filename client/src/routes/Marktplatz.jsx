import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";




const Marktplatz = () => {

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

  




  return (
    <Container className="routeContainer">
      
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1> Marktplatz </h1>
  
  
            <Dropdown >
              <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
              Kategorien
              </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Bücher</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Veranstaltungen</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">Etwas Posten</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
       
            {posts!==null && (
              <>
            <PostsRow postElement={posts}/>  
            </>
            )}
    </Container>
  );
};

export default Marktplatz;