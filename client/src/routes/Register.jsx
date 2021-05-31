import React, {useState, useEffect, useContext} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';
import DataServer from "../api/DataServer";
import { AppContext } from "../context/AppContext";





const Register = () => {

  const {logged, setLogged} = useContext(AppContext);
  // eslint-disable-next-line no-lone-blocks
  {/* Werte mit State in Input Objekt initialisieren*/}
  const [inputs, setInputs] = useState({
    useremail: "",
    userpassword: "",
    username: "",
    userlastname: "",
    userprename: "",
    userdescription: "",
    userbirthdate: "",

  });
  /* Werte werden im Objekt inputs gespeichert um sie mit ...props zu übergeben*/
  const { useremail, userpassword, username, userlastname, userprename, userdescription, userbirthdate } = inputs;
  const [validated, setValidated] = useState(false);
    
  /* Spricht in der e.target Funktion erst den Namen an und übergibt dann den Wert, d.h. Name muss identisch sein
  mit dem Namen im Input field*/
  const onChange = e => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("onChange in Register ausgeführt");
    console.log("onChange2 in Register ausgeführt");

  }
    
  function validEmail(useremail) {
    return /^[a-zA-Z]{4}\d{4}@stud.hs-kl.de/.test(useremail);
  }

  const onSubmitForm = async e => {
    console.log("onSubmitForm in Register ausgeführt");
    
    if(!validEmail(useremail)){
      console.log("WARNUNG hinzufügen");
    }
    else{
    
    try {      
      const response = await DataServer.post("/authentication/register", {
        useremail: useremail,
        userpassword: userpassword,
        username: username,
        userlastname: userlastname,
        userprename: userprename,
        userdescription: userdescription,
        userbirthdate: userbirthdate,
      })


      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setLogged(true);
        console.log("Registrierung erfolgreich");

      } else {
        setLogged(false);
        console.log(parseRes);
      
      }
    } catch (err) {
      console.log("user schon da");
      console.error(err.message);
    }
    
  }
}


    useEffect(()=>{

      if(validEmail(useremail)){
        setValidated(true);
      }
      else{
        setValidated(false);
      }
    
    },[useremail])
 
    return (
      <Container className="routeContainer">
          <h1>Registriere dich!</h1>
       <Form noValidate validated={validated} onSubmit={onSubmitForm}>
          <Form.Row>
            <Form.Group  controlId="Useremail">
              <Form.Label>E-Mail Adresse</Form.Label>
              <Form.Control 
                required
                type="email" 
                name="useremail"
                placeholder="test0001@stud.hs-kl.de" 
                value={useremail}
                onChange={e => onChange(e)}
              />

              <Form.Text id="passwordHelpBlock" muted>
              Es muss sich um eine offizielle E-Mailadresse der Hochschule Kaiserslautern handeln.
            </Form.Text>
            {validated === false ?
            <Form.Control.Feedback type="invalid">Gib die richtige E-mail ein</Form.Control.Feedback>
          :
          <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
          }
            
            </Form.Group>

            <Form.Group  controlId="Userpassword">
              <Form.Label htmlFor="inputPassword5">Passwort</Form.Label>
              <Form.Control 
                required
                type="password" 
                name="userpassword"
                id = " inputPassword5 "
                placeholder="Passwort"
                aria-descriptionby = "passwordHelpBlock"
                value={userpassword}
                onChange={e => onChange(e)}
              />
              <Form.Text id = " inputPassword5 " muted>Dein Passwort muss zwischen 8 und 20 Zeilen sein.</Form.Text>
               <Form.Control.Feedback type="invalid">
              Du musst ein Passwort eingeben
            </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
            <Form.Group controlId="UserLastname">
              <Form.Label>Nachname</Form.Label>
              <Form.Control 
                required
                placeholder="Mustermann" 
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
                required
                placeholder="Max" 
                name="userprename"
                value={userprename}
                onChange={e => onChange(e)}
                />
               <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Vornamen eingeben
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                required
                placeholder="Username" 
                name="username"
                value={username}
                onChange={e => onChange(e)}
                />
                <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Usernamen eingeben
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="UserBirthdate">
              <Form.Label>Geburtsdatum</Form.Label>
              <Form.Control
                required
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
            <Form.Group>
              <Form.File 
                id="UserImage" 
                label="Profilbild" 
                name="userimage"
              />
            </Form.Group>
          <Form.Group id="formGridCheckbox">
            <Form.Row>
            
              <Form.Check
                required
                type="checkbox" 
                label="Datenschutzbestimmungen" 
                name="dataprivacy"
                > 
                </Form.Check> 
                <a className="link" href="./Cookiepolicy"> siehe hier.</a>
              
              </Form.Row>
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
             Du musst die Datenschutzbestimmungen akzeptieren
           </Form.Control.Feedback>
          </Form.Group>

 
    <div className="buttonBackground" >
        <Button href="/" type="submit" className="button">Registrieren</Button>
        
    </div>
    
      
</Form>
      </Container>
  
    );
  };
  
  export default Register;