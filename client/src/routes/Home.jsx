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






  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3001/Database/Marktplatz/home/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.username);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  useEffect(() => {
    getProfile();
  }, []);

  
  return (
    <div>
    
    <Container className="routeContainer">
    <Button  onClick={e => logout(e)} href="/home" className="button logout-btn login-btn" variant="secondary" >
                      Logout
            </Button>
    
    
    {posts!==null && (
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
            {/*****           SLIDER         *********/}



      

      {/*****           CARDS MARKTPLATZ         **********/}
      
     <PostsRow dataObjects={posts.postList}/>
      <div className="buttonBackground " >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
      <div className="buttonBackground" >
        <h2>Neues im Marktplatz</h2>
      </div>
      {/*****           CARDS Events         **********/}
      
      <PostsRow dataObjects={posts.postList}/>  
     <div className="buttonBackground" >
        <Button href="/events" className="button">Zu den Events</Button>
      </div>
       </>
    )}
    
      </Container>
  
  </div>
  
    
  );
};

export default Home;
