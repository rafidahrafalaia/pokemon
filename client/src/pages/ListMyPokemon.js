import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { MyPokemon } from "../components";
import swal from "sweetalert";
import { API_URL_RELEASE, API_URL_RENAME,API_URL_GET_ALL } from "../utils/constants";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function ListMyPokemon () {
  const [pageNumber, setPageNumber] = useState(0);
  const [myListPokemon, setMyPokemon] = useState([]);

  const getPokemon = (url) => {
    axios
      .get(url)
      .then((res) => {
        setMyPokemon(res.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
    }

  useEffect(() => {
    getPokemon(API_URL_GET_ALL);
  }, []);

  const released = (value) => {
    axios
      .post(API_URL_RELEASE,{ id: value.id } )
      .then((res) => {
        if(res.data){
          swal({
            title: "Release Success",
            text: value.nickname + " released",
            icon: "success",
            button: false,
            timer: 1500,
          })
        }
        else{
          swal({
            title: "Release Failed",
            text: value.nickname + " failed to be release",
            icon: "error",
            button: false,
            timer: 1500,
          })
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
    };

    const renamed = (value) => {
      axios
        .put(API_URL_RENAME,{id: value.id})
        .then((res) => {
          if(res.data){
            swal({
              title: "rename success",
              text: value.name + " has been renamed",
              icon: "success",
              button: false,
              timer: 2800,
            });
          }
          else{
            swal({
              title: "rename Failed",
              text: value.name + " failed to be renamed :(",
              icon: "error",
              button: false,
              timer: 2800,
            });
          }
        })
        .catch((error) => {
          console.log("Error yaa ", error);
        });
    };
  const pokemonPerPage = 9;
  const pagesVisited = pageNumber * pokemonPerPage;  

  const displaylistPokemon = myListPokemon
    .slice(pagesVisited, pagesVisited + pokemonPerPage)
    .map((pokemon) => {
        return ( 
        <MyPokemon
          key={pokemon.name}
          pokemon={pokemon}
          released={released}
          renamed={renamed}
        />
        );
      });

  const pageCount = Math.ceil(myListPokemon.length / pokemonPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

    return (
      <div className="MyPokemon">
          <Container fluid>
          <Row className="overflow-auto menu">
            {displaylistPokemon}
          </Row>
          </Container>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
      <div className="mt-4 text-center">
        </div>
      </div>
    );
}
