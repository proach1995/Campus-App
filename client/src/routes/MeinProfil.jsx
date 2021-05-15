import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import PostsRow from "../components/Content/PostsRow";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import DataServer from "../api/DataServer";

;






const MeinProfil = () => {

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const { userid } = useParams();
  console.log("postid: " + userid);


  useEffect(() => {
  const fetchUser= async () => {
    try {
      const response = await DataServer.get(`/User/${userid}`);
      console.log(response.data.userDetail);

      setUser(response.data.userDetail.user);
      setUserPosts(response.data.userDetail.posts);
    } catch (err) {
      console.log(err);
      console.log("Fetchuser hat nicht funktioniert");
    }
  };

  fetchUser();
}, []);


  return (
    <Container className="routeContainer">
        <h1>Das ist ihr Profil</h1>
        
    {user!==null && (
    <> 
      <Row >
        <Col className="profilSectionWrapper">
          <Figure>
                <Figure.Image 
                  href="/meinprofil"
                  width={160}
                  height={150}
                  alt="171x180"
                  src="../pb.jpg"
                  roundedCircle
                />
                <Figure.Caption className="profilCaption">
                  
                  Vorname Name Mail Adresse.
                </Figure.Caption>
              </Figure>
        </Col>
        <Col className="profilSectionWrapper"> 
            <div> 
              <p>{user.userid}</p>
              <p>{user.username}</p>
              <p>{user.userprename}</p>
              <p>{user.userlastname}</p>
              <p>{user.useremail}</p>
              <p>{user.userbirthdate}</p>
              <p>{user.userdescription}</p>
              <p>{user.userimage}</p>

            </div>
        </Col>
        <Col className="profilSectionWrapper">
            <Button className="button editData">Daten bearbeiten</Button>

        </Col>
      </Row>
      <Row>
        <Col>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Meine Posts">
               {/* <PostsRow data={userPosts.posts} /> */}

                </Tab>
                <Tab eventKey="profile" title="Bewertungen">
                    <div>Hier könnten ihre Bewertungen stehen</div>
                </Tab>
                
            </Tabs>



          
        </Col>
      </Row>
        
        
  </>
 )}   
    </Container>
  );
};

export default MeinProfil;