import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { registerRestaurant } from "../../../_actions/restaurant_action";

const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 4rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
`;

const HeadLine = styled.h2`
  padding: 0rem 0 0 0;
  margin: 0 0 1rem 0;
  font: normal 2rem var(--font-head);
  font-size: 2rem;
`;

function WishListItem(props) {
  const { wishListId, wishListName, wishListAddress, userId } = props;
  const dispatch = useDispatch();
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [VisitiedDate, setVisitiedDate] = useState("");

  const openPopUp = () => {
    setPopUpToggle(!popUpToggle);
  };

  const onVisitiedDateHandler = e => {
    setVisitiedDate(String(e.currentTarget.value));
  };

  const moveToMain = () => {
    let body = {
      visitor: userId,
      name: wishListName,
      address: wishListAddress,
      date: VisitiedDate
    };

    dispatch(registerRestaurant(body)).then(response => {
      if (response.payload.success) {
        props.setToggle(true);
        setPopUpToggle(false);
        props.deleteHandler(wishListId);
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

  const ModalComp = (
    <Modal.Dialog>
      <Modal.Header closeButton onClick={() => openPopUp()}>
        <Modal.Title>방문 전환</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="date"
          value={VisitiedDate}
          placeholder="방문 일시"
          onChange={onVisitiedDateHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={moveToMain}>
          방문 표시하기
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );

  return (
    <Item key={wishListId} style={{ width: "100%" }}>
      <HeadLine>{wishListName}</HeadLine>
      <div>
        <Button
          variant="success"
          onClick={() => openPopUp()}
          style={{ margin: "2px" }}
        >
          방문
        </Button>
        <Button
          variant="danger"
          onClick={() => props.deleteHandler(wishListId)}
          style={{ margin: "2px" }}
        >
          삭제
        </Button>
      </div>
      {popUpToggle && ModalComp}
      <span>{wishListAddress}</span> <br />
      <hr />
    </Item>
  );
}

export default withRouter(WishListItem);
