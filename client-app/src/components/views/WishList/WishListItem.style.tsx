import styled from "styled-components";

export const Item = styled.li`
  display: block;
  clear: both;
  counter-increment: list;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
  border: 2px solid black;
  margin-bottom: 5px;
`;

export const HeadLine = styled.span`
  padding: 0;
  margin-left: 25px;
  margin-bottom: 0;
  font-size: 2vw;
`;

export const Created = styled.span`
  padding: 0;
  margin-bottom: 0;
  font-size: 1vw;
`;

export const Address = styled.span`
  padding: 0;
  margin-bottom: 0;
  font-size: 0.8vw;
`;