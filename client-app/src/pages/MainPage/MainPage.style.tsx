import styled from "styled-components";

export const H2 = styled.h2`
  font-size: 2rem;
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
`

export const FoodMarkerTitle = styled.div`
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 992px) {
    height: 20vh;
  }
`;

export const FoodMarkerExplanation = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const FoodMarkerExplanationTitle = styled.span`
  font-weight: 200;
  font-size: 1.5rem;
  color: black;
  &:hover {
    color: #ff6700;
  }
`;

export const OrderList = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  margin: 0;
  padding: 0;
`;

export const List = styled.li`
  flex: 20%;
  @media screen and (max-width: 992px) {
    flex: 25%;
  }
  @media screen and (max-width: 630px) {
    flex: 50%;
  }
  @media screen and (max-width: 384px) {
    flex: 100%;
  }
`;