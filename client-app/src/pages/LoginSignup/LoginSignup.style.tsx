import styled from "styled-components";
import background from "../../assets/loginBackground.jpeg";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  background: url(${background}) no-repeat 50% 50%;
  top: 0;
  display: table;
  background-size: cover;
  font-family: "Century Gothic", sans-serif;
`;

export const SubContainer = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
`;

export const Title = styled.h1`
  float: left;
  font-size: 40px;
  border-bottom: 6px solid ${props => props.color};
  margin-bottom: 50px;
  padding: 13px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

export const InputBox = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 3px solid ${props => props.color};
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 80%;
  float: left;
  margin: 0 10px;
  ::placeholder {
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

export const Btn = styled.button`
  border-radius: 9px;
  width: 100%;
  background: ${props => props.color};
  border: 3px solid ${props => props.color};
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  &:hover {
    color: ${props => props.color};
  }
`;

export const Span = styled.span`
  &:hover {
    cursor: pointer;
    color: ${props => props.color};
    font-weight: bold;
  }
`;