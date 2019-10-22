import React, { useContext } from 'react';
import { _Context } from '../../App';
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
  color: ${({ selected }) => selected ? '#707070' : '#bdbdbd'};
  &:hover {
    color: #bdbdbd;
  }
`;

const Options = styled.div`
  position: absolute;
  transform: translateX(-40px);
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 10px;
`;

const A = styled.a`
  color: #bdbdbd;
  opacity: ${({ selected }) => selected ? '1' : '0.6'};
  &:hover {
    color: #bdbdbd !important;
    opacity: 1;
  }
`;

const FilterBar = ({ 
  setFilterMode, 
  filterMode,
  show 
}) => {
  const years = [ '2019', '2100' ];
  const { state: { year }, dispatch } = useContext(_Context);

  const setYear = payload => 
    dispatch({type: 'UPDATE_YEAR', payload});

  return show && (
    <Bar>
      <div>
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
      </div>
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