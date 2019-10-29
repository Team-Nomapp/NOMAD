import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapController, FlyToInterpolator } from 'deck.gl';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import useContext from 'hooks/useContext';
import { ALL_COUNTRIES } from 'state/data';

import Tooltip from './Tooltip';
import lightingEffect from './lighting';
import { useMode, useLayers } from './hooks';
import { defaultViewState, processData, buildQuery } from './helpers';
import { renderLocation } from './layers';

const controller = { 
  type: MapController,
  // scrollZoom: false,
  // doubleClickZoom: false
};

const Map = () => {
  const [ data, setResults ] = useState([]);
  const [ hovered, onHover ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const { state, dispatch } = useContext();

  const { 
    map: { style, mode: filterMode }, 
    country, 
    region, 
    land, 
    bumpy, 
    temperature, 
    water,
    urban,
    arable,
    year
  } = state;
  const [ viewState, mode ] = useMode(country, region);

  useEffect(() => {
    country && !loading && fetchData()
  }, [ country, region, land, bumpy, temperature, water, urban, arable, year ]);

  useEffect(() => {
    setLoading(false);
  }, [ data ]);

  const layers = useLayers(loading, mode, filterMode, {
    data,
    onHover,
    onClick: type => ({ object }) => {
      onHover({});
      if (type === 'region') {
        dispatch({
          type: 'UPDATE_REGION', 
          payload: object
        });
      }
    }
  });
  
  const locationLayer = country ?
    renderLocation(ALL_COUNTRIES[country].coordinates) : [];

  const renderTooltip = () => {
    return hovered.object && <Tooltip {...hovered} />;
  };

  const renderLoading = () => {
    return null; // loading && <Icon type="loading" style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 999 }} />
  };

  const fetchData = async () => {
    setLoading(true);
    const result = await axios.get(
      buildQuery(region), {
      params: {
        ...state,
        temperature: [
          state.temperature[0] + 273.15,
          state.temperature[1] + 273.15
        ],
        ...(!region ? {} : {
          latitude: region.y,
          longitude: region.x
        })
      }
    }); 
    const parsed = processData(result.data, year);
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
        ...locationLayer, 
        ...layers
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
      </StaticMap>
    </DeckGL>
  )
}

export default Map;