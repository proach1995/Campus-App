/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./routes/Home";
import Footer from './components/navigation/Footer';
import PostUpload from "./routes/PostUpload";
import Marktplatz from "./routes/Marktplatz";
import Events from "./routes/Events";
import MeinProfil from "./routes/MeinProfil";
import Sidebar from "./components/navigation/Sidebar";
import NavbarTop from "./components/navigation/NavbarTop";
import Einstellungen from "./routes/Einstellungen";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Post from "./routes/Post";





const App = () => {

  {/* Mit jedem App render wird lokaler Token an Server gesendet, Server verifiziert und gibt Bool zurück
  setIsAuthenticated wird dann angepasst
   *********** Fetch könnte noch auf Axios angepasst werden**********
  */}
    const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:3001/Database/Marktplatz/authentication/verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseRes = await res.json();
  
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    {/* Bei jedem Rendern wird neu verifiziert.
    2. Rendern wichtig für Fetch, da sonst rendern bevor die Daten gefetcht sind*/}
    useEffect(() => {
      checkAuthenticated();
    }, []);


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
      setIsAuthenticated(boolean);
    };

    {/*logout Funktion wird an die Child Komponenten weitergegeben*/}

    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/Database/Marktplatz/home/", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseData = await res.json();
        setName(parseData.username);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    {/* muss eine Callbackfunktion sein*/}
    const logout = async e => {
      e.preventDefault();
      try {
        localStorage.removeItem("token");
        setAuth(false);
        console.log("Sicher ausgeloggt");
        {/*toast.success("Logout successfully"); */}
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);


  return (
      <div className="">
    <Router>
      <Sidebar isAuthenticated={isAuthenticated} logout={logout}/>
      <NavbarTop/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/marktplatz"
              component={Marktplatz}
            />
            <Route
              exact
              path="/events"
              component={Events}
            />
            <Route
              exact
              path="/meinprofil"
              component={MeinProfil}
            />
            <Route
              exact
              path="/postupload"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/postupload" />
                )
              }
            />
            <Route
              exact
              path="/post"
              component={Post}
            />
            <Route
              exact
              path="/einstellungen"
              component={Einstellungen}
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }

            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </Router>
        <Footer/>
        

      </div>
  );
};

export default App;
