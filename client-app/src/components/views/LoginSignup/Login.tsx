import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter, RouteComponentProps } from "react-router-dom";
import './Login.css';
import AlertModal from "../../containers/AlertModal/AlertModal";
import * as S from "./Login.style";

interface Props extends RouteComponentProps {
  setToggle: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
  history: RouteComponentProps["history"];
}


function Login({ setToggle, toggle, history }: Props): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch<any>();

  const inputRef: React.RefObject<any> = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onClickHandler = () => {
    setToggle(!toggle);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        window.sessionStorage.setItem("userId", response.payload.userId);
        window.sessionStorage.setItem("username", response.payload.name);
        window.sessionStorage.setItem("myPlace", response.payload.myPlace);
        history.push({
          pathname: "/main"
        });
      } else {
        setAlertToggle(true);
        setAlertMessage("로그인에 실패했습니다");
      }
    });
  };

  return (
    <S.LoginBox>
      <S.LoginBoxH1>로그인</S.LoginBoxH1>
      <form onSubmit={onSubmitHandler}>
        <S.TextBox>
          <S.Input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailHandler}
            ref={inputRef}
          />
        </S.TextBox>
        <S.TextBox>
          <S.Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </S.TextBox>
        <S.Btn type="submit">로그인</S.Btn>
      </form>
      <S.Span onClick={onClickHandler}>회원가입</S.Span>
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </S.LoginBox>
  );
}

export default withRouter(Login);
