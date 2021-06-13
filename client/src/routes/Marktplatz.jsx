import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Dropdown from "react-bootstrap/Dropdown";
import DataServer from "../api/DataServer";
import Button from "react-bootstrap/Button";
import Filterbar from "../components/navigation/Filterbar"




const Marktplatz = () => {

  const [offerings, setOfferings] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const toggleFilter=(e)=>{
    e.preventDefault();
    console.log("Filter: ", isActive);
    setIsActive(prevState => !prevState);
  }

  const getOffers = async () => {
    try {
      //console.log("getPosts wird ausgeführt");
      const resOfferings = await DataServer.post("Marktplatz", {jwt_token:localStorage.token,
                                                                      offerType:"latest"});
      
      //console.log("fetching from offer");
      //console.log(resOfferings.data);
      setOfferings(resOfferings.data.offeringList.offer);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getFilteredOffers = async(jsonFile) =>{
    jsonFile = ({...jsonFile,jwt_token:localStorage.token });
    console.log(jsonFile);
    const resOfferings = await DataServer.post("/Marktplatz", jsonFile)
    console.log("filtered", resOfferings);
    setOfferings(resOfferings.data.offeringList.offer);

  }

  useEffect(() => {
    console.log("getPosts wird ausgeführt im UseEffekt")
    getOffers();
  }, []);
  // eslint-disable-next-line no-lone-blocks
  

  return (
    <Container className="routeContainer">
      
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1> Marktplatz </h1>
        <p>Hier finden sie alle Posts aus den Kategorien An- und Verkauf, Verleihen sowie Verschenken am Campus Zweibrücken.</p>
  
            <Button variant="success" onClick={(e)=>{toggleFilter(e)}}>Filter</Button>
          
        {isActive === true &&
        <Filterbar toggleFilter={toggleFilter} isActive={isActive}
                    getFilteredOffers={getFilteredOffers}/>
        }
            
        <div className="buttonBackground" >
          <h2>Alle Posts</h2>
        </div>
            {offerings !==null && (
              <>
            <PostsRow postElement={offerings}/>  
            </>
            )}
    </Container>
  );
};

export default Marktplatz;