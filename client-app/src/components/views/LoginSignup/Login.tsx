import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import './Login.css';
import AlertModal from "../../containers/AlertModal/AlertModal";


const LoginBox = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
`;

const LoginBoxH1 = styled.h1`
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #4caf50;
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
  border-bottom: 3px solid #4caf50;
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
  border-radius: 9px;
  width: 100%;
  background: #4caf50;
  border: 3px solid #4caf50;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  &:hover {
    color: #4caf50;
  }
`;

const Span = styled.span`
  &:hover {
    cursor: pointer;
  }
`;


function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch<any>();

  const inputRef: React.RefObject<any> = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onClickHandler = () => {
    props.setToggle(!props.toggle);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const body = { email, password };
    
    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        window.sessionStorage.setItem("userId", response.payload.userId);
        window.sessionStorage.setItem("username", response.payload.name);
        props.history.push({
          pathname: "/main"
        });
      } else {
        setAlertToggle(true);
        setAlertMessage("로그인에 실패했습니다");
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
            value={email}
            placeholder="이메일"
            onChange={onEmailHandler}
            ref={inputRef}
          />
        </TextBox>
        <TextBox>
          <Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </TextBox>
        <Btn type="submit">로그인</Btn>
      </form>
      <Span onClick={onClickHandler}>회원가입</Span>
      {
        alertToggle ?
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
        null
      }
    </LoginBox>
  );
}

export default withRouter(Login);
