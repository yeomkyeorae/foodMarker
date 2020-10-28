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
    setVisitiedDate(e.currentTarget.value);
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
          Save changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );

  return (
    <Item key={wishListId}>
      <HeadLine>{wishListName}</HeadLine>
      <button onClick={() => props.deleteHandler(wishListId)}>삭제</button>
      <button onClick={() => openPopUp()}>방문?</button>
      {popUpToggle && ModalComp}
      <span>{wishListAddress}</span> <br />
      <hr />
    </Item>
  );
}

export default withRouter(WishListItem);
