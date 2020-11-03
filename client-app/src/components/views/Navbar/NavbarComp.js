import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";

const NavDiv = styled.div`
  color: white;
  font-size: 1rem;
  margin: 10px;
`;

function NavbarComp(props) {
  const userId = props.userId;

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/" style={{ color: "skyblue" }}>
        Food Marker
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to={{ pathname: "/main", state: userId }}>
          <NavDiv>My Restaurants</NavDiv>
        </Link>
        <Link to={{ pathname: "/wish", state: userId }}>
          <NavDiv>Wish Retaurants</NavDiv>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;