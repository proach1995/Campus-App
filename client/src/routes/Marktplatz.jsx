import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";




const Marktplatz = () => {

  const [posts, setPost] = useState(null);

  useEffect(() =>{

    const getPosts = async ()=>{

      try{
        console.log("fetching");
        const latestPosts = await DataServer.get("/Home");
        //console.log(latestPosts); Klar das es leer ist
        setPost(latestPosts.data);
      }catch(err){
        console.log(err);
      }

    }
    getPosts();

  },[]);
  
   useEffect(() =>{
     if(posts != null){
      console.log("2. Hook");
      console.log(posts.postList.post.length);
     }

  },[posts]);




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
            <PostsRow dataObjects={posts.postList}/>  
            </>
            )}
    </Container>
  );
};

export default Marktplatz;