import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Footer from './components/Footer';
import Sidebar from "./components/Sidebar";



const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
        <Sidebar/>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/restaurants/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/restaurants/:id"
              component={RestaurantDetailPage}
            />
          </Switch>
        </Router>
        <Footer/>
        

      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
