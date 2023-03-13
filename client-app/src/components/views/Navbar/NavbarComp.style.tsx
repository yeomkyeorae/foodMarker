import styled from "styled-components";

export const TopNav = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const Home = styled.div`
  height: 100%;
  width: 200px;
  color: #ff6700;
  &:hover {
    text-decoration: none;
  }
  font-size: 2rem;
  font-weight: 500;
`;

export const Menu = styled.div`
  height: 100%;
  width: 10vw;
  text-align: center;
  text-decoration: none;
  color: ${props => (props.color === "true" ? "#ff6700" : "black")};
  &:hover {
    color: #ff6700;
    text-decoration: none;
    font-weight: bold;
  }
  font-weight: 200;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const DownMenu = styled.div`
  height: 3vh;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: ${props => (props.color === "true" ? "#ff6700" : "black")};
  &:hover {
    color: #ff6700;
    text-decoration: none;
  }
  font-weight: 200;
  /* border: 1px solid black; */
  margin-bottom: 1px;
`;

export const Icon = styled.div`
  margin-left: auto;
  width: 10vw;
  cursor: pointer;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export const RightMenuDiv = styled.div`
  cursor: pointer;
  width: 10rem;
  margin-left: auto;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const DownRightMenuDiv = styled.div`
  cursor: pointer;
  text-align: center;
  width: 100%;
`;

export const RightMenuSpan = styled.span<{color?: string; marginRight?: string; hoverColor?: string;}>`
  color: ${props => props.color ?? 'black'};
  margin-right: ${props => props.marginRight ?? '0px'};
  &:hover {
    color: ${props => props.hoverColor ?? null};
    font-weight: bold;
  }
`;