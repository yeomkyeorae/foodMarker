import styled from "styled-components";

export const LoginBox = styled.div`
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
`;

export const LoginBoxH1 = styled.h1`
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #4caf50;
  margin-bottom: 50px;
  padding: 13px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

export const TextBox = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 3px solid #4caf50;
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
  background: #4caf50;
  border: 3px solid #4caf50;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  &:hover {
    color: #4caf50;
  }
`;

export const Span = styled.span`
  &:hover {
    cursor: pointer;
  }
`;