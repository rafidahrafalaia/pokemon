import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import { API_URL_IMAGE } from "../utils/constants";

const Pokemon = ({ pokemon, url }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" >
        <Card.Img
          variant="top"
          src={
            API_URL_IMAGE+url.slice(0, -1)+'.png'
          }
        />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <Link className="btn-item auction-btn mr-2" to={`/detail/${pokemon.name}`}><Button>Detail</Button></Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Pokemon;
