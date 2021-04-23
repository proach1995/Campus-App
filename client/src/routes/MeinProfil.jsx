import React from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import PostsRow from "../components/Content/PostsRow";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
;






const MeinProfil = () => {


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
        <h1>Das ist ihr Profil</h1>
      <Row >
        <Col className="profilSectionWrapper">
          <Figure>
                <Figure.Image 
                  href="/meinprofil"
                  width={160}
                  height={150}
                  alt="171x180"
                  src="./pb.jpg"
                  roundedCircle
                />
                <Figure.Caption className="profilCaption">
                  Vorname Name Mail Adresse.
                </Figure.Caption>
              </Figure>
        </Col>
        <Col className="profilSectionWrapper"> 
            <div> Insert user data forms here...</div>
        </Col>
        <Col className="profilSectionWrapper">
            <Button className="button editData">Daten bearbeiten</Button>

        </Col>
      </Row>
      <Row>
        <Col>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Meine Posts">
                 <PostsRow data={data}/>
                </Tab>
                <Tab eventKey="profile" title="Bewertungen">
                    <div>Hier könnten ihre Bewertungen stehen</div>
                </Tab>
                
            </Tabs>



          
        </Col>
      </Row>
        
        
       
    </Container>
  );
};

export default MeinProfil;