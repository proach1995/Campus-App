import React, { useState, useEffect, useContext } from "react";
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
import { AppContext } from "../context/AppContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'




const MeinProfil = () => {

  const {logged, setLogged} = useContext(AppContext);
  const {user, setUser} = useContext(AppContext);

  const [author, setAuthor] = useState(null);
  let [userIsAuthor, setUserIsAuthor] = useState(false);

  const [updateUser, setUpdateUser] = useState(null);


  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);
  const { userid } = useParams();
  console.log("userid: " + userid);


  useEffect(() => {
  const fetchAuthor= async () => {
    try {
      const response = await DataServer.get(`/User/${userid}`);
      console.log(response.data.userDetail);
      setAuthor(response.data.userDetail.user);
      setAuthorPosts(response.data.userDetail.posts);
    } catch (err) {
      console.log(err);
      console.log("Fetchuser hat nicht funktioniert");
    }
  };

  fetchAuthor();
}, []);



useEffect(() => {
  const IsUserCheck = async () => {
    console.log(user.userid + " = " + userid);
    if( user.userid === userid){
      return setUserIsAuthor(true);
    } else {
      return setUserIsAuthor(false);
    }
  }
  IsUserCheck();
  console.log(userIsAuthor);
}, [authorPosts])


useEffect(() => {
  console.log( authorPosts);
  console.log(userIsAuthor);
}, [author])


const deleteHandler = async (e, userId)=>{
  e.stopPropagation();
  const deleteUser= async () => {
    try {
      const deletedUser = await DataServer.delete(`/User/${userid}`, {jwt_token:localStorage.token});
      localStorage.removeItem("token");
      setLogged(false);
      console.log("User wurde erfolgreich gelöscht");
    } catch (err) {
      console.log(err);
    }
  };
  deleteUser();
}


const updateUserHandler = async (e, userId)=>{
  e.stopPropagation();
  setUpdateUser(true);
  setUserIsAuthor(false);
}

const submitUpdateHandler = async (e, userId)=>{
  e.stopPropagation();
  setUpdateUser(false);
  setUserIsAuthor(true);

}



  return (
    <>

      {/* Profil des eingeloggten Nutzers anzeigen */}

   {userIsAuthor &&
    <>
    <Container className="routeContainer">
        <h1 className="header">Ihr Profil</h1> 

    <Dropdown className="settings">
        <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
        <AiIcons.AiOutlineSetting className="icon" />
        </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item onClick={(e)=>{updateUserHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Item href="/">Passwort zurücksetzen</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete" href="/">Profil löschen</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>
        
    {author!==null && ( 
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
                <p>{author.userprename}&nbsp;{author.userlastname}</p>
                </Figure.Caption>
              </Figure>
        </Col>
        <Col sm={6} className=" profilSectionWrapper"> 
          <div>
          <p><strong>Username:</strong> <br/>{author.username}</p>
          <p><strong>E-Mail:</strong> <br/>{author.useremail}</p>
          <p><strong>Geburtsdatum:</strong> <br/>{user.userbirthdate}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="profiledescription">
        <h2 className="profilHeading">Profilbeschreibung</h2>
        <p>{author.userdescription}</p>
        </Col>  
      </Row>
      <Row>
        <Col>
            <Tabs defaultActiveKey="profile" id="">
                <Tab eventKey="home" title="Meine Posts">
                 <PostsRow postElement={authorPosts} /> 
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

  </>
  }
  
    {/* Profil des eingeloggten Nutzers updaten */}


    {updateUser && 
    <>
    <Container className="routeContainer">
        <h1 className="header">Ihr Profil bearbeiten</h1> 

        
    {author!==null && ( 
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
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input isValid />
                    <Form.File.Label data-browse="Button text">
                      Custom file input
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                  </Form.File>
                </Figure.Caption>
              </Figure>
        </Col>
        <Col sm={6} className=" profilSectionWrapper"> 
          <div>
            <Form.Group >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder={author.username} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group >
              <Form.Label>E-Mail</Form.Label>
              <Form.Control type="e-mail" placeholder={author.useremail} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group >
              <Form.Label>Geburtsdatum</Form.Label>
              <Form.Control
                required
                type="date"
                name="userbirthdate"
                placeholder ={user.userbirthdate}
                value={user.userbirthdate}
                />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Geburtsdatum eingeben
            </Form.Control.Feedback>
            </Form.Group>
          <p>{author.userprename}&nbsp;{author.userlastname}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="profiledescription">
        <h2 className="profilHeading">Profilbeschreibung</h2>
        <p>{author.userdescription}</p>
        </Col>  
      </Row>
      <Button onClick={(e)=>{submitUpdateHandler(e)}}>
        Speichern

      </Button>
      
    </>
    )}   
    </Container>

  </>
  }




  {/* Profil eines fremden Nutzers anzeigen */}
  {!userIsAuthor && !updateUser &&
    <>
    <Container className="routeContainer">
        
    {author!==null && (
    <> 
            <h1 className="header">Das Profil von {author.username}</h1> 

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
                <p>{author.userprename}&nbsp;{author.userlastname}</p>
                </Figure.Caption>
              </Figure>
        </Col>
        <Col sm={6} className=" profilSectionWrapper"> 
          <Form>
          <p><strong>Username:</strong> <br/>{author.username}</p>
          <p><strong>E-Mail:</strong> <br/>{author.useremail}</p>
          <p><strong>Geburtsdatum:</strong> <br/>  {author.userbirthdate}</p>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="profiledescription">
        <h2 className="profilHeading">Profilbeschreibung</h2>
        <p>{author.userdescription}</p>
        </Col>  
      </Row>
      <Row>
        <Col>
            <Tabs defaultActiveKey="profile" id="">
                <Tab eventKey="home" title="Alle Posts">
                 <PostsRow postElement={authorPosts} /> 
                </Tab>
                <Tab eventKey="profile" title="Bewertungen">
                    <div>Leider hat sie noch kein Nutzer bewertet</div>
                </Tab>      
            </Tabs>  
        </Col>
      </Row> 
  </>
 )}   
    </Container>
    </>
  
}
</>
   
    
  )
}

export default MeinProfil;