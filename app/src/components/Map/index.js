import React, { useState, useEffect } from 'react';
import axios from 'axios';
// map
import { MapController, FlyToInterpolator } from 'deck.gl';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
// components
import { Icon, notification } from 'antd';
import Legend from './Legend';
import Tooltip from './Tooltip';
import WikiTooltip from './WikiTooltip';
import UserTooltip from './UserTooltip';
import { renderLocation, renderElevation, renderTemperature, renderRegions } from './layers';

// hooks and settings
import useContext from 'hooks/useContext';
import { useMode } from './hooks';
import lightingEffect from './lighting';
import { createNotification, getWikiData, defaultViewState, processData, buildQuery, extractTreeParams } from './helpers';

const controller = { 
  type: MapController
};

const Map = () => {
  const [ wiki, setWiki ] = useState([]);
  const [ data, setResults ] = useState([]);
  const [ wikiHover, onWikiHover ] = useState(false);
  const [ hovered, onHover ] = useState({});
  const [ userHover, onUserHover ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ localViewState, setLocalViewState ] = useState(defaultViewState);

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
    setLocalViewState(viewState);
  }, [ country ]);

  useEffect(() => {
    country && !loading && fetchData()
  }, [ country, land, bumpy, temperature, water, urban, arable, year ]);

  useEffect(() => {
    setLoading(false);
    notification.destroy();
    createNotification(country && data.length === 0);
    getWikiData(data, setWiki);
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
    const result = await axios.post(
      buildQuery(), {
      ...extractTreeParams({
        ...state,
        temperature: [
          state.temperature[0] + 273.15,
          state.temperature[1] + 273.15
        ]
      })
    }); 
    const parsed = processData(result.data, year);
    setResults(parsed);
  }

  const handleViewStateChange = change => {
    // if (change.interactionState && change.interactionState.isZooming) {
    //   setLocalViewState(change.viewState);
    // }
    setLocalViewState(change.viewState);
  }

  return (
    <DeckGL
      effects={[ lightingEffect ]}
      initialViewState={ defaultViewState }
      viewState={ {
        ...localViewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
      } }
      onViewStateChange={ handleViewStateChange }
      controller={controller}
      layers={ [
        renderRegions(wiki, onWikiHover),
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
        <WikiTooltip wikiHover={wikiHover} />
        <UserTooltip userHover={userHover} />
        <Legend country={country} filterMode={filterMode} />
      </StaticMap>
    </DeckGL>
  )
}

export default Map;