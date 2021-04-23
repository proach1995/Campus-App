import React from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import PostsRow from "../components/Content/PostsRow";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/esm/Image";
;






const Post = () => {


    const data = [
        {
          title: 'Ersti',
          imagesrc: './490.jpg',
          url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      {
        title: 'Ersti',
        imagesrc: './490.jpg',
        url: '/meineposts'
      },
      
      ];
  


  return (
    <Container className="routeContainer">
    
        <Row>
            <Image src="pb.jpg" fluid/>
        </Row>
        <Row>
            <h1>Title</h1>
        </Row>
        <Row>
            <Col>
                <div>Preis: 25€</div>
                <div>Datum: 14. Apr.</div>
            </Col>
            <Col>
                <div>
                    ID:08908907807
                </div>
            </Col>
        </Row>
        <Row>
            <div>
                <h3>Beschreibung</h3>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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
 
       
    </Container>
  );
};

export default Post;