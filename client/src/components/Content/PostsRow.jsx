import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom'







const PostsRow = ({data}) => {
  console.log(data + "is in postsrow")

  

{/* Array.from(data) comes from props.data and is an object -> has to be converted into array to use .map*/}  
return (
    
    <Container>
      <Row>
        {data.map((data) => {
          console.log(data + "is mount")
              return (
        <Col className="col-6 col-md-6 col-lg-3 card">
            <Link to={data.url}>
              <Card className="  text-center ">
                <Card.Img variant="top" src={data.imagesrc} />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
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