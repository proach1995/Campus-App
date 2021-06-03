import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/esm/Image";
import DataServer from "../api/DataServer";
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from "react-bootstrap/Dropdown";
import * as AiIcons from 'react-icons/ai';
import './route.css';
import PostsRow from "../components/Content/PostsRow";
import { AppContext } from "../context/AppContext";
import Form from 'react-bootstrap/Form';








const Post = () => {

  const {logged, setLogged} = useContext(AppContext);
  const {user, setUser} = useContext(AppContext);


  const { postid } = useParams();
  let [userIsAuthor, setUserIsAuthor] = useState(false)
  const [post, setPost] = useState(true);
  console.log("postid: " + postid);



  useEffect(() => {
    const fetchPost= async () => {
      try {
        const response = await DataServer.get(`/Post/${postid}`, {jwt_token:localStorage.token});
        console.log(response.data.postDetail.post);
        console.log(response.data.postDetail.post.posttitle);
        console.log(response.data.postDetail.post.postid);
        

        setPost(response.data.postDetail.post);
      } catch (err) {
        console.log(err);
        console.log("FetchPost hat nicht funktioniert");
      }
    };

    fetchPost();
  }, []);



console.log(post);
console.log(post.posttitle);
 
/**********  DELETE *****************/


const deleteHandler = async (e, userId)=>{
  e.stopPropagation();
  const deletePost= async () => {
    try {
      const deletedPost = await DataServer.delete(`/Post/${postid}`, {jwt_token:localStorage.token});
      localStorage.removeItem("token");
      setLogged(false);
      console.log("Post wurde erfolgreich gelöscht");
    } catch (err) {
      console.log(err);
    }
  };
  deletePost();
}
/**********  UPDATE *****************/
const [updatePost, setUpdatePost] = useState(null);
const [updatePostData, setUpdatePostData] = useState(null);

const [inputs, setInputs] = useState({
  postprice: "",
  postcategory: "",
  postdate: "",
  posttype: "",
  

});

console.log(inputs);
/* Werte werden im Objekt inputs gespeichert um sie mit ...props zu übergeben*/
const { postprice, postcategory, postdate, posttype, useremail} = inputs;
const [validated, setValidated] = useState(false);

/* Spricht in der e.target Funktion erst den Namen an und übergibt dann den Wert, d.h. Name muss identisch sein
mit dem Namen im Input field*/
const onChange = e => {
  e.preventDefault();
  setInputs({ ...inputs, [e.target.name]: e.target.value });
console.log(inputs);
}
 
function validEmail(useremail) {
  return /^[a-zA-Z]{4}\d{4}@stud.hs-kl.de/.test(useremail);
}


const updatePostHandler = async (e, userId)=>{ // Wird im Dropdown der default eingeloggt Seite geöffnet
  e.stopPropagation();
  setUpdatePost(true); // Zum Rendern des HTML Teils
  setUserIsAuthor(false); // Zum Rendern des HTML Teils
}



const submitUpdateHandler = async (e, postId)=>{
  e.stopPropagation();
  setUpdatePost(false); // Zum Rendern des HTML Teils
  setUserIsAuthor(true); // Zum Rendern des HTML Teils
  console.log("submitUpdateHandler in Profil ausgeführt");
    
    if(!validEmail(useremail)){
      console.log("WARNUNG hinzufügen");
    }
    else{
    
    try {
      //const body = { useremail, userpassword, username, userlastname, userprename, userdescription, userbirthdate };
      
      //console.log("test");
      const response = await DataServer.put(`/post/${postid}`, {
        jwt_token:localStorage.token,
        postprice: postprice,
        postcategory: postcategory,
        postdate: postdate,
        posttype: posttype,
        

        //body: JSON.stringify(body)   //body in Body übergeben
      })
      
      const parseRes = await response.json(); 

      
    } catch (err) {
      console.error(err.message);
    }
    
  }


}

  return (
    <>
    {/*Post des eingeloggten Nutzers*/}

 {userIsAuthor &&
    <>
    <Container className="routeContainer">
    {post!==null && (
    <>


      <h3 className="postHeader">{post.posttitle}</h3> 

      <Row className="">
          
        <Col  className="pictureSection imageCarouse" >
          
          <Carousel interval={null} slides={true}>
            <Carousel.Item>
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="First slide"
                
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
             
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="Second slide"
              />

            
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block imageCarousel"
                src="../party.jpg"
                alt="Third slide"
                
              />
              
            </Carousel.Item>
    </Carousel>   
        </Col>
      </Row>
        <h3 className="contentHeading">Details</h3>
        
          <Row className="contentSection "> 
            <Col>
              <p><strong>Preis:</strong></p>
              <p><strong>Kategorie:</strong></p>
              <p><strong>Datum:</strong></p>
              <p><strong>Typ:</strong></p>
            </Col>
            <Col>
              <p>{post.postprice}€</p>
              <p>{post.postcategory}</p>
              <p>{post.postdate}</p>
              <p>{post.posttype}</p>
            </Col>
            <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>{updatePostHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Item href="/">Passwort zurücksetzen</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete" href="/">Post löschen</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    
            </Col>
          </Row>
          
     

          <h3 className="contentHeading">Beschreibung</h3>
      <Row className="contentSection ">
        <Col>
          
              <p>
                {post.postdescription}
              </p>
        </Col>
      </Row>
  
      <h3 className="contentHeading">Anbieter</h3>
      <Row className="contentcontact">
        <Row>
        <Col className="userSection">
          <Link to={`/user/${post.userid}`}>
          <Figure.Image 
            width={50}
            height={40}
            alt="171x180"
            src="../pb.jpg" //{user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        <Row className="contentbtn">
        <Button  className="button login-btn " variant="primary" >
                        Kontaktieren
              </Button>
        </Row>
        
      </Row>   
    </>
 )} 
  </Container>
  </>
 }

      {/* Post des eingeloggten Nutzers updaten */}

{updatePost &&
<>
<Container className="routeContainer">
    {post!==null && (
    <> 


      <h3 className="postHeader">{post.posttitle} bearbeiten</h3> 

      <Row className="">
          
        <Col  className="pictureSection imageCarouse" >
          
          <Carousel interval={null} slides={true}>
            <Carousel.Item>
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="First slide"
                
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
             
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="Second slide"
              />

            
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block imageCarousel"
                src="../party.jpg"
                alt="Third slide"
                
              />
              
            </Carousel.Item>
    </Carousel>   
        </Col>
      </Row>
        <h3 className="contentHeading">Details</h3>
        
          <Row className="contentSection "> 
            <Col>
            <Form.Group controlId="postprice">
              <Form.Label>Preis</Form.Label>
              <Form.Control 
                placeholder={post.postprice}
                name="postprice"
                value={postprice}
                onChange={e => onChange(e)}
                />
            </Form.Group>
              <Form.Group controlId="postcategory">
              <Form.Label>Kategorie</Form.Label>
              <Form.Control 
                placeholder={post.postcategory}
                name="postcategory"
                value={postcategory}
                onChange={e => onChange(e)}
                />
            </Form.Group>
            <Form.Group controlId="postDate">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                name="postdate"
                placeholder ={post.postdate}
                value={postdate}    
                onChange={e => onChange(e)}
                />
            </Form.Group>
              <Form.Group controlId="posttype">
              <Form.Label>Typ</Form.Label>
              <Form.Control 
                placeholder={post.posttype}
                name="posttype"
                value={posttype}
                onChange={e => onChange(e)}
                />
            </Form.Group>
            </Col>
            <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>{updatePostHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Item href="/">Passwort zurücksetzen</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete" href="/">Profil löschen</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    
            </Col>
          </Row>
          
     

          <h3 className="contentHeading">Beschreibung</h3>
      <Row className="contentSection ">
      <Form.Group controlId="PostDescription">
                
                <Form.Control 
                as="textarea" 
                rows={3} 
                name="postdescription"
                placeholder={post.postdescription}
                onChange={e => onChange(e)}
                />
              </Form.Group>
      </Row>
  
      <h3 className="contentHeading">Anbieter</h3>
      <Row className="contentcontact">
        <Row>
        <Col className="userSection">
          <Link to={`/user/${post.userid}`}>
          <Figure.Image 
            width={50}
            height={40}
            alt="171x180"
            src="../pb.jpg" //{user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        
      </Row>
      <div className="buttonBackground" >
      <Button className="button" onClick={(e)=>{submitUpdateHandler(e)}}>
        Speichern
      </Button>
      </div>
      
        </>
 )}
    </Container>

    </>
}


      {/* Post einem fremnden Nutzer zeigen */}
      {!userIsAuthor && !updatePost &&
      <>
<Container className="routeContainer">
    {post!==null && (
    <> 


      <h3 className="postHeader">{post.posttitle}</h3> 

      <Row className="">
          
        <Col  className="pictureSection imageCarouse" >
          
          <Carousel interval={null} slides={true}>
            <Carousel.Item>
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="First slide"
                
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
             
              <img
                className="d-block imageCarousel"
                src="../pb.jpg"
                alt="Second slide"
              />

            
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block imageCarousel"
                src="../party.jpg"
                alt="Third slide"
                
              />
              
            </Carousel.Item>
    </Carousel>   
        </Col>
      </Row>
        <h3 className="contentHeading">Details</h3>
        
          <Row className="contentSection "> 
            <Col>
              <p><strong>Preis:</strong></p>
              <p><strong>Kategorie:</strong></p>
              <p><strong>Datum:</strong></p>
              <p><strong>Typ:</strong></p>
            </Col>
            <Col>
              <p>{post.postprice}€</p>
              <p>{post.postcategory}</p>
              <p>{post.postdate}</p>
              <p>{post.posttype}</p>
            </Col>
            <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>{updatePostHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Item href="/">Passwort zurücksetzen</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete" href="/">Profil löschen</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    
            </Col>
          </Row>
          
     

          <h3 className="contentHeading">Beschreibung</h3>
      <Row className="contentSection ">
        <Col>
          
              <p>
                {post.postdescription}
              </p>
        </Col>
      </Row>
  
      <h3 className="contentHeading">Anbieter</h3>
      <Row className="contentcontact">
        <Row>
        <Col className="userSection">
          <Link to={`/user/${post.userid}`}>
          <Figure.Image 
            width={50}
            height={40}
            alt="171x180"
            src="../pb.jpg" //{user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        <Row className="contentbtn">
        <Button  className="button login-btn " variant="primary" >
                        Kontaktieren
              </Button>
        </Row>
        
      </Row>
      
        </>
 )} 
    </Container>
    </>
}  
  </>
)
}

export default Post;