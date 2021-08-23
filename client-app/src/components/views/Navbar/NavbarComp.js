import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";

const H2 = styled.h2`
  color: #c1e8c2;
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
  color: ${props => (props.color ? props.color : "black")};
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
  const menu = props.history.location.menu;
  const selectedMenu = menu ? menu : 0;
  const userId = window.sessionStorage.getItem("userId");
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        window.sessionStorage.clear();
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
          to={{ pathname: "/main", state: userId, menu: 0 }}
          style={{ textDecoration: "none" }}
        >
          <H2>Food Marker</H2>
        </Link>
      </div>
      <div style={{ display: "inline-block" }}>
        <Div>
          <Link
            to={{ pathname: "/current-location", state: userId, menu: 1 }}
            style={{ textDecoration: "none" }}
          >
            <Span color={selectedMenu === 1 ? "#4caf50" : "black"}>
              현재 주변 맛집
            </Span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/marker", state: userId, menu: 2 }}
            style={{ textDecoration: "none" }}
          >
            <Span color={selectedMenu === 2 ? "#4caf50" : "black"}>
              나의 맛집
            </Span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/wish", state: userId, menu: 3 }}
            style={{
              textDecoration: "none",
              color: "red"
            }}
          >
            <Span color={selectedMenu === 3 ? "#4caf50" : "black"}>
              위시 맛집
            </Span>
          </Link>
        </Div>
        <Div>
          <Link
            to={{ pathname: "/choizaroad", state: userId, menu: 4 }}
            style={{
              textDecoration: "none",
              color: "red"
            }}
          >
            <Span color={selectedMenu === 4 ? "#4caf50" : "black"}>
              최자 로드
            </Span>
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
