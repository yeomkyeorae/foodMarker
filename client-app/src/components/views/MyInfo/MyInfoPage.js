import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import styled from "styled-components";

const Div = styled.div`
  display: inline-block;
  width: 10rem;
  &:hover {
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #ff6700;
  }
  cursor: pointer;
`;

function MyInfoPage(props) {
  const userId = props.location.state;

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "hidden"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <Div>내 정보 페이지</Div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MyInfoPage);
