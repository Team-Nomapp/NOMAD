import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapController, FlyToInterpolator } from 'deck.gl';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { Icon, notification } from 'antd';

import useContext from 'hooks/useContext';

import Legend from './Legend';
import Tooltip from './Tooltip';
import UserTooltip from './UserTooltip';
import lightingEffect from './lighting';
import { useMode } from './hooks';
import { defaultViewState, processData, buildQuery } from './helpers';
import { renderLocation, renderElevation, renderTemperature } from './layers';

const controller = { 
  type: MapController
};

const Map = () => {
  const [ data, setResults ] = useState([]);
  const [ hovered, onHover ] = useState({});
  const [ userHover, onUserHover ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const { state } = useContext();

  const { 
    map: { style, mode: filterMode }, 
    country, 
    land, 
    bumpy, 
    temperature, 
    water,
    urban,
    arable,
    year
  } = state;

  const [ viewState, mode ] = useMode(country);

  useEffect(() => {
    country && !loading && fetchData()
  }, [ country, land, bumpy, temperature, water, urban, arable, year ]);

  useEffect(() => {
    setLoading(false);
    notification.destroy();
    if (country && data.length === 0) {
      notification.open({
        message: 'Warning',
        description:
          'There are no results for these settings.',
        duration: 0,
        icon: <Icon type="warning" theme="twoTone" />
      })
    }
  }, [ data ]);

  useEffect(() => {
    onHover({});
  }, [ mode ]);

  const renderTooltip = () => {
    return hovered.object && <Tooltip {...hovered} />;
  };

  const renderLoading = () => {
    return null; // loading && <Icon type="loading" style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 999 }} />
  };

  const fetchData = async () => {
    setLoading(true);
    const result = await axios.get(
      buildQuery(), {
      params: {
        ...state,
        temperature: [
          state.temperature[0] + 273.15,
          state.temperature[1] + 273.15
        ]
      }
    }); 
    const parsed = processData(result.data, year)
    setResults(parsed);
  };

  return (
    <DeckGL
      effects={[ lightingEffect ]}
      initialViewState={ defaultViewState }
      viewState={ {
        ...viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
      } }
      controller={controller}
      layers={ [
        renderLocation(country, onUserHover),
        renderElevation(mode === 'country' && filterMode === 'elevation', data, { onHover }), 
        renderTemperature(mode === 'country' && filterMode === 'temperature', data, year),
      ] }
    >
      <StaticMap 
        reuseMaps
        preventStyleDiffing
        maxZoom
        mapStyle={style}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        { renderLoading() }
        { renderTooltip() }
        <UserTooltip userHover={userHover} />
        <Legend country={country} filterMode={filterMode} />
      </StaticMap>
    </DeckGL>
  )
}

export default Map;