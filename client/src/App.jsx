import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Footer from './components/navigation/Footer';
import NavigationBars from "./components/navigation/NavigationBars";
import PostUpload from "./routes/PostUpload";
import PostDetail from "./routes/PostDetail";




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
            
          </Switch>
        </Router>
        <Footer/>
        

      </div>
  );
};

export default App;
