import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavbarComp(props) {
  console.log("Nav props: ", props);
  const userId = props.userId;
  // const onClickHandler = () => {
  //   props.history.push({
  //     pathname: "/wish",
  //     state: props.userId
  //   });
  // };

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Food Marker</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="/main">My Restaurants</Nav.Link>
        <Nav.Link href="/wish">Wish List</Nav.Link> */}
        <Link to={{ pathname: "/main", state: userId }}>main</Link>
        <Link to={{ pathname: "/wish", state: userId }}>wish</Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComp;
