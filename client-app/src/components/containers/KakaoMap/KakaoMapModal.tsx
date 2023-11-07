import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import KakaoMap from './KakaoMap';

interface Props extends RouteComponentProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  restaurant: {
    name: string;
    address: string;
  };
}

function KakaoMapModal({ toggle, setToggle, restaurant }: Props): React.ReactElement {
  const { name, address } = restaurant;

  return (
    <Modal
      show={toggle}
      onHide={() => setToggle(false)}
      style={{
        textAlign: 'center',
      }}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>주소: {address}</Modal.Header>
      <Modal.Body>
        <div
          style={{
            margin: 'auto',
            width: '100%',
          }}
        >
          <KakaoMap address={address} restaurantName={name} width={'100%'} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(KakaoMapModal);
