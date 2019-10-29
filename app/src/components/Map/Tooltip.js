import React from 'react';
import styled from 'styled-components';
import { Statistic } from 'antd';

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

const convert = val => (new Number(val)).toFixed(2);

const Tooltip = ({ object, x=30, y=30 }) => {
  
  return (
    <Container 
      x={x} 
      y={y >= 360 ? y - 150 : y}
    >
      <div>
        <Statistic title="latitude" value={convert(object.x)} />
        <Statistic title="longitude" value={convert(object.y)} />
      </div>
      <div>
        <Statistic title="max T (C)" value={convert(object.tmax)} />
        <Statistic title="elevation (m)" value={convert(object.dem)} />
      </div>
      <div>
        <Statistic title="water (km)" value={convert(object.water_distance)} />
        <Statistic title="urban (km)" value={convert(object.urban_distance)} />
      </div>
    </Container>
  );
};

export default Tooltip;