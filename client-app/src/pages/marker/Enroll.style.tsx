import styled from "styled-components";

export const InputTitle = styled.div<{ fontSize?: string; borderBottom?: string; }>`
  max-width: 700px;
  margin: auto;
  font-weight: bold;
  font-size: ${props => props.fontSize ? props.fontSize : "1rem"};
  text-align: left;
  border-bottom: ${props => props.borderBottom ? props.borderBottom : '0.5px'} solid black;
  margin-bottom: 10px;
`;