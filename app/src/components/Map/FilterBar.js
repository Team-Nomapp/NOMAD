import React from 'react';
import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';

const Bar = styled.div`
  position: fixed;
  right: 51%;
  top: 20px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  font-size: 20px;
`;

const I = styled(Icon)`
  margin-bottom: 10px;
  cursor: pointer;
  opacity: ${({ selected }) => selected ? '1' : '0.7'};
  color: ${({ selected }) => selected ? '#eee' : '#fff'};
  &:hover {
    color: #fff;
  }
`;

const FilterBar = ({ setFilterMode, filterMode, show }) => {
  return show && (
    <Bar>
      <Tooltip
        placement="left" 
        title="Temperature Range"
      >
        <I
          onClick={() => setFilterMode(filterMode === 'temp' ? null : 'temp')}
          selected={ filterMode === 'temp' }
          type="heat-map" 
        />
      </Tooltip>
      <Tooltip 
        placement="left" 
        title="Elevation"
      >
        <I
          onClick={() => setFilterMode(filterMode === 'elevation' ? null : 'elevation')}
          selected={ filterMode === 'elevation' }
          type="radar-chart" 
        />
      </Tooltip>
    </Bar>
  )
}

export default FilterBar;