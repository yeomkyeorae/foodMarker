import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AlertModal from "../../containers/AlertModal/AlertModal";


const TopNav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

const Home = styled.div`
  height: 100%;
  width: 200px;
  color: #ff6700;
  &:hover {
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
  color: ${props => (props.color === "true" ? "#ff6700" : "black")};
  &:hover {
    color: #ff6700;
    text-decoration: none;
    font-weight: bold;
  }
  font-weight: 200;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const DownMenu = styled.div`
  height: 3vh;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: ${props => (props.color === "true" ? "#4caf50" : "black")};
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
  font-weight: 200;
  /* border: 1px solid black; */
  margin-bottom: 1px;
`;

const Icon = styled.div`
  margin-left: auto;
  width: 10vw;
  cursor: pointer;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

const LogoutDiv = styled.div`
  cursor: pointer;
  width: 10rem;
  margin-left: auto;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const DownLogoutDiv = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
`;

const LogoutSpan = styled.span`
  color: red;
  &:hover {
    font-weight: bold;
  }
`;

function NavbarComp(props) {
  const menu = props.history.location.menu;
  const selectedMenu = menu ? menu : 0;
  const userId = window.sessionStorage.getItem("userId");
  const [ openState, setOpenState ] = useState(false);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        window.sessionStorage.clear();
        props.history.push("/loginSignup");
      } else {
        setAlertToggle(true);
        setAlertMessage("로그아웃에 실패했습니다");
      }
    });
  };

  return (
    <>
      <TopNav openState={`${openState}`}>
        <Link
          to={{ pathname: "/main", state: userId, menu: 0 }}
          style={{ textDecoration: "none" }}
        >
          <Home>푸드마커</Home>
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
            <FontAwesomeIcon icon={faBars} onClick={() => setOpenState(!openState)}/>
          </Icon>
        <LogoutDiv onClick={onClickHandler}>
          <LogoutSpan>로그아웃</LogoutSpan>
        </LogoutDiv>
      </TopNav>
      {
        openState ? (
          <>
            <Link
            to={{ pathname: "/current-location", state: userId, menu: 1 }}
            style={{ textDecoration: "none" }}>
            <DownMenu color={`${selectedMenu === 1}`}>
              현재 주변 맛집
            </DownMenu>
          </Link>
          <Link
            to={{ pathname: "/marker", state: userId, menu: 2 }}
            style={{ textDecoration: "none" }}>
            <DownMenu color={`${selectedMenu === 2}`}>
              나의 맛집
            </DownMenu>
          </Link>
          <Link
            to={{ pathname: "/wish", state: userId, menu: 3 }}
            style={{ textDecoration: "none" }}>
            <DownMenu color={`${selectedMenu === 3}`}>
              위시 맛집
            </DownMenu>
          </Link>
          <Link
            to={{ pathname: "/choizaroad", state: userId, menu: 4 }}
            style={{ textDecoration: "none" }}>
            <DownMenu color={`${selectedMenu === 4}`}>
              최자 로드
            </DownMenu>
          </Link>
          <DownLogoutDiv onClick={onClickHandler}>
            <LogoutSpan>로그아웃</LogoutSpan>
          </DownLogoutDiv>
        </>
        ) : null
      }
      {
        alertToggle ?
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
        null
      }
    </>
  );
}

export default NavbarComp;
