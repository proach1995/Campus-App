import React from "react";
import Container from 'react-bootstrap/Container';
import CookieBanner from 'react-cookie-banner';
import CookieConsent from "react-cookie-consent";

const Banner = () => {
    return (
      <Container className="routeContainer">
        
       
   <CookieConsent 
   style={{background: "#82b432"}}
   buttonStyle={{background: "#212b21" , color: "#ffffff" , fontSize:"15px"}}
   buttonText="Akzeptieren"
   expires={365}
   >Diese Webseite verwendet Cookies und speichert deine persönlichen Daten. Schau dir unserer <a href="./Cookiepolicy">Datenschutzerklärung</a> genauer an.</CookieConsent>
      </Container>

);
};

export default Banner;