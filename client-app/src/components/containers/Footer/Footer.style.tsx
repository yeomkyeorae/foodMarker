import styled from 'styled-components';

export const Container = styled.footer<{ marginTop?: number; position?: string }>`
  width: 100%;
  height: 50px;
  left: 0;
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : '0px')};
  bottom: 0;
  position: ${(props) => (props.position === 'fixed' ? 'fixed;' : 'relative;')};
  background: gray;
  color: white;
  overflow: hidden;
`;

export const Content = styled.p`
  padding: 10px 0;
  text-align: center;
`;
