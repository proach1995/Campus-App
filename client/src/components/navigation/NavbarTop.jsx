import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import './NavbarTop.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHistory, Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import DataServer from "../../api/DataServer";



const NavbarTop = ({setResults}) => {

  let history = useHistory();
  const [searchedTitel, setSearchedTitel] = useState("");
  
  const menuHandler =(e)=>{
    e.preventDefault();
    console.log("navbar");
    console.log(e.target.name);
    
    if(e.target.name ==="marktplatz"){
      history.push("/marktplatz");
    }
    
    if(e.target.name ==="events"){
      history.push("/events");
    }
    
    if(e.target.name ==="postUpload"){
      history.push("/postupload");
    }
  }

  const searchPosts = async(title)=>{
    const resOfferings = await DataServer.post("/Home/Offerings", {
      jwt_token:localStorage.token,
      type:"searchbar",
      title:title});

      const resEvents = await DataServer.post("/Home/Events", {
        jwt_token:localStorage.token,
        type:"searchbar",
        title:title})
      
      setResults(resOfferings.data.offeringList.offer, resEvents.data.eventList.event)
     
  }
      
  useEffect(()=>{
    
    let title = "%"+searchedTitel+"%";
    if(searchedTitel ==""){
      title ="%";
    }

    searchPosts(title);
  },[searchedTitel] )
  

  return (
    <>

  <Navbar className="navbarStyling" variant="light">  
    <Link to="/" className="branding">Campus<span className="brandingFat">APP</span></Link>
    {/*https://react-bootstrap.github.io/layout/grid/#grid-props 
      Positioning with offset , sm und md
    
    */}
    
  </Navbar>
  <Navbar className="navbarSubline">
    <Row >
      <Col>
        <Dropdown >
            <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
            Kategorien
            </Dropdown.Toggle>
              <Dropdown.Menu onClick={(e)=>{menuHandler(e)}}>
                  <Dropdown.Item name="marktplatz">Marktplatz</Dropdown.Item>
                  <Dropdown.Item name="events">Veranstaltungen</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item name="postUpload">Etwas Posten</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <Form.Label htmlFor="inlineFormInput" srOnly>
          Search
        </Form.Label>
        <Form.Control
          className="mb-2"
          id="inlineFormInput"
          placeholder="Search"
          onChange={(e)=>{setSearchedTitel(e.target.value);}}
        />
      </Col>
    </Row>
  </Navbar>

</>
  );
};

export default NavbarTop;