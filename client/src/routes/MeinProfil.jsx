import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Cookies from 'js-cookie';





const MeinProfil = () => {

  const { userid } = useParams();

  const {logged, setLogged} = useContext(AppContext);
  const {user, setUser} = useContext(AppContext);

  //Seite vom User oder Seite vom author
  const [author, setAuthor] = useState(null);
  let [userIsAuthor, setUserIsAuthor] = useState(false);
  
  //Userposts bzw. femde Posts
  const [userPosts, setUserPosts] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);

  //Update
  const [updateUser, setUpdateUser] = useState(false);


  const [validated, setValidated] = useState(false);

  //Seite wechseln
  let history = useHistory();

  const [inputs, setInputs] = useState({
    useremail: user.useremail,
    userpassword: user.userpassword,
    username: user.username,
    userlastname: user.userlastname,
    userprename: user.userprename,
    userdescription: user.userdescription,
    userbirthdate: user.userbirthdate.substring(0,10),
    userimage:"",
  
  });
  /* Werte werden an einzelne Objekte übergeben*/
  const { useremail, userpassword, username, userlastname, userprename, userdescription, userbirthdate, userimage } = inputs;



/**********  GET *****************/
  //Aus Zeitgründen wird es vielleicht dumm aber sicher programmiert
  const fetchUserPost= async () => {
    try {
      const response = await DataServer.get(`/User/${userid}`);
      setUserPosts(response.data.userDetail.posts);

    } catch (err) {
      console.log(err);
      console.log("Fetchuser hat nicht funktioniert");
    }
  }

  const fetchAuthor= async () => {
    try {
      const response = await DataServer.get(`/User/${userid}`);
      console.log("Userfetch");
      console.log(response.data.userDetail.user);
      setAuthor(response.data.userDetail.user);
      
      setAuthorPosts(response.data.userDetail.posts);
      
      //Wozu?? wenn es der author ist und in author gespeichert wird
      setInputs({ 
      useremail: response.data.userDetail.user.useremail,
      userpassword: response.data.userDetail.user.userpassword,
      username: response.data.userDetail.user.username,
      userlastname: response.data.userDetail.user.userlastname,
      userprename: response.data.userDetail.user.userprename,
      userdescription: response.data.userDetail.user.userdescription,
      userbirthdate: response.data.userDetail.user.userbirthdate.substring(0,10),
      userimage: response.data.userDetail.user.userimage,
     });

    } catch (err) {
      console.log(err);
      console.log("Fetchuser hat nicht funktioniert");
    }
  }
    useEffect(() => {

  if(user.userid != userid && user.userid!=""){
  fetchAuthor();
  setUserIsAuthor(false);
  }
  else{
    setUserIsAuthor(true);
    fetchUserPost();
  }
  
}, []);

//Wechsel vom fremden Profil zum eingeloggten Profil ermöglichen
useEffect(()=>{
  if(user.userid != userid && user.userid!=""){
    fetchAuthor();
    setUserIsAuthor(false);
    }
    else{
      setUserIsAuthor(true);
      fetchUserPost();
    }
},[userid])


/**********  DELETE *****************/


