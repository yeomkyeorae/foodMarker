import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopNav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

const Home = styled.div`
  height: 100%;
  width: 200px;
  color: #c1e8c2;
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
  font-size: 2rem;
  font-weight: 500;
`;

const Menu = styled.div`
  height: 100%;
  width: 10vw;
  text-align: center;
  text-decoration: none;
  color: ${props => (props.color === "true" ? "#4caf50" : "black")};
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
  font-weight: 200;
`;

const Icon = styled.div`
  width: 10vw;
`;

const LogoutDiv = styled.div`
  cursor: pointer;
  width: 10rem;
  margin-left: auto;
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
    <TopNav>
      <Link
        to={{ pathname: "/main", state: userId, menu: 0 }}
        style={{ textDecoration: "none" }}
      >
        <Home>Food Marker</Home>
      </Link>
      <Link
        to={{ pathname: "/current-location", state: userId, menu: 1 }}
        style={{ textDecoration: "none" }}>
        <Menu color={`${selectedMenu === 1}`}>
          현재 주변 맛집
        </Menu>
      </Link>
      <Link
        to={{ pathname: "/marker", state: userId, menu: 2 }}
        style={{ textDecoration: "none" }}>
        <Menu color={`${selectedMenu === 2}`}>
          나의 맛집
        </Menu>
      </Link>
      <Link
        to={{ pathname: "/wish", state: userId, menu: 3 }}
        style={{ textDecoration: "none" }}>
        <Menu color={`${selectedMenu === 3}`}>
          위시 맛집
        </Menu>
      </Link>
      <Link
        to={{ pathname: "/choizaroad", state: userId, menu: 4 }}
        style={{ textDecoration: "none" }}>
        <Menu color={`${selectedMenu === 4}`}>
          최자 로드
        </Menu>
      </Link>
        <Icon>
          <FontAwesomeIcon icon={faBars} />
        </Icon>
      <LogoutDiv onClick={onClickHandler}>
        <span style={{ color: "red" }}>로그아웃</span>
      </LogoutDiv>
    </TopNav>
  );
}

export default NavbarComp;
