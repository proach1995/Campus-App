import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import PostsRow from "../components/Content/PostsRow";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/esm/Image";
import DataServer from "../api/DataServer";








const Post = () => {

  const { postid } = useParams();
  const [post, setPost] = useState(null);
  console.log("postid: " + postid);



  useEffect(() => {
    const fetchPost= async () => {
      try {
        const response = await DataServer.get(`/Post/${postid}`);
        console.log(response.data.postDetail.post);

        setPost(response.data.postDetail.post);
      } catch (err) {
        console.log(err);
        console.log("FetchPost hat nicht funktioniert");
      }
    };

    fetchPost();
  }, []);



console.log(post);





  return (
    <Container className="routeContainer">
    {post!==null && (
    <> 


      <h1 className="postHeader">{post.posttitle}</h1> 

      <Row className="">
        <Col  className="pictureSection " >
          <Image src="../pb.jpg" width={160} height={150} />    
        </Col>
      </Row>
        <h3 className="profilHeading">Details</h3>
        
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
          </Row>
          
     

      <Row>
        <Col className="">
        <p></p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="profilHeading">Beschreibung</h3>
              <p>
                {post.postdescription}
              </p>
        </Col>
      </Row>

      <h3 className="profilHeading">Anbieter</h3>
      <Row>
        <Col className="userSection">
          <Link to="/">
          <Figure.Image 
            width={50}
            height={40}
            alt="171x180"
            src="../pb.jpg" //{user.userimage}
            roundedCircle
          />
          <p className="username">CoolerTyp95</p>
          </Link>
        </Col>
      </Row>
      <Button  className="button login-btn" variant="primary" >
          Kontaktieren
        </Button>
        </>
 )} 
    </Container>
  );
};

export default Post;