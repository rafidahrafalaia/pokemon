import React, { useState, useEffect } from "react";
import { Row, Container, Button } from "react-bootstrap";
import { Pokemon } from "../components";
import { API_URL_GET, API_URL_DETAIL } from "../utils/constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Home () {
  let history = useHistory();
  const [listPokemon, setlistPokemon] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  
  const pokemonPerPage = 9;
  const pagesVisited = pageNumber * pokemonPerPage;  
  
  const getPokemon = (url) => {
    axios
      .get(url)
      .then((res) => {
        setlistPokemon(res.data.results);
      })
      .catch((error) => {
        throw new Error(error);
      });
    }
  useEffect(() => {
    getPokemon(API_URL_GET+'limit='+pokemonPerPage+'&offset=0');
  }, []);

  const next = () => {
    setPageNumber(pageNumber+1);
    getPokemon(API_URL_GET+'limit='+pokemonPerPage+'&offset='+pagesVisited)
  };
    
  const previous = () => {
    setPageNumber(pageNumber-1);
    getPokemon(API_URL_GET+'limit='+pokemonPerPage+'&offset='+pagesVisited)
  };
    
  const detail = (value) => {
    history.push('/detail/'+value.name);
  }

  const displaylistPokemon = listPokemon
    .map((pokemon) => {    
        return ( 
        <Pokemon
          key={pokemon.name}
          pokemon={pokemon}
          url={pokemon.url.split(API_URL_DETAIL)[1]}
          detail={detail}
        />
        );
      });

    return (
      <div className="Home">
          <Container fluid>
          <Row className="overflow-auto menu">
            {displaylistPokemon}
          </Row>
      {/* <Container > */}
      {/* </Container> */}
          </Container>
          {/* <div className="mt-4 text-center">
            </div> */}
      <div className="mt-4 text-center">
        <Button variant="primary" onClick={() => previous()} >  Previous </Button>
        <Button variant="primary" onClick={() => next()} >Next</Button>
        </div>
      </div>
    );
}
