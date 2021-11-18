import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Button, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL_DETAIL, API_URL_IMAGE, API_URL_CATCH } from "../utils/constants";

export default function Detail (props) {
  const [detailPokemon, setdetailPokemon] = useState({});
  const [abilities, setAbility] = useState([]);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
  const name = props.match.params.name;
    axios
      .get(API_URL_DETAIL+name)
      .then((res) => {
        setdetailPokemon(res.data);
        setAbility(res.data.abilities.map((a, index) => index!==0? ", " + a.ability.name : a.ability.name));
        setMoves(res.data.moves.map((a, index) => index!==0? ", " + a.move.name : a.move.name));
        setTypes(res.data.types.map((a, index) => index!==0? ", " + a.type.name : a.type.name));
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  });
  
  const catched = (value) => {
    axios
      .get(API_URL_CATCH)
      .then((res) => {
        console.log(res.data);
        if(res.data){
          swal({
            title: "Catch Success",
            text: value.name + " has been catched!! fill in the column if you eeant to give it a nickname",
            icon: "success",
            content: "input",
            button: {
              text: "Add to my pokemon",
              closeModal: false,
            },
          }).then(nickname => {
            swal.close();
            return axios
            .post(API_URL_CATCH,{
                pokemon_id: value.id,
              	name:value.name,
                nickname,
              	image: API_URL_IMAGE+value.id,
              	weight: value.weight,
              	height: value.height,
              	abilities, 
              	types
            })
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
            // .then(result => {
            //   swal({
            //     title: "SUCCESS",
            //     text: "nickname has been successfully given",
            //   });
            // })
        }
        else{
          swal({
            title: "Catch Failed",
            text: value.name + " failed to be cathced",
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
    return (
      <div className="mt-4 text-center">
        <Image src={ API_URL_IMAGE+detailPokemon.id+'.png' }  width="300" />
        <Container md={100} xl={100}>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row" width="500">Name</th>
                    <td>{detailPokemon.name}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="500">Abilities</th>
                    <td>{abilities}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="500">Moves</th>
                    <td>{moves}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="500">Types</th>
                    <td>{types}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="500">Height</th>
                    <td>{detailPokemon.height}</td>
                  </tr>
                  <tr>
                    <th scope="row">Weight</th>
                    <td>{detailPokemon.weight}</td>
                  </tr>
                </tbody>
              </table>
             <Button variant="danger" onClick={() => catched(detailPokemon)} >Catch!</Button>
          </Container>
      <div className="mt-4 text-center">
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button></div>
      </div>
    );
  }
