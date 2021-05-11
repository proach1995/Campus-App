/* eslint-disable no-lone-blocks */
import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';





const PostsRow = ({dataObjects}) => {

  console.log("data");
  console.log(dataObjects);

{/* Array.from(data) comes from props.data and is an object -> has to be converted into array to use .map*/}  
return (
    
    <Container>
      <Row>
        {dataObjects.length !==0 && dataObjects.map((postInfo) => {
          
              return (
        <Col className="col-6 col-md-6 col-lg-3 card">
            <Link to={'/'}>
              <Card className="  text-center ">
                <Card.Img variant="top" src="/.490.png" />
                <Card.Body>
                  <Card.Title>{postInfo.posttitle}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      })}
      </Row>
    </Container>
    
  );
};

export default PostsRow;