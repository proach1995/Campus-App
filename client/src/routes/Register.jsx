import React, {useState, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';



const Register = ({setAuth}) => {

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
  {/* Werte werden im Objekt inputs gespeichert um sie mit ...props zu übergeben*/}
  const { useremail, userpassword, username, userlastname, userprename, userdescription, userbirthdate } = inputs;
  {/* Spricht in der e.target Funktion erst den Namen an und übergibt dann den Wert, d.h. Name muss identisch sein
  mit dem Namen im Input field*/}
  const onChange = e => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("onChange in Register ausgeführt");

  }
    

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log("onSubmitForm in Register ausgeführt");

    try {
      const body = { useremail, userpassword, username, userlastname, userprename, userdescription, userbirthdate };
      console.log("test");
      const response = await fetch(
        "http://localhost:3001/Database/Marktplatz/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        console.log("Registrierung erfolgreich");
        {/* toast.success("Register Successfully"); */}
      } else {
        setAuth(false);
        console.log(parseRes);
      {/*  toast.error(parseRes); */}
      }
    } catch (err) {
      console.error(err.message);
    }
  };



  //Register Validation 
  function validEmail(useremail) {
    return /^[a-zA-Z]{4}\d{4}@stud.hs-kl.de/.test(useremail);
  }
 
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } if (!validEmail(useremail))  {
        alert("Bitte gebe eine richtige Hochschuladresse ein!");
        
        
      } else {
        alert("Richtige E-Mailadresse");
        console.log(useremail);
        console.log(useremail);
      }
  
      setValidated(true);
    }
 
    return (
      <Container className="routeContainer">
          <h1>Registriere dich!</h1>
       <Form noValidate validated={validated} onSubmit={onSubmitForm , handleSubmit}>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
              Deine E-Mailadresse ist keine Hochschuladresse
            </Form.Control.Feedback>
              <Form.Text id="passwordHelpBlock" muted>
              Es muss sich um eine offizielle E-Mailadresse der Hochschule Kaiserslautern handeln.
            </Form.Text>
            </Form.Group>

            <Form.Group  controlId="Userpassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control 
                required
                type="password" 
                name="userpassword"
                placeholder="Passwort"
                value={userpassword}
                onChange={e => onChange(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
               <Form.Control.Feedback type="invalid">
              Du musst ein Vornamen eingeben
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                required
                placeholder="Amerikastraße 1" 
                name="username"
                value={username}
                onChange={e => onChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                <a className="link" href="./Cookiepolicy"> siehe hier</a>
              
              </Form.Row>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
             Du musst die Datenschutzbestimmungen akzeptieren
           </Form.Control.Feedback>
          </Form.Group>

 
    <div className="buttonBackground" >
        <Button onSubmit={onSubmitForm , handleSubmit} type="submit" className="button">Registrieren</Button>
        
    </div>
    
      
</Form>
      </Container>
  
    );
  };
  
  export default Register;