import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 999;
  pointer-events: none;
  left: ${({ x }) => x}px; 
  top: ${({ y }) => y}px;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  font-size: 9px;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    
    > div {
      flex: 1;
      > div.ant-statistic-content {
        font-size: 18px;
      }
    }
  }
`;

const Tooltip = ({ userHover }) => {
  return userHover && (
    <Container x={userHover.x} y={userHover.y}>
      You are here
    </Container>
  );
};

export default Tooltip;