import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { colorRange } from './layers/temp';

const { Title } = Typography;

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  transition: all 0.2s;
  background-color: #fff;
  padding: 5px 5px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 100px;
  z-index: 999;
  font-size: 10px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    
    > div {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 5px;
  
      > div {
        flex: 1;
        height: 100%;
        padding-left: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const temps = [ 24, 26, 28, 30, 32, 34 ];

const Color = styled.div`
  background: ${({ color }) => `rgb(${color})`};
  border-radius: 8px;
  min-height: 15px;
`;

const Legend = ({ country, filterMode }) => {
  if (!country) return null;

  if (filterMode === 'temperature') {
    return (
      <Container>
        <Title level={4} style={{ fontSize: 12 }}>Maximum Temperature</Title>
        <div>
          {colorRange.map((color, key) => {
            return (
              <div>
                <Color color={ color.join(",") } />
                <div>
                  { `${temps[key]} C` }
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    )
  }

  return null;
}

export default Legend;