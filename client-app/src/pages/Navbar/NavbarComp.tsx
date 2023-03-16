import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_actions/user_action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AlertModal from "../../components/containers/AlertModal/AlertModal";
import { GiMagicLamp, GiRoad } from "react-icons/gi";
import { BiUser, BiMapPin, BiMale } from "react-icons/bi";
import * as S from "./NavbarComp.style";

interface Props {
  menu: number;
  history: RouteComponentProps["history"];
}

function NavbarComp({ menu, history }: Props): React.ReactElement {
  const selectedMenu = menu ?? 0;

  const userId = window.sessionStorage.getItem("userId");
  const [openState, setOpenState] = useState(false);
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch<any>();

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        window.sessionStorage.clear();
        history.push("/loginSignup");
      } else {
        setAlertToggle(true);
        setAlertMessage("로그아웃에 실패했습니다");
      }
    });
  };

  return (
    <>
      <S.TopNav>
        <Link
          to={{ pathname: "/main", state: { userId, menu: 0 }}}
          style={{ textDecoration: "none" }}
        >
          <S.Home>푸드마커</S.Home>
        </Link>
        <Link
          to={{ pathname: "/current-location", state: { userId, menu: 1 }}}
          style={{ textDecoration: "none" }}>
          <S.Menu color={`${selectedMenu === 1}`}>
            <BiMapPin />현재 주변 맛집
          </S.Menu>
        </Link>
        <Link
          to={{ pathname: "/marker", state: { userId, menu: 2 }}}
          style={{ textDecoration: "none" }}>
          <S.Menu color={`${selectedMenu === 2}`}>
            <BiUser />나의 맛집
          </S.Menu>
        </Link>
        <Link
          to={{ pathname: "/wish", state: { userId, menu: 3 }}}
          style={{ textDecoration: "none" }}>
          <S.Menu color={`${selectedMenu === 3}`}>
            <GiMagicLamp />위시 맛집
          </S.Menu>
        </Link>
        <Link
          to={{ pathname: "/choizaroad", state: { userId, menu: 4 }}}
          style={{ textDecoration: "none" }}>
          <S.Menu color={`${selectedMenu === 4}`}>
            <GiRoad />최자 로드
          </S.Menu>
        </Link>
        <S.Icon>
          <FontAwesomeIcon icon={faBars} onClick={() => setOpenState(!openState)}/>
        </S.Icon>
        <S.RightMenuDiv>
          <Link
            to={{ pathname: "/my-info", state: { userId, menu: 5 }}}
            style={{ textDecoration: "none" }}>
            <S.RightMenuSpan marginRight={'20px'} hoverColor={'#ff6700'}>
              <BiMale />내 정보
            </S.RightMenuSpan>
          </Link>
          <S.RightMenuSpan color={'red'} onClick={onClickHandler}>로그아웃</S.RightMenuSpan>
        </S.RightMenuDiv>
      </S.TopNav>
      {
        openState ? (
          <>
            <Link
              to={{ pathname: "/current-location", state: { userId, menu: 1 }}}
              style={{ textDecoration: "none" }}>
              <S.DownMenu color={`${selectedMenu === 1}`}>
                <BiMapPin />현재 주변 맛집
              </S.DownMenu>
            </Link>
            <Link
              to={{ pathname: "/marker", state: { userId, menu: 2 }}}
              style={{ textDecoration: "none" }}>
              <S.DownMenu color={`${selectedMenu === 2}`}>
                <BiUser />나의 맛집
              </S.DownMenu>
            </Link>
            <Link
              to={{ pathname: "/wish", state: { userId, menu: 3 }}}
              style={{ textDecoration: "none" }}>
              <S.DownMenu color={`${selectedMenu === 3}`}>
                <GiMagicLamp />위시 맛집
              </S.DownMenu>
            </Link>
            <Link
              to={{ pathname: "/choizaroad", state: { userId, menu: 4 }}}
              style={{ textDecoration: "none" }}>
              <S.DownMenu color={`${selectedMenu === 4}`}>
                <GiRoad />최자 로드
              </S.DownMenu>
            </Link>
            <Link
              to={{ pathname: "/my-info", state: { userId, menu: 5 }}}
              style={{ textDecoration: "none" }}>
              <S.DownMenu color={`${selectedMenu === 5}`}>
                <BiMale />내 정보
              </S.DownMenu>
            </Link>
            <S.DownRightMenuDiv>
              <S.RightMenuSpan color={'red'} onClick={onClickHandler}>로그아웃</S.RightMenuSpan>
            </S.DownRightMenuDiv>
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
