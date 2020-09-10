import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

const Section = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url("https://images.unsplash.com/photo-1477617722074-45613a51bf6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")
    no-repeat 50% 50%;
  top: 0;
  display: table;
  background-size: cover;
`;

function LoginSignup() {
  useEffect(() => {}, []);

  const [Toggle, setToggle] = useState(true);
  const [Text, setText] = useState("회원가입");

  const onClickHandler = () => {
    setToggle(!Toggle);
    if (Text === "회원가입") {
      setText("로그인");
    } else {
      setText("회원가입");
    }
  };

  let loginOrSignup;
  if (Toggle) {
    loginOrSignup = <Login />;
  } else {
    loginOrSignup = <Signup />;
  }

  return (
    <Section>
      <button onClick={onClickHandler}>{Text}</button>
      <div>{loginOrSignup}</div>
    </Section>
  );
}

export default LoginSignup;
