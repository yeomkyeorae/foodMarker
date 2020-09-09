import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

function Signup(props) {
  const LoginBox = styled.div``;

  const TextBox = styled.div``;

  const Btn = styled.button``;

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmedPassword = e => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("서로 다른 패스워드입니다");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push("/");
      } else {
        alert("failed to sign up");
      }
    });
  };

  return (
    <LoginBox>
      <form onSubmit={onSubmitHandler}>
        <TextBox>
          <input
            type="email"
            value={Email}
            placeholder="email"
            onChange={onEmailHandler}
          />
        </TextBox>
        <TextBox>
          <input
            type="text"
            value={Name}
            placeholder="name"
            onChange={onNameHandler}
          />
        </TextBox>
        <TextBox>
          <input
            type="password"
            value={Password}
            placeholder="password"
            onChange={onPasswordHandler}
          />
        </TextBox>
        <TextBox>
          <input
            type="password"
            value={ConfirmPassword}
            placeholder="confirm password"
            onChange={onConfirmedPassword}
          />
        </TextBox>
        <Btn type="button">회원가입</Btn>
      </form>
    </LoginBox>
  );
}

export default withRouter(Signup);
