import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";

function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password
    };
    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default withRouter(Login);
