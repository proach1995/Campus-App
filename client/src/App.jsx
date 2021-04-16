import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Footer from './components/navigation/Footer';
import NavigationBars from "./components/navigation/NavigationBars";
import PostUpload from "./routes/PostUpload";
import PostDetail from "./routes/PostDetail";
<<<<<<< Updated upstream
=======
import Marktplatz from "./routes/Marktplatz";
import Events from "./routes/Events";
import MeinProfil from "./routes/MeinProfil";
import Sidebar from "./components/navigation/Sidebar";
import NavbarTop from "./components/navigation/NavbarTop";
import MeinePosts from "./routes/MeinePosts";
import Einstellungen from "./routes/Einstellungen";
import Login from "./routes/Login";
import Register from "./routes/Register";


>>>>>>> Stashed changes




const App = () => {
  return (
      <div className="">
        <Router>
        <NavigationBars/>
          <Switch>
            <Route exact path="/" component={Home} />
            
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
<<<<<<< Updated upstream
=======
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
            
            
>>>>>>> Stashed changes
            
          </Switch>
        </Router>
        <Footer/>
        

      </div>
  );
};

export default App;
