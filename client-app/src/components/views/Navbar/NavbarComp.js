import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavbarComp() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Food Marker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/main">My Restaurants</Nav.Link>
        <Nav.Link href="/wish">Wish List</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;
