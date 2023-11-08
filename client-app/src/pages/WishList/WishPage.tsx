import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Enroll from '../MarkerPage/Enroll';
import WishList from './WishList';
import NavbarComp from '../Navbar/Navbar';
import Footer from '../../components/containers/Footer/Footer';
import { Button } from 'react-bootstrap';
import { NavMenuType } from '../../library/def';
import * as S from './WishPage.style';

interface Props {
  history: RouteComponentProps['history'];
}

function WishPage({ history }: Props): React.ReactElement {
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState('위시 맛집 등록하기');

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === '위시 맛집 등록하기') {
      setMenu('위시 맛집 목록으로');
    } else {
      setMenu('위시 맛집 등록하기');
    }
  };

  let MenuComponent: React.ReactElement;
  if (Toggle) {
    MenuComponent = <WishList />;
  } else {
    MenuComponent = <Enroll parentCompName={'WishPage'} setToggle={setToggle} setMenu={setMenu} />;
  }

  return (
    <S.MainDiv>
      <NavbarComp history={history} menu={NavMenuType.Wish} />
      <hr />
      <div>
        <Button variant='success' onClick={onClickChangeMenuHandler} style={{ margin: '20px' }}>
          {Menu}
        </Button>
      </div>
      <hr />
      {MenuComponent}
      <Footer marginTop={5} />
    </S.MainDiv>
  );
}

export default withRouter(WishPage);
