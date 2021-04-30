import React, { useEffect, useState } from "react";
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


  const [post, setPost] = useState(null);

  useEffect(() =>{

    const getPosts = async ()=>{

      try{
        console.log("fetching");
        const postDetail = await DataServer.get("/Post/" + 1);
        console.log(postDetail);
        setPost(postDetail.data);
      }catch(err){
        console.log(err);
      }

    }
    getPosts();

  },[]);
  
   useEffect(() =>{
     if(post != null){
      console.log("2. Hook");
      console.log(post.postDetail.post.title);
     }

  },[post]);
  


  return (
    <Container className="routeContainer">
    
    {post!==null && (
      <>
        <Row>
            <Image src={post.postDetail.post.postImagePath} fluid/>
        </Row>
        <Row>
            <h1>{post.postDetail.post.title}</h1>
        </Row>
        <Row>
            <Col>
                <div>Preis: {post.postDetail.post.price} €</div>
                <div>Datum: {post.postDetail.post.postDate}</div>
            </Col>
            <Col>
                <div>
                  {post.postDetail.post.postId}
                </div>
            </Col>
        </Row>
        <Row>
            <div>
                <h3>Beschreibung</h3>
                <p>
                    {post.postDetail.post.postDescription}                
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