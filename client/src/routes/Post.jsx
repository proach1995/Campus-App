import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <Row>
            <Image src="./490.jpg" fluid/>
        </Row>
        <Row>
            <h1>{post.posttitle}</h1>
        </Row>
        <Row>
            <Col>
                <div>Preis:  {post.postprice}€</div>
                <div>Datum: {post.postdate}</div>
            </Col>
            <Col>
                <div>
                  Postid: {post.postid}
                </div>
            </Col>
        </Row>
        <Row>
            <div>
                <h3>Beschreibung</h3>
                <p>
                  {post.postdescription}
                </p>
            </div>
        </Row>
        <h3>Anbieter</h3> 

        <Row>
            <Figure className="">

            <Col>
                <Figure.Image className=""
                    href="/meinprofil"
                    width={50}
                    height={50}
                    alt="171x180"
                    src="./pb.jpg"
                    roundedCircle
                />
            </Col>
            <Col>
                <Figure.Caption className="">
                    Nutzername
                </Figure.Caption>
            </Col>
              
            </Figure>
        </Row>
        </>
 )} 
    </Container>
  );
};

export default Post;