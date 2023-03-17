import styled from "styled-components";
import background from "../../assets/background.jpeg";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url(${background}) no-repeat 50% 50%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
`;

export const Content = styled.div`
  max-width: 500px;
  margin: auto;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: "Century Gothic", sans-serif;
  color: #e67e22;
  font-size: 500%;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Link = styled.a`
  color: #e67e22;
  text-decoration: none;
  font-family: "Century Gothic", sans-serif;
  padding: 10px 15px;
  font-size: 1.5rem;
  font-weight: bold;
  &:hover {
    color: #d35400;
    text-decoration: none;
  }
`;