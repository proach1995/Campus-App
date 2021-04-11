import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Footer from './components/navigation/Footer';
import PostUpload from "./routes/PostUpload";
import PostDetail from "./routes/PostDetail";
import Marktplatz from "./routes/Marktplatz";
import Events from "./routes/Events";
import MeinProfil from "./routes/MeinProfil";
import Sidebar from "./components/navigation/Sidebar";
import NavbarTop from "./components/navigation/NavbarTop";
import MeinePosts from "./routes/MeinePosts";
import Einstellungen from "./routes/Einstellungen";




const App = () => {
  return (
      <div className="">
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
              component={PostUpload}
            />
            
            <Route
              exact
              path="/postdetail"
              component={PostDetail}
            />
            <Route
              exact
              path="/meineposts"
              component={MeinePosts}
            />
            <Route
              exact
              path="/einstellungen"
              component={Einstellungen}
            />
            
          </Switch>
        </Router>
        <Footer/>
        

      </div>
  );
};

export default App;
