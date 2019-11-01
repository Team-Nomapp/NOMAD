import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

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
  }
`;

const Tooltip = ({ wikiHover }) => {

  const getImage = (wikiHover && wikiHover.object.thumbnail) ? 
    <img src={wikiHover.object.thumbnail.source} /> :
    null;

  return wikiHover && (
    <Container x={wikiHover.x} y={wikiHover.y}>
      <Title level={4}>{ wikiHover.object.title }</Title>
      { getImage }
    </Container>
  );
};

export default Tooltip;