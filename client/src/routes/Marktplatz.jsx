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
        const response = await DataServer.get("/Post/allposts");
        console.log(response.data);

        setPosts(response.data.postDetail.post);
      } catch (err) {
        console.log(err);
        console.log("FetchPosts hat nicht funktioniert");
      }
    };

    fetchPosts();
  }, []);



console.log(posts);

  
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