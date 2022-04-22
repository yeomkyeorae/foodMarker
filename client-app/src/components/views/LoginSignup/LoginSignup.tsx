import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import background from "../../../assets/loginBackground.jpeg";


const Section = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url(${background}) no-repeat 50% 50%;
  top: 0;
  display: table;
  background-size: cover;
  font-family: "Century Gothic", sans-serif;
`;


function LoginSignup(): React.ReactElement {
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
