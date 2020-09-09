import React, { useEffect } from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url("https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80")
    no-repeat 50% 50%;
  top: 0;
  display: table;
  background-size: cover;
`;

const Div = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  max-width: none;
`;

const Content = styled.div`
  max-width: 500px;
  margin: auto;
  text-align: center;
`;

const ContentH1 = styled.h1`
  font-family: "Century Gothic", sans-serif;
  color: #f9f3f4;
  font-size: 500%;
  text-shadow: 0 0 300px #000;
`;

const Btn = styled.a`
  border-radius: 9px;
  color: #f9f3f4;
  text-decoration: none;
  font-family: "Century Gothic", sans-serif;
  border: 3px solid;
  padding: 7px 13px;
  font-weight: bold;
  &:hover {
    color: #2196f3;
  }
`;

function LadingPage() {
  useEffect(() => {}, []);

  return (
    <Section>
      <Div className="in1">
        <Content className="content">
          <ContentH1>Food Marker</ContentH1>
          <Btn href="/loginSignup">GET STARTED</Btn>
        </Content>
      </Div>
    </Section>
  );
}

export default LadingPage;
