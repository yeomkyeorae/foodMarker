import styled from "styled-components";

export const WishLists = styled.div`
  width: 40%;
  height: 100%;
  display: inline-block;
  height: 80vh;
  margin-bottom: 5px;
`;

export const List = styled.ol`
  list-style: none;
  width: 100%;
  padding-left: 0px;
`;

export const SortMenu = styled.div<{ color?: string; }>`
  color: ${props => (props.color === "true" ? "#D21404" : "black")};
  display: inline-block;
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin: 5px 10px;
  font-size: 1.4vw;
`;