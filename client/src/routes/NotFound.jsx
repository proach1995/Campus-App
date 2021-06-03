import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';




const NotFound = () => {




  return (
    <Container className="routeContainer">
      
      <Jumbotron className="jumbotron">
            <h2 className="profilHeading">Seite nicht gefunden...</h2>
            <div>Bitte versuchen Sie es erneut.</div>
            <div className="jumboButton">
                <Link to='/' >
                    <Button  className="button login-btn" variant="primary" >
                        Zur Homepage
                        </Button> 
                </Link>
            </div>
            

          </Jumbotron>
    </Container>
  );
};

export default NotFound;