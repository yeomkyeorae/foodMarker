import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";

const H2 = styled.h2`
  color: black;
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
  font-weight: 500;
`;

const Div = styled.div`
  display: inline-block;
  width: 10rem;
`;

const Span = styled.span`
  color: black;
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
  font-weight: 200;
`;

const LogoutDiv = styled.div`
  width: 10rem;
  float: right;
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
    <div style={{ height: "50px" }}>
      <div
        href="/"
        style={{
          color: "skyblue",
          display: "inline-block",
          float: "left",
          paddingLeft: "50px"
        }}
      >
        <Link
          to={{ pathname: "/main", state: userId }}
          style={{ textDecoration: "none" }}
        >
          <H2>Food Marker</H2>
        </Link>
      </div>
      <div style={{ display: "inline-block" }}>
        <Div>
          <Link
            to={{ pathname: "/marker", state: userId }}
            style={{ textDecoration: "none" }}
          >
            <Span>나의 맛집</Span>
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
            <Span>위시 맛집</Span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/choizaroad", state: userId }}
            style={{
              textDecoration: "none",
              color: "red"
            }}
          >
            <Span>최자 로드</Span>
          </Link>
        </Div>
      </div>
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
  );
}

export default NavbarComp;
