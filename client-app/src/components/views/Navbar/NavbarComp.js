import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";

const H1 = styled.h1`
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: #cdb891;
`;

const Div = styled.div`
  display: inline-block;
  width: 10rem;
  &:hover {
    text-shadow: -1px 0 #cdb891, 0 1px #cdb891, 1px 0 #cdb891, 0 -1px #cdb891;
    color: white;
  }
`;

const LogoutDiv = styled.div`
  display: inline-block;
  width: 10rem;
  &:hover {
    text-shadow: -0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black;
    color: white;
  }
`;

function NavbarComp(props) {
  const userId = props.userId;
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/loginSignup");
      } else {
        alert("failed to logout");
      }
    });
  };

  return (
    <div>
      <div href="/" style={{ color: "skyblue" }}>
        <Link to={{ pathname: "/main" }} style={{ textDecoration: "none" }}>
          <H1>Food Marker</H1>
        </Link>
      </div>
      <div>
        <Div>
          <Link
            to={{ pathname: "/marker", state: userId }}
            style={{ textDecoration: "none" }}
          >
            <span style={{ color: "black" }}>나의 맛집</span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/wish", state: userId }}
            style={{
              textDecoration: "none",
              color: "red"
            }}
          >
            <span style={{ color: "black" }}>위시 맛집</span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/choizaroad" }}
            style={{
              textDecoration: "none",
              color: "red"
            }}
          >
            <span style={{ color: "black" }}>최자 로드</span>
          </Link>
        </Div>
        <LogoutDiv
          onClick={onClickHandler}
          style={{
            cursor: "pointer",
            display: "inline-block",
            width: "10rem"
          }}
        >
          <span style={{ color: "red" }}>로그아웃</span>
        </LogoutDiv>
      </div>
    </div>
  );
}

export default NavbarComp;
