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

  const [toggle, setToggle] = useState(true);

  let loginOrSignup;
  if (toggle) {
    loginOrSignup = <Login toggle={toggle} setToggle={setToggle} />;
  } else {
    loginOrSignup = <Signup toggle={toggle} setToggle={setToggle} />;
  }

  return (
    <Section>
      <div>{loginOrSignup}</div>
    </Section>
  );
}

export default LoginSignup;
