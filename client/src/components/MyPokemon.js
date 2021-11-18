import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import { API_URL_IMAGE } from "../utils/constants";

const MyPokemon = ({ pokemon, released, renamed }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" >
        <Card.Img
          variant="top"
          src={
            API_URL_IMAGE+pokemon.pokemon_id+'.png'
          }
        />
        <Card.Body>
          <Card.Title>{pokemon.nickname} ({pokemon.name})</Card.Title>
          <Link className="btn-item auction-btn mr-2" onClick={() => released(pokemon)}><Button>Release</Button></Link>
          <Link className="btn-item auction-btn mr-2" onClick={() => renamed(pokemon)}><Button>Rename</Button></Link>
          <Link className="btn-item auction-btn mr-2" to={`/detail/${pokemon.name.split('-')[0]}`}><Button>Detail</Button></Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyPokemon;
