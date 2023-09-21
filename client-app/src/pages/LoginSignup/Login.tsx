import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { withRouter, RouteComponentProps } from "react-router-dom";
import './Login.css';
import AlertModal from "../../components/containers/AlertModal/AlertModal";
import { encryptWithAES } from "../../library/utils";
import * as S from "./LoginSignup.style";
import { useAuthContext } from "../../context/auth";

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

  const { setUserInfo } = useAuthContext();

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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encryptedPwd = encryptWithAES(password)
    const body = { email, password: encryptedPwd };

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        const { userId, name, myPlace } = response.payload;

        setUserInfo(userId, name, myPlace);

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
    <S.SubContainer>
      <S.Title color={"#4caf50"}>로그인</S.Title>
      <form onSubmit={onSubmitHandler}>
        <S.InputBox color={"#4caf50"}>
          <S.Input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailHandler}
            ref={inputRef}
          />
        </S.InputBox>
        <S.InputBox color={"#4caf50"}>
          <S.Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </S.InputBox>
        <S.Btn type="submit" color={"#4caf50"}>로그인</S.Btn>
      </form>
      <S.Span onClick={() => setToggle(!toggle)} color={"#4caf50"}>회원가입</S.Span>
      {
        alertToggle ?
          <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
          null
      }
    </S.SubContainer>
  );
}

export default withRouter(Login);
