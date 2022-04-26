import React, { Dispatch, SetStateAction} from "react";
import { Modal } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";
import KakaoMap from "./KakaoMap";

interface Props extends RouteComponentProps {
  Toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  restaurant: {
    name: string;
    address: string;
  }
}

function KakaoMapModal(props: Props): React.ReactElement {
  const { Toggle, setToggle, restaurant } = props;
  const { name, address } = restaurant;

  return (
    <Modal
      show={Toggle}
      onHide={() => setToggle(false)}
      style={{
        textAlign: "center"
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>주소: {address}</Modal.Header>
      <Modal.Body>
        <div
          style={{
            margin: "auto",
            width: "100%"
          }}
        >
          <KakaoMap address={address} restaurantName={name} width={"100%"} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(KakaoMapModal);
