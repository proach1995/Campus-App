import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {useState, useEffect } from "react";
import getProducts from "../api/getProducts";



const PostUpload = () => {

  const [title, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPricetype] = useState("VHB");
  const [description, setDescription] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getProducts.post("/", {
        title,
        price,
        priceType,
        description,

      });
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (

    <Container className="routeContainer">

      <h1>Anzeige erstellen</h1>

      <Form>
          <Form.Check inline label="Angebot" type="radio" id="radio" />
          <Form.Check inline label="Gesuch" type="radio" id="radio" />
        <Form.Group  controlId="formGridEmail">
          <Form.Label value={title}/>
          <Form.Control type="email" placeholder="Titel" />
        </Form.Group>
      <Form.Group controlId="formGridAddress1">
      <Form.Label>Kategorie</Form.Label>
          <Form.Control as="select" defaultValue="Kategorie">
            <option>Marktplatz</option>
            <option>Events</option>
          </Form.Control>
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label value={price}/>
          <Form.Control />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label vlaue={priceType}/>
              <Form.Control as="select" defaultValue="Festpreis">
                <option>Festpreis</option>
                <option>VHB</option>
              </Form.Control>
        </Form.Group>    
      </Form.Row>

      <Form.Group  controlId="formGridEmail">
          <Form.Label vlaue={description}/>
          <Form.Control type="email" placeholder="Beschreibung" />
        </Form.Group>


      <Button onClick={handleSubmit} className="button" variant="primary" type="submit">
        Submit
      </Button>
</Form>

</Container>
  );
};

export default PostUpload;