const deleteHandler = async (e)=>{
  e.stopPropagation();
  const deleteUser= async () => {
    try {
      console.log("delete")
      //in Axios muss der delete Request wie folgt geschrieben werden:
      //axios.delete("URL",{data:{daten die gegeben werden}});
      const deletedUser = await DataServer.delete(`/User/${user.userid}`,{data:{jwt_token:localStorage.token,
                                                                                "userimage":user.userimage}});
      localStorage.removeItem("token");
      setLogged(false);
      Cookies.remove("userId");
      console.log("User wurde erfolgreich gelöscht");
      history.push("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  deleteUser();
  
}
/**********  UPDATE *****************/
/* Spricht in der e.target Funktion erst den Namen an und übergibt dann den Wert, d.h. Name muss identisch sein
mit dem Namen im Input field*/
const onChange = e => {
  e.preventDefault();
  setInputs({ ...inputs, [e.target.name]: e.target.value });
  console.log("onChange", inputs);

}

function validEmail(useremail) {
  return /^[a-zA-Z]{4}\d{4}@stud.hs-kl.de/.test(useremail);
}


const updateUserHandler = async (e, userId)=>{ // Wird im Dropdown der default eingeloggt Seite geöffnet
  e.stopPropagation();
  setUpdateUser(true); // Zum Rendern des HTML Teils
  
  //Dennis.S: Wozu wenn der Button nur für den eingelogten User erhältlich ist?
  //setUserIsAuthor(false); // Zum Rendern des HTML Teils
  
}



const submitUpdateHandler = async (e, userId)=>{
  e.stopPropagation();
  setUpdateUser(false); // Zum Rendern des HTML Teils
  setUserIsAuthor(true); // Zum Rendern des HTML Teils

  let oldImage = user.userimage;
  console.log("submitUpdateHandler in Profil ausgeführt");
  
    if(!validEmail(useremail)){
      console.log("WARNUNG hinzufügen");
    }
    else{
    
    try {
      const formData = new FormData();
        
      //Okay aus zeitgründen machen wir es "DOOF"  
      formData.append("userlastname", userlastname);
      formData.append("useremail", useremail);
      formData.append("username", username);
      formData.append("userprename", userprename);
      formData.append("userdescription", userdescription);
      formData.append("userbirthdate", userbirthdate);
      formData.append("jwt_token", localStorage.token);

      if(userimage==""){
        formData.append("changeImage", "false");
      }

      else{
        formData.append("userimage", userimage);
        formData.append("changeImage", "true");
        formData.append("userOldImage",user.userimage);//gibt Pfad+Name
      }
      
      const response = await DataServer.put(`/user/${userid}`, formData);
      
      setUser(response.data.data.user);
      
    } catch (err) {
      console.error(err.message);
    }
    
  }
}

const cancelHandler=(e)=>{
  e.preventDefault();

  //Alle Werte zum ursprüglichen zurückändern
  inputs.usermail= user.usermail;
  inputs.username= user.username;
  inputs.userlastname= user.userlastname;
  inputs.userprename= user.userprename;
  inputs.userdescription= user.userdescription;
  inputs.userbirthdate= user.userbirthdate.substring(0,10);
  inputs.userimage = "";

  setUpdateUser(false);

}


  return (
    <>

      {/* Profil des eingeloggten Nutzers anzeigen */}

   {userIsAuthor && updateUser == false &&
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
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete">Profil löschen</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>
        
      <Row className="profile">
        <Col sm={6} className=" profilSectionWrapper" >
          <Figure>
                <Figure.Image 
                  width={160}
                  height={150}
                  alt="171x180"
                  src={"../"+user.userimage}
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
          <p><strong>Geburtsdatum:</strong> <br/>{moment(user.userbirthdate).format("L")}</p>
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
            <Tabs defaultActiveKey="home" id="">
                <Tab eventKey="home" title="Meine Posts">
                 <PostsRow postElement={userPosts} /> 
                </Tab>
              {/*  <Tab eventKey="profile" title="Bewertungen">
                    <div>Hier könnten ihre Bewertungen stehen</div>
              </Tab>     */} 
            </Tabs>  
        </Col>
      </Row> 
  
    </Container>

  </>
  }
  
    {/* Profil des eingeloggten Nutzers updaten */}


    {updateUser && 
    <>
    <Container className="routeContainer">
        <h1 className="header">Ihr Profil bearbeiten</h1> 

      <Row className="profile">
        <Col sm={6} className=" profilSectionWrapper" >
          <Figure className="profilImage">
                <Figure.Image 
                  width={160}
                  height={150}
                  alt="171x180"
                  src={"../"+user.userimage}
                  roundedCircle
                />
                <Figure.Caption className="">
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input  onChange={(e)=>{setInputs({ ...inputs, userimage: e.target.files[0] })}} />
                    <Form.File.Label data-browse="Hochladen">
                      Bild hier einfügen
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">Erfolgreich hochgeladen!</Form.Control.Feedback>
                  </Form.File>
                </Figure.Caption>
              </Figure>
        </Col>
        <Col sm={6} className=" profilSectionWrapper"> 
          <div>
          <Form.Group  controlId="Useremail">
              <Form.Label>E-Mail Adresse</Form.Label>
              <Form.Control 
                type="email" 
                name="useremail"
                value={useremail}
                onChange={e => onChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                required
                name="username"
                value={username}
                onChange={e => onChange(e)}
                />
                <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Usernamen eingeben
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="UserLastname">
              <Form.Label>Nachname</Form.Label>
              <Form.Control 
                required
                name="userlastname"
                value={userlastname}
                onChange={e => onChange(e)}
                />
                <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Nachnamen eingeben
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="UserPrename">
              <Form.Label>Vorname</Form.Label>
              <Form.Control 
                name="userprename"
                value={userprename}
                onChange={e => onChange(e)}
                placeholder={userprename}
                />
               <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Vornamen eingeben
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="userBirthdate">
              <Form.Label>Geburtsdatum</Form.Label>
              <Form.Control
                type="date"
                name="userbirthdate"
                value={userbirthdate}    
                onChange={e => onChange(e)}

                />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Geburtsdatum eingeben
            </Form.Control.Feedback>
            </Form.Group>

          </div>
        </Col>
      </Row>


      <Row>
        <Col className="profiledescription">
        <h2 className="profilHeading">Profilbeschreibung</h2>
          <Form.Group controlId="UserDescription">
                <Form.Label>Über Mich</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                name="userdescription"
                value={userdescription}
                onChange={e => onChange(e)}
                />
              </Form.Group>
        </Col>  
      </Row>
      <div className="buttonBackground" >

      <Button style={{backgroundColor:"red"}} onClick={(e)=>{cancelHandler(e)}}>
        Abbruch
      </Button>

      <Button className="button" onClick={(e)=>{submitUpdateHandler(e)}}>
        Speichern
      </Button>

      </div>
        
    </Container>

  </>
  }




  {/* Profil eines fremden Nutzers anzeigen */}
  {!userIsAuthor && author != null &&
  <>
    <Container className="routeContainer">
 
            <h1 className="header">Das Profil von {author.username}</h1> 

      <Row className="profile">
        <Col sm={6} className=" profilSectionWrapper" >
          
          <Figure>
                <Figure.Image 
                  width={160}
                  height={150}
                  alt="171x180"
                  src={"/"+author.userimage}
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
          <p><strong>Geburtsdatum:</strong> <br/>  {author.userbirthdate.substring(0,10)}</p>
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
            <Tabs defaultActiveKey="home" id="">
                <Tab eventKey="home" title="Alle Posts">
                 <PostsRow postElement={authorPosts} /> 
                </Tab>
               {/*} <Tab eventKey="profile" title="Bewertungen">
                    <div>Leider hat sie noch kein Nutzer bewertet</div>
               </Tab>     */} 
            </Tabs>  
        </Col>
      </Row> 
 
    </Container>
  </>
 
}
</>
   
)

}

export default MeinProfil;