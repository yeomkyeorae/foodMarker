import React, { useState, useEffect, useRef } from "react";
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
  text-align: center;
`;

const SignupBoxH1 = styled.h1`
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #e56717;
  margin-bottom: 50px;
  padding: 13px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const TextBox = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 3px solid #e56717;
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
  ::placeholder {
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

const Btn = styled.button`
  width: 100%;
  background: #e56717;
  border: 3px solid #e56717;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  &:hover {
    color: #e56717;
  }
`;

const Span = styled.span`
  &:hover {
    cursor: pointer;
    color: #4caf50;
  }
`;


function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  const onClickHandler = () => {
    props.setToggle(!props.toggle);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if(email.length <= 6 || 
      !email.includes('@') || 
      !email.includes('.') || 
      email.split('@').length !== 2 ||
      email.split('@')[0].length === 0 ||
      email.split('@')[1].length === 0 ||
      email.split('@')[1].split('.').length !== 2 ||
      email.split('@')[1].split('.')[0].length === 0 ||
      email.split('@')[1].split('.')[1].length === 0) {
        return alert("이메일 형식을 입력해주세요");
    }

    if(name.length === 0) {
      return alert("이름을 입력해 주세요");
    }

    if(password.length <= 8) {
      return alert("8자리 이상의 패스워드를 입력하세요");
    }

    if(password !== confirmPassword) {
      alert("서로 다른 패스워드입니다");
      return;
    }

    const body = { email, name, password };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다");
        props.setToggle(true);
      } else {
        alert("회원가입이 실패했습니다");
      }
    });
  };

  return (
    <SignupBox>
      <SignupBoxH1>회원가입</SignupBoxH1>
      <form onSubmit={onSubmitHandler}>
        <TextBox>
          <Input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailHandler}
            ref={inputRef}
          />
        </TextBox>
        <TextBox>
          <Input
            type="text"
            value={name}
            placeholder="이름"
            onChange={onNameHandler}
            autoComplete="off"
          />
        </TextBox>
        <TextBox>
          <Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
            autoComplete="new-password"
          />
        </TextBox>
        <TextBox>
          <Input
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            onChange={onConfirmedPassword}
          />
        </TextBox>
        <Btn type="submit">회원가입</Btn>
      </form>
      <Span onClick={onClickHandler}>로그인</Span>
    </SignupBox>
  );
}

export default withRouter(Signup);
