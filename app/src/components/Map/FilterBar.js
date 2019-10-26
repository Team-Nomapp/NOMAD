import React, { useContext } from 'react';
import { _Context } from '../../App';
import { Bar, I, A } from './styles';
import { Tooltip } from 'antd';
import { ALL_YEARS } from '../../data';

const FilterBar = ({ 
  setFilterMode, 
  filterMode,
  show 
}) => {
  const { state: { year }, dispatch } = useContext(_Context);

  const setYear = payload => 
    dispatch({type: 'UPDATE_YEAR', payload});

  console.log({ year });

  return show && (
    <Bar>
      <div>
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
        <div>
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
        </div>
      </div>
      <div>
        { ALL_YEARS.map(y => (
          <A 
            selected={ y === year }
            onClick={() => setYear(y)}
          >
            { y }
          </A>
        )) }
      </div>
    </Bar>
  )
}

export default FilterBar;