import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
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

  const onClickHandler = () => {
    setToggle(!Toggle);
  };

  let loginOrSignup;
  if (Toggle) {
    loginOrSignup = <Login />;
  } else {
    loginOrSignup = <Signup />;
  }

  return (
    <Section>
      <button onClick={onClickHandler}>hahaha</button>
      <div className="in1">{loginOrSignup}</div>
    </Section>
  );
}

export default LoginSignup;
