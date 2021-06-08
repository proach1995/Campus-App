/* eslint-disable no-lone-blocks */
import React, {useContext, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

//muss installiert werden: npm install js-cookie --save
import Jumbotron from 'react-bootstrap/Jumbotron';

const Login = () => {

  const {logged, setLogged } = useContext(AppContext);
  const {user, setUser}      = useContext(AppContext);

  let history = useHistory();

  const [errorMsg, setErrorMsg] = useState (null);

  {/* Inputwerte werden mit State definiert*/}
  const [inputs, setInputs] = useState({
    useremail: "",
    userpassword: ""
  });

  const { useremail, userpassword } = inputs;
  {/* Inputs werden als Objekt zusammengeasst und mit ...props übergeben 
  -> siehe:https://stackoverflow.com/questions/28452358/what-is-the-meaning-of-this-props-in-reactjs/28452430 */}
  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("onChange in Login ausgeführt");


  const onSubmitForm = async e => {
    e.preventDefault();
    console.log("onSubmitForm in Register ausgeführt");

    try {
      const body = { useremail, userpassword };

      const response = await fetch(
        "http://localhost:3001/Database/Marktplatz/Authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
        
      let parseRes = await response.json();
    

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setLogged(true);
        setUser(parseRes.data.user); 
        console.log("Erfolgreich eingeloggt")
        console.log(parseRes);
        Cookies.set("userId", parseRes.data.user.userid);
        history.push("/");
      } else {
        setLogged(false);
        console.log(parseRes);
        setErrorMsg(parseRes);

      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{

console.log("user Login = ", user);
},[user]);
    return (
      

      
      <Container className="routeContainer">
         <>

      
           <h1>Login</h1>

          {!(errorMsg === null)  && 
            <Jumbotron className="errorBox">
            <h2 className="errorHeading">Ein Fehler ist aufgetaucht</h2>
            <div className="errorMsg">{errorMsg}</div>
          </Jumbotron>
          }
              <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="Email">
                  <Form.Label>E-Mailadresse</Form.Label>
                  <Form.Control 
                    value={useremail}
                    name="useremail"
                    type="email" 
                    onChange={e => onChange(e)}
                    placeholder="test0001@hs-kl.de" 
                  />
                
                </Form.Group>

                <Form.Group controlId="Password">
                  <Form.Label>Passwort</Form.Label>
                  <Form.Control 
                    value={userpassword} 
                    type="password" 
                    name="userpassword"
                    onChange={e => onChange(e)}
                    placeholder="Passwort" 
                  />
                </Form.Group> 
                    <div className="buttonBackground" >
                      <div className="centerLoginButtons">
                          <Button type="submit" className="button login-btn" variant="primary" >
                              Login
                            </Button>   
                      </div>  
                    </div>

              </Form>
            <div className="register">
            <Button href="/register" className="button register-btn login-btn" variant="secondary" >
              </Button> 
            </div>
                  

          </>
      </Container>

      
    );
  };
  
  export default Login;
