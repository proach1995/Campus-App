import React from "react";
import Container from "react-bootstrap/Container";
import PostsRow from "../components/Content/PostsRow";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";



const Marktplatz = () => {

  const data = [
    {
      title: 'Ersti',
      imagesrc: './490.jpg',
      url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  {
    title: 'Ersti',
    imagesrc: './490.jpg',
    url: '/meineposts'
  },
  
  ];


  return (
    <Container className="routeContainer">
      
      {/* https://dowjones.github.io/react-dropdown-tree-select/#/story/with-bootstrap-styles */}
        <h1>Willkommen zum Marktplatz der Hochschule Kaiserslautern</h1>
  
  
            <Dropdown >
              <Dropdown.Toggle className="color dropdown-btn"  id="dropdown-basic">
              Kategorien
              </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Bücher</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Veranstaltungen</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">Etwas Posten</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
       
       
      <PostsRow data={data}/>
    </Container>
  );
};

export default Marktplatz;