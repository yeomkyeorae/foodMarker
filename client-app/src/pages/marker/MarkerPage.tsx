import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import Enroll from './Enroll';
import NavbarComp from '../navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Button } from 'react-bootstrap';
import { NavMenuType } from '../../library/def';

interface Props {
  history: RouteComponentProps['history'];
}

function MarkerPage({ history }: Props): React.ReactElement {
  const [Toggle, setToggle] = useState(true);
  const [Menu, setMenu] = useState('나의 맛집 등록하기');

  const onClickChangeMenuHandler = () => {
    setToggle(!Toggle);
    if (Menu === '나의 맛집 등록하기') {
      setMenu('나의 맛집 목록으로');
    } else {
      setMenu('나의 맛집 등록하기');
    }
  };

  let MenuComponent: React.ReactElement;
  if (Toggle) {
    MenuComponent = <RestaurantList />;
  } else {
    MenuComponent = <Enroll parentCompName={'MarkerPage'} setToggle={setToggle} setMenu={setMenu} />;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '0px',
        right: '0px',
        overflow: 'auto',
      }}
    >
      <NavbarComp history={history} menu={NavMenuType.Marker} />
      <hr />
      <div>
        <Button variant='primary' onClick={onClickChangeMenuHandler} style={{ margin: '20px' }}>
          {Menu}
        </Button>
      </div>
      <hr />
      {MenuComponent}
      <Footer />
    </div>
  );
}

export default withRouter(MarkerPage);
