import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import EnrollRestaurant from "../MainPage/EnrollRestaurant";
import NavbarComp from "../Navbar/NavbarComp";

function WishPage(props) {
  const dispatch = useDispatch();
  const userId = props.location.state;
  console.log("wish props: ", props);

  const onClickHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        props.history.push("/loginSignup");
      } else {
        alert("failed to logout");
      }
    });
  };

  let MenuComponent = <EnrollRestaurant userId={userId} />;

  return (
    <div>
      <NavbarComp userId={userId} />
      <button onClick={onClickHandler} style={{ float: "left" }}>
        로그아웃
      </button>
      {MenuComponent}
    </div>
  );
}

export default withRouter(WishPage);
