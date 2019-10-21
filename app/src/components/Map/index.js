import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { _Context } from '../../App';
import { ALL_COUNTRIES } from '../../data';
import lightingEffect from './lighting';
import renderHeatMap from './heatmap';
import renderElevation from './elevation';
import renderTemperature from './temp';
import FilterBar from './FilterBar';

import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieWFuaXZzaWxiZXJtYW4iLCJhIjoiY2sxeG94eG8xMGVzdzNub2N6dnRlaHB4MiJ9.4aYe5bEeBZbG_o8ZF7jo5g";
const apiUrl = "/api";
  // "http://d3494219.ngrok.io"; 
  // "http://localhost:4000" 
  // "http://c65e76a4.ngrok.io/sendPreferences";

function processData(data) { 
  return data.map(i => ({
    id: i.id,
    latitude: i.y,
    longitude: i.x,
    value: i.slope,
    tmin: i.tmin_2100,
    tmax: i.tmax_2100
  }))
}

const defaultViewState = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
  pitch: 0,
  bearing: 0
};

const useMode = (country, region) => {
  if (!country && !region) {
    return [defaultViewState, 'default'];
  } else if (!!country && !region) {
    // available regions mode
    return [{
      ...defaultViewState,
      pitch: 45,
      ...ALL_COUNTRIES[country].coordinates
    }, 'country'];
  } else {
    // specific region mode
    return [{
      ...defaultViewState,
      pitch: 60,
      ...region.coordinates
    }, 'region'];
  }
}

const useLayers = (mode, data, filterMode) => {
  console.log('useLayers', mode, data, filterMode);
  if (mode === 'country') {
    switch (filterMode) {
      case 'elevation':
        return renderElevation(data);
      case 'temp':
        return renderTemperature(data);
      default:
        return renderHeatMap(data)
    }
  };
  return [];
}

const Map = () => {
  const [ data, setResults ] = useState([]);
  const [ filterMode, setFilterMode ] = useState('temp');
  const { state } = useContext(_Context);

  const { country, region, land, bumpy, temperature, water } = state;
  const [ viewState, mode ] = useMode(country, region);

  useEffect(() => {
    country && fetchData()
  }, [ country, land, bumpy, temperature ]);

  const fetchData = async () => {
    const result = await axios.get(apiUrl, {
      params: state
    }); // csvData
    const parsed = processData(result.data);
    setResults(parsed);
  };

  const waterData = data.filter((i, key) =>
    ( 
      (key % (water[0] - water[1])) >= 0 && 
      (key % (water[0] - water[1])) <= 10
    )
  );

  const layers = useLayers(mode, waterData, filterMode);

  return (
    <>
      <FilterBar 
        setFilterMode={ setFilterMode }
        filterMode={ filterMode }
        show={ mode === 'country' }
      />
      <DeckGL
        effects={[lightingEffect]}
        initialViewState={ defaultViewState }
        viewState={ viewState }
        controller={true}
        layers={ layers }
      >
        <StaticMap 
          reuseMaps
          mapStyle={'mapbox://styles/mapbox/dark-v9'}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
    </>
  )
}

export default Map;