import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  float: left;
  margin: 0 0 3em 0;
  padding: 0;
  list-style: none;
`;

const Li = styled.li`
  float: left;
`;

const Atag = styled.a`
  display: block;
  padding: 8px 15px;
  text-decoration: none;
  font-weight: bold;
  color: #069;
  border-right: 1px solid #ccc;
`;

const Navbar = () => {
  return (
    <div>
      <Nav id="nav">
        <Li>
          <Atag href="#">Home</Atag>
        </Li>
        <Li>
          <Atag href="#">About</Atag>
        </Li>
        <Li>
          <Atag href="#">FAQ</Atag>
        </Li>
        <Li>
          <Atag href="#">Contact</Atag>
        </Li>
      </Nav>
    </div>
  );
};

export default Navbar;
