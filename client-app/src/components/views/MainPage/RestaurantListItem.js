import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getImage } from "../../../_actions/restaurant_action";
import styled from "styled-components";

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

const FoodImg = styled.img`
  max-width: 100%;
  height: auto;
`;

function RestaurantListItem(props) {
  const restaurant = props.restaurant;
  const dispatch = useDispatch();
  //   const [ImgSrc, setImgSrc] = useState(
  //     "https://images.unsplash.com/photo-1595576359780-91004705b4f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
  //   );

  //   useEffect(() => {
  //     dispatch(getImage(restaurant.filename)).then(response => {
  //       const base64data = new Buffer(response.payload).toString("base64");
  //       console.log(base64data);

  //       console.log("response payload: ", response.payload);
  //       setImgSrc(base64data);
  //     });
  //   });

  return (
    <Item>
      <FoodImg src={restaurant.imgURL}></FoodImg>
      <HeadLine>{restaurant.name}</HeadLine>
      <button onClick={() => props.deleteHandler(restaurant._id)}>삭제</button>
      <span>{restaurant.date}</span> <br />
      <hr />
      <span>{restaurant.address}</span>
    </Item>
  );
}

export default withRouter(RestaurantListItem);
