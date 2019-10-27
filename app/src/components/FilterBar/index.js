import React from 'react';
import { Tooltip } from 'antd';

import useContext from 'hooks/useContext';
import { ALL_YEARS } from 'state/data';

import { Bar, I, A } from './styles';

const FilterBar = () => {
  const { 
    state: { 
      collapsed,
      window: { isMobile }, 
      year, 
      country, 
      map: { mode } 
    }, 
    dispatch 
  } = useContext();

  const setYear = payload => 
    dispatch({type: 'UPDATE_YEAR', payload});

  const setFilterMode = payload =>
    dispatch({ type: 'UPDATE_MAP_MODE', payload });

  const setCollapsed = () =>
    dispatch({ 
      type: 'UPDATE_COLLAPSED', 
      payload: !collapsed
    });

  return country && (
    <Bar>
      {/** MENU COLLAPSE */}
      { isMobile && (
        <div>
          <div>
            <I
              onClick={setCollapsed}
              type={ collapsed ? "menu-unfold" : "menu-fold" } 
            />
          </div>
        </div>
      ) }

      {/** MODES */}
      <div>
        <div>
          <Tooltip
            placement="left" 
            title="Temperature Range"
          >
            <I
              onClick={() => setFilterMode(mode === 'temperature' ? null : 'temperature')}
              selected={ mode === 'temperature' }
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
              onClick={() => setFilterMode(mode === 'elevation' ? null : 'elevation')}
              selected={ mode === 'elevation' }
              type="radar-chart" 
            />
          </Tooltip>
        </div>
      </div>

      {/** YEARS */}
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