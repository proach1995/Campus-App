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
import Login from "./routes/Login";
import Register from "./routes/Register";
import Post from "./routes/Post";
import CookiePolicy from "./routes/CookiePolicy";
import Banner from "./routes/Banner"
import { AppContextProvider } from "./context/AppContext"



const App = () => {


  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  {/* Mit jedem App render wird lokaler Token an Server gesendet, Server verifiziert und gibt Bool zurück
  setIsAuthenticated wird dann angepasst
   *********** Fetch könnte noch auf Axios angepasst werden**********
  */}
    const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:3001/Database/Marktplatz/Authentication/Verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseRes = await res.json();
        console.log("parseRes = ", parseRes);
  
      setIsAuthenticated(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    {/* Bei jedem Rendern wird neu verifiziert.
    2. Rendern wichtig für Fetch, da sonst rendern bevor die Daten gefetcht sind*/}

    {/*logout Funktion wird an die Child Komponenten weitergegeben*/}

    {/*const [name, setName] = useState(""); */}
    
    /*Kommt später
    const getProfile = async () => {
      try {
        //const headers = { jwt_token: localStorage.token }
        const res = await DataServer.post("/Home", { jwt_token: localStorage.token });

        const parseData = await res.json();
        setName(parseData.username);
      } catch (err) {
        console.error(err.message);
      }
    };
    */
  
    const setAuth = boolPara => {
      setIsAuthenticated(boolPara);
    };

    {/* muss eine Callbackfunktion sein*/}
    const logout = async (e) => {
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
      checkAuthenticated();
      //getProfile();

      console.log("authenticated", isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
      <div className="">
    <AppContextProvider>
    <Router>
      <Sidebar logout={logout}/>
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
              path="/CookiePolicy"
              component={CookiePolicy}
            />
            <Route
              exact
              path="/events"
              component={Events}
            />
            <Route
              exact
              path="/user/:userid"
              component={MeinProfil}
            />
            <Route
              exact
              path="/postupload"
              component={PostUpload}
              render={props =>
              
                <PostUpload isAuthenticated={isAuthenticated}
                /> 
            }
            />
            <Route
              exact
              path="/post/:postid"
              component={Post}
            />
            <Route
              exact
              path="/login"
              render={props =>
              
                  <Login {...props} setAuth={setAuth} /> 
              }

            />
            <Route
              exact
              path="/register"
              render={props =>
          
                  <Register {...props} setAuth={setAuth} />
                
              }
            />
          </Switch>
        </Router>
        </AppContextProvider>
        
        <Footer/>
        <Banner/>
            
      </div>
      
  );
};

export default App;
