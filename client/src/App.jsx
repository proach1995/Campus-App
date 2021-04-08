import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Footer from './components/Footer';
import NavigationBars from "./components/NavigationBars";




const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="">
        <Router>
        <NavigationBars/>
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
