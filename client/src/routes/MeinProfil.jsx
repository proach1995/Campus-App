import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import PostsRow from "../components/Content/PostsRow";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DataServer from "../api/DataServer";
import Dropdown from "react-bootstrap/Dropdown";
import * as AiIcons from 'react-icons/ai';








const MeinProfil = () => {

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { userid } = useParams();
  console.log("userid: " + userid);




  const getOffers = async () => {
    try {
      //console.log("getPosts wird ausgeführt");
      const resOfferings = await DataServer.get("/Home/Offerings", {jwt_token:localStorage.token})
      
      console.log("fetching from offer");
      console.log(resOfferings.data);
      setUserPosts(resOfferings.data.offeringList.offer);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    //console.log("getPosts wird ausgeführt im UseEffekt")
    getOffers();
  }, []);

useEffect(() => {
  console.log( userPosts);
}, [userPosts])




  useEffect(() => {
  const fetchUser= async () => {
    try {
      const response = await DataServer.get(`/User/${userid}`);
      console.log(response.data.userDetail.posts);

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
        <h1 className="header">Ihr Profil</h1> 

    <Dropdown className="settings">
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

        
    {user!==null && (
    <> 
      <Row className="profile">
        <Col sm={6} className=" profilSectionWrapper" >
          <Figure>
                <Figure.Image 
                  width={160}
                  height={150}
                  alt="171x180"
                  src="../pb.jpg" //{user.userimage}
                  roundedCircle
                />
                <Figure.Caption className="profilCaption">
                <p>{user.userprename}&nbsp;{user.userlastname}</p>
                </Figure.Caption>
              </Figure>
        </Col>
        <Col sm={6} className=" profilSectionWrapper"> 
          <div>
          <p><strong>Username:</strong> <br/>{user.username}</p>
          <p><strong>E-Mail:</strong> <br/>{user.useremail}</p>
          <p><strong>Geburtsdatum:</strong> <br/>{user.userbirthdate}</p>
          </div>
          

        </Col>
      
      
      </Row>
      <Row>
        <Col className="profiledescription">
        <h2 className="profilHeading">Profilbeschreibung</h2>
        <p>{user.userdescription}</p>
        </Col>
  
        
      </Row>
      <Row>
        <Col>
            <Tabs defaultActiveKey="profile" id="">
                <Tab eventKey="home" title="Meine Posts">
                 <PostsRow postElement={userPosts} /> 

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