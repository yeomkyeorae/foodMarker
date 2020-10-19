import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

function NavbarComp() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Food Marker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;
