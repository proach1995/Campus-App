import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from 'react-router-dom';
import DataServer from "../api/DataServer";
import { AppContext } from "../context/AppContext";
import LoginRequired from "../components/Content/LoginRequired";
import Spinner from 'react-bootstrap/Spinner'




const PostUpload = () => {

  const {logged} = useContext(AppContext);

  const {user} = useContext(AppContext);

  //const {id} = useParams(); wird später benötigt
  //radio
  const [radioAngebot, setRadioAngebot] = useState(true);
  const [radioGesucht, setRadioGesucht] = useState(false);
  const [postCategory, setPostCategory] = useState("Angebot");

  //error = 0 wird nicht funktionieren, da neu gerendert wird, wenn das State abgeändert wird
  //Error flags
  //const [error, setError] = useState(0);
 
  //Titel
  const [postTitle, setPostTitle] = useState("");
  
  //Kategorie
  const [postType, setPostType] = useState("Marktplatz");

  //Preis
  const [postPrice, setPostPrice] = useState(0);

  //Preisart
  const [postPriceType, setPostPriceType] = useState("Festpreis");

    //Description
  const [postDescription, setDescription] = useState("");


  //Dynamisches inputfield mit button
  const [componentIndex, setComponentIndex] = useState(1);//Wegen Asynchonität wir es hier hscon auf 1 gesetzt
  const [formComponents, setFormComponents] = useState([{inputId:0}]);
  const [imageFiles, setImageFiles] = useState([]);



  //Errorflags
  const [noTitel, setNoTitel] = useState(false);
  const [falsePrice, setFalsePrice] = useState(false);
  const [noImage, setNoImage] = useState(false);


  //Hilfsflags
  const [init, setInit] = useState(0);
  //Testen
  useEffect(()=>{

    if(imageFiles.length===0 && init === 1 ){
      setNoImage(true);
    }
    else{
      setNoImage(false);
    }
    setInit(1);
    //console.log("user upload = ", imageFiles[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageFiles])

    //Die funktion wird nur ausgeführt, wenn der Wert sich ändert
    //Radio kann nur angeschaltet werden, aber nicht ausgeschaltet werden
    //das muss dan eine Checkbox sein
  const radioAngebotFunction = (e)=>{
   
    setRadioAngebot(true);
    setRadioGesucht(false);
    setPostCategory("Angebot");
    //console.log(criteria);
    }

  const radioGesuchtFunction =(e)=>{

    setRadioGesucht(true);
    setRadioAngebot(false);
    setPostCategory("Gesucht");
    //console.log(criteria);
  }

  //Unterschied zwischen Elemente verändern oder ein neues Element hinzufügen
  const inputFieldHandler =(e, formId)=>{

    let gefunden = false;
    let index = 0;
    let imageFilesArray = [...imageFiles];
    //console.log(imageFilesArray[1]== null);
    
    for(let obj of formComponents){
      
      if(obj.inputId === formId && imageFilesArray[index] !=null){
        imageFilesArray[index] = e.target.files[0];
        setImageFiles(imageFilesArray);
        gefunden = true;
        
      }
      index = index+1;
    }
    
    if(gefunden === false){
    setComponentIndex(componentIndex+1);
    setFormComponents([...formComponents, {inputId:componentIndex}]);
    setImageFiles([...imageFiles, e.target.files[0]]);
  }
  //gefunden und Update
  else{
    setImageFiles(imageFilesArray);
  }
}

//Hier werden Elemente auf 2 arten gelöscht.
//-Filter
//-mit splice und Index
  const cancelButtonHandler = (e, formId)=>{
    e.preventDefault();
    
    //Element entfernen
    if(formComponents.length >1){
      let imageFilesArray = [...imageFiles];
      let formComponentsArray = [...formComponents];
      let index = 0;


      for(let formObject of formComponents){

        if(formObject.inputId === formId && index !== formComponentsArray.length-1){
          formComponentsArray.splice(index,1);
          imageFilesArray.splice(index, 1);
          
        }
        index = index +1;
      }

    setFormComponents(formComponentsArray);
    setImageFiles(imageFilesArray);  
  
  }
}

  const submitHandler = async (e)=>{
    e.preventDefault();
    
    let errorFlag = false;
    //Errorcatching
    //Error No titel
    if(postTitle===""){
      setNoTitel(true);
      errorFlag = true;
    }
    else{
      setNoTitel(false);
    }

    //Error false Price
    if(Number(postPrice) <0){
      setFalsePrice(true);
      errorFlag = true;
    }
    else{
      setFalsePrice(false);
    }

    if(imageFiles.length===0){
      setNoImage(true);
      errorFlag = true;
    }
    else{
      setNoImage(false);
    }
    	
    //Datenbank mit einbeziehen
    if(errorFlag === false){
    
      //Post erstellen
      const postResult = await DataServer.post("/Post/AddPost",{
        postTitle: postTitle,
        userId: user.userid,
        postCategory: postCategory,
        postType: postType,
        postPriceType: postPriceType,
        postPrice: postPrice,
        postDescription: postDescription
      });
      
      //console.log("results");
      //console.log(postResult.data.data.post[0].postid);
      
      
    //Mit formData die bilder füllen und zum backend Server schicken
    const formData = new FormData();
    let index = 0;
    for(; index<imageFiles.length; index++){
    
      formData.append("imageFile", imageFiles[index]);
    }
    formData.append("length",{length:index});
    
    for(let obj of formData){
      console.log(obj);
  } 

    const headers = {'content-type': 'multipart/form-data'}
    const res = await DataServer.post("/Upload/PostImages/"+
                                postResult.data.data.post[0].postid,
                                 formData, {headers}//Header ist ein muss
);

  }

}
  return(
    <Container className="routeContainer">

      <h1>Anzeige erstellen</h1>    
      
      <div>
      {logged === null &&
        <Spinner animation="border" />
      }  
      </div>
      <div>
      {logged && 
              <Form>
                <Form.Check inline label="Angebot"
                type="radio"
                id="radioAngebot"
                onChange ={(e)=>{radioAngebotFunction(e)}}
                checked={radioAngebot}
                />
      
                <Form.Check inline label="Gesucht"
                type="radio"
                id="radioGesucht"
                onChange ={(e)=>{radioGesuchtFunction(e)}}
                checked = {radioGesucht}
                />
             
                {/**Kann soweit ergänzt werden, dass Button dan erscheint wenn bild hinzugefügt wurde */}
                {formComponents.map(form=>(
                  <>
                  <div key={form.inputId}>
                    <Form.Row>
                      <Form.File id="productimage"
                        onChange={(e)=>{inputFieldHandler(e, form.inputId)}}
                      /> 
                      <div >
                        <a onClick={(e)=>{cancelButtonHandler(e, form.inputId)}} className="cancelButton">Entfernen</a>
                      </div>     
                        {noImage===true && <p style={{color:"red",
                        fontSize:"20px",
                        marginLeft:"20px",
                        fontWeight:"bold"}}>
                        Mindestens 1 Bild wählen</p>} 
                    </Form.Row>
                  </div>
                  </>
                  ))}
                 <Form.Group>
                    <Form.Row>
                      <Form.Label>Titel</Form.Label>
                      {noTitel === true &&
                      <p style={{color:"red",
                        fontSize:"20px",
                        marginLeft:"20px",
                        fontWeight:"bold"}}>
                        Titel hinzufügen!</p> }
                    </Form.Row>
                      <Form.Control type="text" placeholder="Titel" onChange={(e)=>{setPostTitle(e.target.value)}}/>
                    </Form.Group>
          <         Form.Group >
                      <Form.Label>Kategorie</Form.Label>
                          <Form.Control as="select" defaultValue="Kategorie" onChange ={(e)=>{setPostType(e.target.value)}}>
                            <option>Marktplatz</option>
                            <option>Events</option>
                          </Form.Control>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} >
                        <Form.Row>
                        <Form.Label>Preis</Form.Label>
                        {falsePrice === true &&  <p style={{color:"red",
                          fontSize:"20px",
                          marginLeft:"20px",
                          fontWeight:"bold"}}>
                          Ungültiger Preis</p>}
                          </Form.Row>
                        <Form.Control type="number" onChange={(e)=>{setPostPrice(Number(e.target.value))}}/>
                      </Form.Group>
                      <Form.Group as={Col} >
                        <Form.Label>Preisart</Form.Label>
                            <Form.Control as="select" defaultValue="Festpreis" onChange={(e) =>{setPostPriceType(e.target.value)}}>
                              <option value="Festpreis">Festpreis</option>
                              <option value="Verhandelbar">Verhandelbar</option>
                              <option value="Leihen">Leihen</option>
                            </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <Form.Group  >
                        <Form.Label>Beschreibung</Form.Label>
                        <Form.Control as="textarea" rows={10} placeholder="Beschreibung" onChange={(e)=>{setDescription(e.target.value)}}/>
                      </Form.Group>
                    <Link to="/">
                      <Button className="button" variant="primary" type="submit" onClick={(e)=>{submitHandler(e)}}>
                        Submit
                      </Button>
                    </Link>
              </Form> 
            }
      </div>
      <div>
        {!logged && 
        
          <LoginRequired/>
          
        
        }
      </div>

</Container>
  )
};


export default PostUpload;
