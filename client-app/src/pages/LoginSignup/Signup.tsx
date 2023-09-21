import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AlertModal from "../../components/containers/AlertModal/AlertModal";
import { LocationCode } from "../../library/def";
import { encryptWithAES } from "../../library/utils";
import * as S from "./LoginSignup.style";

interface Props extends RouteComponentProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

function Signup({ toggle, setToggle }: Props): React.ReactElement {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch<any>();

  const inputRef: React.RefObject<any> = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmedPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length <= 6 ||
      !email.includes('@') ||
      !email.includes('.') ||
      email.split('@').length !== 2 ||
      email.split('@')[0].length === 0 ||
      email.split('@')[1].length === 0 ||
      email.split('@')[1].split('.').length !== 2 ||
      email.split('@')[1].split('.')[0].length === 0 ||
      email.split('@')[1].split('.')[1].length === 0) {
      setAlertToggle(true);
      setAlertMessage("이메일 형식을 올바르게 입력해 주세요!");
      return;
    }

    if (name.length === 0) {
      setAlertToggle(true);
      setAlertMessage("이름을 입력해 주세요!");
      return;
    }

    if (password.length < 8) {
      setAlertToggle(true);
      setAlertMessage("8자리 이상의 패스워드를 입력하세요!");
      return;
    }

    if (password !== confirmPassword) {
      setAlertToggle(true);
      setAlertMessage("서로 다른 패스워드입니다!");
      return;
    }

    const encryptedPwd = encryptWithAES(password);
    const body = { email, name, password: encryptedPwd, myPlace: LocationCode.Sejong };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다");
        setToggle(true);
      } else {
        alert("회원가입이 실패했습니다");
      }
    });
  };

  return (
    <S.SubContainer>
      <S.Title color={"#e56717"}>회원가입</S.Title>
      <form onSubmit={onSubmitHandler}>
        <S.InputBox color={"#e56717"}>
          <S.Input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailHandler}
            ref={inputRef}
          />
        </S.InputBox>
        <S.InputBox color={"#e56717"}>
          <S.Input
            type="text"
            value={name}
            placeholder="이름"
            onChange={onNameHandler}
            autoComplete="off"
          />
        </S.InputBox>
        <S.InputBox color={"#e56717"}>
          <S.Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordHandler}
            autoComplete="new-password"
          />
        </S.InputBox>
        <S.InputBox color={"#e56717"}>
          <S.Input
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            onChange={onConfirmedPassword}
          />
        </S.InputBox>
        <S.Btn type="submit" color={"#e56717"}>회원가입</S.Btn>
        {
          alertToggle ?
            <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} /> :
            null
        }
      </form>
      <S.Span onClick={() => setToggle(!toggle)} color={"#e56717"}>로그인</S.Span>
    </S.SubContainer>
  );
}

export default withRouter(Signup);
