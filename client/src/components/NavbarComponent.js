import React from "react";
import {Nav, Navbar, Container } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
      <Navbar.Brand href="#home"><strong>POKEMON</strong> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Pokemon List</Nav.Link>
          <Nav.Link href="MyPokemon">My Pokemon</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
