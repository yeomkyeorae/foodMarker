import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const SignupBox = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const SignupBoxH1 = styled.h1`
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

function Signup(props) {
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
        props.history.push("/loginSignup");
      } else {
        alert("failed to sign up");
      }
    });
  };

  return (
    <SignupBox>
      <SignupBoxH1>회원가입</SignupBoxH1>
      <form onSubmit={onSubmitHandler} style={{ width: "90%", height: "50%" }}>
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
            type="text"
            value={Name}
            placeholder="이름"
            onChange={onNameHandler}
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
        <TextBox>
          <Input
            type="password"
            value={ConfirmPassword}
            placeholder="비밀번호 확인"
            onChange={onConfirmedPassword}
          />
        </TextBox>
        <Btn type="submit">회원가입</Btn>
      </form>
    </SignupBox>
  );
}

export default withRouter(Signup);
