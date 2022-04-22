import React from "react";
import styled from "styled-components";
import background from "../../../assets/background.jpeg";

const Section = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url(${background}) no-repeat 50% 50%;
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
  color: #cdb891;
  font-size: 500%;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Btn = styled.a`
  border-radius: 9px;
  color: #cdb891;
  text-decoration: none;
  font-family: "Century Gothic", sans-serif;
  border: 1px solid black;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  &:hover {
    color: #4caf50;
    text-decoration: none;
  }
`;

function LadingPage(): React.ReactElement {
  return (
    <Section>
      <Div>
        <Content className="content">
          <ContentH1>Food Marker</ContentH1>
          <Btn href="/loginSignup">GET STARTED</Btn>
        </Content>
      </Div>
    </Section>
  );
}

export default LadingPage;
