import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerRestaurant } from "../../../_actions/restaurant_action";

function EnrollRestaurant(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [VisitiedDate, setVisitiedDate] = useState("");
  const userId = props.userId;

  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onAddressHandler = e => {
    setAddress(e.currentTarget.value);
  };

  const onVisitiedDateHandler = e => {
    setVisitiedDate(e.currentTarget.value);
  };

  const dispatch = useDispatch();
  const onSubmitHandler = e => {
    e.preventDefault();
    let body = {
      visitor: userId,
      name: Name,
      address: Address,
      date: VisitiedDate
    };

    dispatch(registerRestaurant(body)).then(response => {
      if (response.payload.success) {
        setName("");
        setAddress("");
        setVisitiedDate("");
        props.setToggle(true);
        props.history.push({
          pathname: "/main",
          state: { userId: userId }
        });
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            value={Name}
            placeholder="식당 이름"
            onChange={onNameHandler}
          />
        </div>
        <div>
          <input
            type="text"
            value={Address}
            placeholder="주소"
            onChange={onAddressHandler}
          />
        </div>
        <div>
          <input
            type="date"
            value={VisitiedDate}
            placeholder="방문 일시"
            onChange={onVisitiedDateHandler}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default withRouter(EnrollRestaurant);
