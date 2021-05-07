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

    return (
      <Container className="routeContainer">
          <h1>Registriere dich!</h1>
       <Form onSubmit={onSubmitForm}>
          <Form.Row>
            <Form.Group  controlId="Useremail">
              <Form.Label>E-Mail Adresse</Form.Label>
              <Form.Control 
                type="email" 
                name="useremail"
                placeholder="test0001@stud.hs-kl.de" 
                value={useremail}
                onChange={e => onChange(e)}
              />
              <Form.Text id="passwordHelpBlock" muted>
              Es muss sich um eine offizielle E-Mailadresse der Hochschule Kaiserslautern handeln.
            </Form.Text>
            </Form.Group>

            <Form.Group  controlId="Userpassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control 
                type="password" 
                name="userpassword"
                placeholder="Passwort"
                value={userpassword}
                onChange={e => onChange(e)}
              />
            </Form.Group>
          </Form.Row>
            <Form.Group controlId="UserLastname">
              <Form.Label>Nachname</Form.Label>
              <Form.Control 
                placeholder="Mustermann" 
                name="userlastname"
                value={userlastname}
                onChange={e => onChange(e)}
                />
            </Form.Group>
            <Form.Group controlId="UserPrename">
              <Form.Label>Vorname</Form.Label>
              <Form.Control 
                placeholder="Max" 
                name="userprename"
                value={userprename}
                onChange={e => onChange(e)}
                />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                placeholder="Amerikastraße 1" 
                name="username"
                value={username}
                onChange={e => onChange(e)}
                />
            </Form.Group>
            <Form.Group controlId="UserBirthdate">
              <Form.Label>Geburtsdatum</Form.Label>
              <Form.Control 
                type="date"
                name="userbirthdate"
                value={userbirthdate}
                onChange={e => onChange(e)}
                />
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
            <Form.Check 
              type="checkbox" 
              label="Datenschutzbestimmungen" 
              name="dataprivacy"
              />
          </Form.Group>

 
    <div className="buttonBackground" >
        <Button onSubmit={onSubmitForm} type="submit" className="button">Registrieren</Button>
        <Link to="/login">login</Link>
    </div>
    <input type="submit" value="Submit" />
      
</Form>
      </Container>
  
    );
  };
  
  export default Register;