import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const LoginBox = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const LoginBoxH1 = styled.h1`
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #4caf50;
  margin-bottom: 50px;
  padding: 13px 0;
`;

const TextBox = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #4caf50;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 80%;
  float: left;
  margin: 0 10px;
`;

const Btn = styled.button`
  width: 100%;
  background: none;
  border: 2px solid #4caf50;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
`;

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
        props.history.push({
          pathname: "/main",
          state: response.payload.userId
        });
      } else {
        console.log(response);
        alert("error");
      }
    });
  };

  return (
    <LoginBox>
      <LoginBoxH1>로그인</LoginBoxH1>
      <form onSubmit={onSubmitHandler}>
        <TextBox>
          <Input
            type="email"
            value={Email}
            placeholder="이메일"
            onChange={onEmailHandler}
          />
        </TextBox>
        <TextBox>
          <Input
            type="password"
            value={Password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </TextBox>
        <Btn type="submit">로그인</Btn>
      </form>
    </LoginBox>
  );
}

export default withRouter(Login);
