import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
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
import moment from 'moment';


const Post = () => {

  //Seite wechseln
  let history = useHistory();
  
  const {logged, setLogged} = useContext(AppContext);
  const {user, setUser} = useContext(AppContext);


  const { postid } = useParams();
  let [userIsAuthor, setUserIsAuthor] = useState(false)
  const [post, setPost] = useState(true);
  const[postImages, setPostImages] = useState([]);

  /**********  UPDATE *****************/
const [updatePost, setUpdatePost] = useState(null);

const [inputs, setInputs] = useState({
  postprice: "",
  postcategory: "",
  postdate: "",
  posttype: "",
  posttitle:"",
  postdescription: "",
  postpricetype: "",
  postemail: "",
  
});
/* Werte werden im Objekt inputs gespeichert um sie mit ...props zu übergeben*/
const { postprice, postcategory, postdate, posttype, posttitle, postdescription, postpricetype, postemail} = inputs;

  //post und user fetchen
  const fetchPost= async () => {
    try {
      const response = await DataServer.get(`/Post/${postid}`, {jwt_token:localStorage.token});
      
      //State verändern
      console.log(response.data.postDetail.post);
      setPost(response.data.postDetail.post);
      setPostImages(response.data.postDetail.images);
      console.log(post.useremail);
      //Entscheiden, ob es fremder User ist oder eingeloggter User
      if(response.data.postDetail.post.userid == user.userid){
        setUserIsAuthor(true);
      }
      else{
        setUserIsAuthor(false);
      }
    } catch (err) {
      console.log(err);
      console.log("FetchPost hat nicht funktioniert");
    }
  };

//Handelt refresh, als auch normal
useEffect(()=>{
  fetchPost();
},[user])
 

//Inputs einen anfangwert geben, um später beim Updaten fehler zu verhindern
useEffect(()=>{

setInputs({
        postprice: post.postprice,
        postcategory: post.postcategory,
        postdate: post.postdate,
        posttype: post.posttype,
        posttitle:post.posttitle,
        postdescrption: post.postdescription,
        postpricetype:post.postpricetype,
        postuseremail: post.postuseremail,
      
      });

},[post])
/**********  DELETE *****************/


const deleteHandler = async (e, userId)=>{
  e.stopPropagation();
  const deletePost= async () => {
    try {
      const deletedPost = await DataServer.delete(`/Post/${postid}`, {data:{jwt_token:localStorage.token,
                                                                            postid:post.postid}});
      
      
      console.log("Post wurde erfolgreich gelöscht");
    } catch (err) {
      console.log(err);
    }
  };
  deletePost();
  console.log(user.userid);
  history.push("/user/"+user.userid);
  window.location.reload();
}

/* Spricht in der e.target Funktion erst den Namen an und übergibt dann den Wert, d.h. Name muss identisch sein
mit dem Namen im Input field*/
const onChange = e => {
  e.preventDefault();
  setInputs({ ...inputs, [e.target.name]: e.target.value });
}
 

const updatePostHandler = async (e, userId)=>{ // Wird im Dropdown der default eingeloggt Seite geöffnet
  e.stopPropagation();
  setUpdatePost(true); // Zum Rendern des HTML Teils
  setUserIsAuthor(false); // Zum Rendern des HTML Teils
}


const submitUpdateHandler = async (e, postId)=>{
  e.stopPropagation();
  console.log("submitUpdateHandler in Profil ausgeführt");

  try{  
      //console.log("test");
      
      console.log("inputs",inputs);
      const response = await DataServer.put(`/post/${postid}`, {
        jwt_token:localStorage.token,
        postprice: inputs.postprice,
        postcategory: inputs.postcategory,
        postdate: inputs.postdate,
        posttype: inputs.posttype,
        postdescription:inputs.postdescription,
        posttitle:inputs.posttitle,
        postpricetype:inputs.postpricetype,
        postuseremail:inputs.postuseremail,
       
      });
      setUpdatePost(false); // Zum Rendern des HTML Teils
      setUserIsAuthor(true); // Zum Rendern des HTML Teils
      console.log("test", inputs);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  

}

  const cancelHandler = (e) =>{
    
    //Zum ursprünglichen Wert zurücksetzen
    setInputs({postprice: post.postprice,
      postcategory: post.postcategory,
      postdate: post.postdate,
      posttype: post.posttype,
      posttitle:post.posttitle,
      postdescription: post.postdescription,
      postemail:post.postemail});
    setUpdatePost(false);
    setUserIsAuthor(true); 

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
          {postImages.map((image, index)=>{
              return(

            
            <Carousel.Item key={index}>
              <img
                className="d-block imageCarousel"
                src={"../"+image.imagepath}

              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
           
               );
              })}

    </Carousel>   
        </Col>
      </Row>
        <h3 className="contentHeading">Details</h3>
        
          <Row className="contentSection "> 
            <Col>
              <p><strong>Preis:</strong></p>
              <p><strong>Angebotsart:</strong></p>
              <p><strong>Kategorie:</strong></p>
              <p><strong>Datum:</strong></p>
              <p><strong>Typ:</strong></p>
            </Col>
            <Col>
              <p>{post.postprice}€</p>
              <p>{post.postpricetype}</p>
              <p>{post.postcategory}</p>
              <p>{post.postdate.substring(0,10)}</p>
              <p>{post.posttype}</p>
            </Col>
            <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>{updatePostHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete">Post löschen</Dropdown.Item>
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
            src={"../"+user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        <Row className="contentbtn">
        <a href={"mailto:"+ post.useremail}>
        <Button  className="button login-btn " variant="primary" >
        {post.postemail} Kontakt
              </Button>
              </a>
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


<Form.Label>Titel</Form.Label>
              <Form.Control
                name="posttitle"
                placeholder ={post.posttitle}
                value={posttitle}    
                onChange={e => onChange(e)}
                style={{marginBottom:"20px"}}/>

      <Row className="">
          
        <Col  className="pictureSection imageCarouse" >
          
          <Carousel interval={null} slides={true}>
          {postImages.map((image, index)=>{
              return(

            
            <Carousel.Item key={index}>
              <img
                className="d-block imageCarousel"
                src={"../"+image.imagepath}

              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
           
               );
              })}
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
            <Form.Group controlId="postpricetype">
              <Form.Label>Angebotsart</Form.Label>
              <Form.Control as="select" 
                placeholder={post.postpricetype}
                name="postpricetype"
                onChange={e => onChange(e)}
                >
                <option value="Festpreis">Festpreis</option>
                <option value="Verhandelbar">Verhandelbar</option>
                <option value="Leihbar">Leihbar</option>
                </Form.Control>
            </Form.Group>
              <Form.Group controlId="postcategory">
              <Form.Label>Kategorie</Form.Label>
              <Form.Control as="select" 
                placeholder={post.postcategory}
                name="postcategory"
                onChange={e => onChange(e)}
                >
                <option value="Angebot">Angebot</option>
                <option value="Gesucht">Gesucht</option>
                </Form.Control>
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
            {/* <Col>
            <Dropdown className="postSettings">
              <Dropdown.Toggle className="settingsbtn color dropdown-btn "  id="dropdown-basic">
              <AiIcons.AiOutlineSetting className="icon" />
              </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=>{updatePostHandler(e)}}>Daten bearbeiten</Dropdown.Item>
              <Dropdown.Divider className="delete" />
              <Dropdown.Item onClick={(e)=>{deleteHandler(e)}} className="delete" href="/">Profil löschen</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    
            </Col> */}
          </Row>
          
     

          <h3 className="contentHeading">Beschreibung</h3>
      <Row className="contentSection">
      <Form.Group controlId="PostDescription" style={{width:"100%"}}>
                
                <Form.Control 
                as="textarea" 
                rows={10} 
                name="postdescription"
                placeholder={post.postdescription}
                value={postdescription}
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
            src={"../"+user.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        
      </Row>
      <div className="buttonBackground" >
      <Button style={{backgroundColor:"red"}} onClick={(e)=>{cancelHandler(e)}}>
        Abbruch
      </Button>
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
          {postImages.map((image, index)=>{
              return(

            
            <Carousel.Item key={index}>
              <img
                className="d-block imageCarousel"
                src={"../"+image.imagepath}

              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
           
               );
              })}


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
              <p>{moment(post.postdate).format("L")}</p>
              <p>{post.posttype}</p>
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
            src={"../"+post.userimage}
            roundedCircle
          />
          <p className="username">{post.username}</p>
          </Link>
        </Col>
        </Row>
        <Row className="contentbtn">
          <a href={"mailto:"+ post.useremail}>
        <Button  className="button login-btn " variant="primary" >
              Kontakt
              </Button>
              </a>
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