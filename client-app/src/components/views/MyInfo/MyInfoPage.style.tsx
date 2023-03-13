import styled from "styled-components";

export const InfoBlock = styled.div<{ backgroundColor?: string; }>`
  width: 25%;
  border-radius: 30px;
  background-color: ${props => props.backgroundColor};
  color: white;
  margin: 10px;
`;

export const InfoTitle = styled.h3`
  margin-top: 10px;
`;

export const InfoContent = styled.span`
  font-size: 1.5rem;
`;

export const ColorBar = styled.div<{ backgroundColor?: string; }>`
  margin-right: 2px;
  background-color: ${props => props.backgroundColor};
  color: white;
  width: 20%;
`;