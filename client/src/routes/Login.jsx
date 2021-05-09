/* eslint-disable no-lone-blocks */
import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './route.css';


const Login = ({setAuth}) => {

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
      
      {/* Hier muss Axios fetch rein. Frage: Wie macht man 
      einen Axios post request? */}
      console.log("Dennis: step1");
      const response = await fetch(
        "http://localhost:3001/Database/Marktplatz/authentication/login",
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
        console.log("Erfolgreich eingeloggt")
      } else {
        setAuth(false);
        console.log(parseRes)
      }
    } catch (err) {
      console.error(err.message);
    }
  };


    return (
      

      
      <Container className="routeContainer">
         <>

      
           <h1>Login</h1>
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
                <Form.Check  type="checkbox" label="eingeloggt bleiben" />
                    <div className="buttonBackground" >
                      <div className="centerLoginButtons">
                          <Button type="submit" className="button login-btn" variant="primary" >
                              Login
                            </Button>   
                      </div>  
                    </div>
              </Form>

            <Button href="/register" className="button register-btn login-btn" variant="secondary" >
                Jetzt Registrieren 
              </Button> 


                  

          </>
      </Container>

      
    );
  };
  
  export default Login;
