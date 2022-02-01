import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AlertModal from "../../containers/AlertModal/AlertModal";
import { GiMagicLamp, GiRoad } from "react-icons/gi";
import { BiUser, BiMapPin, BiMale } from "react-icons/bi";


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
  color: ${props => (props.color === "true" ? "#ff6700" : "black")};
  &:hover {
    color: #ff6700;
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

const RightMenuDiv = styled.div`
  cursor: pointer;
  width: 10rem;
  margin-left: auto;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const DownRightMenuDiv = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
`;

const RightMenuSpan = styled.span`
  color: ${props => props.color ?? 'black'};
  margin-right: ${props => props.marginRight ?? '0px'};
  &:hover {
    color: ${props => props.hoverColor ?? null};
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
      <TopNav>
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
            <BiMapPin />현재 주변 맛집
          </Menu>
        </Link>
        <Link
          to={{ pathname: "/marker", state: userId, menu: 2 }}
          style={{ textDecoration: "none" }}>
          <Menu color={`${selectedMenu === 2}`}>
            <BiUser />나의 맛집
          </Menu>
        </Link>
        <Link
          to={{ pathname: "/wish", state: userId, menu: 3 }}
          style={{ textDecoration: "none" }}>
          <Menu color={`${selectedMenu === 3}`}>
            <GiMagicLamp />위시 맛집
          </Menu>
        </Link>
        <Link
          to={{ pathname: "/choizaroad", state: userId, menu: 4 }}
          style={{ textDecoration: "none" }}>
          <Menu color={`${selectedMenu === 4}`}>
            <GiRoad />최자 로드
          </Menu>
        </Link>
        <Icon>
          <FontAwesomeIcon icon={faBars} onClick={() => setOpenState(!openState)}/>
        </Icon>
        <RightMenuDiv>
          <Link
            to={{ pathname: "/my-info", state: userId, menu: 5 }}
            style={{ textDecoration: "none" }}>
            <RightMenuSpan marginRight={'20px'} hoverColor={'#ff6700'}>
              <BiMale />내 정보
            </RightMenuSpan>
          </Link>
          <RightMenuSpan color={'red'} onClick={onClickHandler}>로그아웃</RightMenuSpan>
        </RightMenuDiv>
      </TopNav>
      {
        openState ? (
          <>
            <Link
              to={{ pathname: "/current-location", state: userId, menu: 1 }}
              style={{ textDecoration: "none" }}>
              <DownMenu color={`${selectedMenu === 1}`}>
                <BiMapPin />현재 주변 맛집
              </DownMenu>
            </Link>
            <Link
              to={{ pathname: "/marker", state: userId, menu: 2 }}
              style={{ textDecoration: "none" }}>
              <DownMenu color={`${selectedMenu === 2}`}>
                <BiUser />나의 맛집
              </DownMenu>
            </Link>
            <Link
              to={{ pathname: "/wish", state: userId, menu: 3 }}
              style={{ textDecoration: "none" }}>
              <DownMenu color={`${selectedMenu === 3}`}>
                <GiMagicLamp />위시 맛집
              </DownMenu>
            </Link>
            <Link
              to={{ pathname: "/choizaroad", state: userId, menu: 4 }}
              style={{ textDecoration: "none" }}>
              <DownMenu color={`${selectedMenu === 4}`}>
                <GiRoad />최자 로드
              </DownMenu>
            </Link>
            <Link
              to={{ pathname: "/my-info", state: userId, menu: 5 }}
              style={{ textDecoration: "none" }}>
              <DownMenu color={`${selectedMenu === 5}`}>
                <BiMale />내 정보
              </DownMenu>
            </Link>
            <DownRightMenuDiv>
              <RightMenuSpan color={'red'} onClick={onClickHandler}>로그아웃</RightMenuSpan>
            </DownRightMenuDiv>
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
