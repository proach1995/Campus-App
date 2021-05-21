import React from "react";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';





const LoginRequired = () => {
  return (
        <Jumbotron className="jumbotron">
            <h2 className="profilHeading">Login notwendig...</h2>
            <div>Bitte loggen Sie sich ein um diesen Bereich betreten zu können.</div>
            <div className="jumboButton">
                <Link to='/login' >
                    <Button  className="button login-btn" variant="primary" >
                        Zum Login
                        </Button> 
                </Link>
            </div>
            

          </Jumbotron>

  );
};

export default LoginRequired;













