import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/esm/Image";
import DataServer from "../api/DataServer";
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from "react-bootstrap/Dropdown";
import * as AiIcons from 'react-icons/ai';
import './route.css';








const Post = () => {

  const { postid } = useParams();
  const [post, setPost] = useState([]);
  console.log("postid: " + postid);



  
    const fetchPost= async () => {
      try {
        const response = await DataServer.get("/Post/${postid}", {jwt_token:localStorage.token});
        console.log(response.data.postDetail.post);

        setPost(response.data.postDetail.post);
      } catch (err) {
        console.log(err);
        console.log("FetchPost hat nicht funktioniert");
      }
    };

    useEffect(() => {
      //console.log("getPosts wird ausgeführt im UseEffekt")
      fetchPost();
    }, []);

   



console.log(post);
 




  return (
    <Container className="routeContainer">
    {post!==null && (
    <> 


      <h3 className="postHeader">{post.posttitle}</h3> 

      <Row className="">
          
        <Col  className="pictureSection imageCarouse" >
          
          <Carousel interval={null} slides={true}>
            <Carousel.Item>
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="First slide"
                
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
             
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="Second slide"
              />

            
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block imageCarousel"
                src="../party.jpg"
                alt="Third slide"
                
              />
              
            </Carousel.Item>
    </Carousel>   
        </Col>
      </Row>
        <h3 className="contentHeading">Details</h3>
        
          <Row className="contentSection "> 
            <Col>
              <p><strong>Preis:</strong></p>
              <p><strong>Kategorie:</strong></p>
              <p><strong>Datum:</strong></p>
              <p><strong>Typ:</strong></p>
            </Col>
            <Col>
              <p>{post.postprice}€</p>
              <p>{post.postcategory}</p>
              <p>{post.postdate}</p>
              <p>{post.posttype}</p>
            </Col>
            <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/">Daten bearbeiten</Dropdown.Item>
                    <Dropdown.Item href="/">Passwort zurücksetzen</Dropdown.Item>
                    <Dropdown.Divider className="delete" />
                    <Dropdown.Item className="delete" href="/">Profil löschen</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    
            </Col>
          </Row>
          
     

          <h3 className="contentHeading">Beschreibung</h3>
      <Row className="contentSection ">
        <Col>
          
              <p>
                {post.postdescription}
              </p>
        </Col>
      </Row>
  
      <h3 className="contentHeading">Anbieter</h3>
      <Row className="contentcontact">
        <Row>
        <Col className="userSection">
          <Link to={`/user/${post.userid}`}>
          <Figure.Image 
            width={50}
            height={40}
            alt="171x180"
            src="../pb.jpg" //{user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        <Row className="contentbtn">
        <Button  className="button login-btn " variant="primary" >
                        Kontaktieren
              </Button>
        </Row>
        
      </Row>
      
            
                
          
       
        </>
 )} 
    </Container>
  );
};

export default Post;