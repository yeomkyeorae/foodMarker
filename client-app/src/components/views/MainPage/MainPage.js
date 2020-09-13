import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function MainPage(props) {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then(response => {
      if (response.data.success) {
        props.history.push("/loginSignup");
      } else {
        alert("failed to logout");
      }
    });
  };

  return (
    <div>
      hello
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(MainPage);
