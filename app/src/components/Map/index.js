import React, { useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import csvData from '../../newslopeData.csv';
import { _Context } from '../../App';
import { ALL_COUNTRIES } from '../../data';
import lightingEffect from './lighting';
import renderHeatMap from './heatmap';
import renderElevation from './elevation';
import FilterBar from './FilterBar';

import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieWFuaXZzaWxiZXJtYW4iLCJhIjoiY2sxeG94eG8xMGVzdzNub2N6dnRlaHB4MiJ9.4aYe5bEeBZbG_o8ZF7jo5g";


function processData(csvString) { 
  const { data } = Papa.parse(csvString);
  return data.slice(1).map(i => ({
    id: i[0],
    latitude: i[1],
    longitude: i[2],
    value: i[3],
    tmin: i[4],
    tmax: i[5]
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
  if (mode === 'country') {
    switch (filterMode) {
      case 'elevation':
        return renderElevation(data);
      default:
        return renderHeatMap(data)
    }
  };
  return [];
}

const Map = () => {
  const [ data, setResults ] = useState([]);
  const [ filterMode, setFilterMode ] = useState('temp');
  const { state: { country, region, land } } = useContext(_Context);
  const [ viewState, mode ] = useMode(country, region);

  useEffect(() => {
    fetchData()
  }, [ country ]);

  const fetchData = async () => {
    const result = await axios.get(csvData);
    const parsed = processData(result.data);
    setResults(parsed);
  };

  // filter data by selected land 
  const landData = !land ? data : data.filter((d, key) => {
    return Number(d.value) == Number(land);
  });

  // filter by ranges
  const layers = useLayers(mode, landData, filterMode);

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