import React, { useContext } from 'react';
import { _Context } from '../../App';
import { ALL_COUNTRIES } from '../../data';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieWFuaXZzaWxiZXJtYW4iLCJhIjoiY2sxeG94eG8xMGVzdzNub2N6dnRlaHB4MiJ9.4aYe5bEeBZbG_o8ZF7jo5g";

const Map = ({
  data
}) => {
  const { state: { country } } = useContext(_Context);

  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  const latLng = !!country ? ALL_COUNTRIES[country].coordinates : {
    latitude: 0,
    longitude: 0
  };

  return (
    <DeckGL
      initialViewState={{
        latitude: 0,
        longitude: 0,
        zoom: 0,
        pitch: 0,
        bearing: 0
      }}
      viewState={{
        ...latLng,
        zoom: country ? 3 : 0,
        pitch: 0,
        bearing: 0
      }}
      controller={true}
      layers={layers}
    >
      <StaticMap 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
}

export default Map;