import styled from "styled-components";

export const SeasonDiv = styled.div`
  display: inline-block;
  width: 10rem;
  color: ${props => props.color === 'true' ? '#ff6700' : 'black'};
  &:hover {
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: #ff6700;
  }
  cursor: pointer;
`;