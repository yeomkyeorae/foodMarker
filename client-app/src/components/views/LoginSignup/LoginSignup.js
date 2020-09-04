import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Login from "./Login";

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

  return (
    <Section>
      <div className="in1">
        <h1 href="#">hhhh</h1>
        <Login />
      </div>
    </Section>
  );
}

export default LoginSignup;
