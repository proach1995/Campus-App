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
import Banner from "./routes/Banner";
import { AppContextProvider } from "./context/AppContext";
import NotFound from "./routes/NotFound";



const App = () => {


  
  

  return (
      <div className="">
    <AppContextProvider>
    <Router>
      <Sidebar/>
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
            />
            <Route
              exact
              path="/post/:postid"
              component={Post}
            />
            <Route
              exact
              path="/login"
              component={Login}
            />
            <Route
              exact
              path="/register"
              component={Register}          
            />
            <Route path="/404" component={NotFound} />
              <Redirect to="/" />
          </Switch>
        </Router>
        </AppContextProvider>
        
        <Footer/>
        <Banner/>
            
      </div>
      
  );
};

export default App;
