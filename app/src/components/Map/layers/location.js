import {PhongMaterial} from '@luma.gl/core';
import { ALL_COUNTRIES } from 'state/data';
import { IconLayer, TextLayer } from '@deck.gl/layers';
import {ColumnLayer} from '@deck.gl/layers';

const iconMapping = {
  marker: { x: 128, y: 0, width: 128, height: 128, mask: true }
};

const material = new PhongMaterial({
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
});

export default function _renderLayers(country, onHover) {
  
  const data = !country ? [] : [ALL_COUNTRIES[country]];

  const getPosition = [
    29.90625,
    -3.15625
  ];
  
  return [
    new ColumnLayer({
      id: 'column-layer-2',
      data,
      diskResolution: 12,
      radius: 2000,
      extruded: true,
      pickable: true,
      elevationScale: 5000,
      getPosition,
      material,
      getFillColor: d => [145, 100, 100, 255],
      getLineColor: d => [145, 213, 100],
      getElevation: d => 2,
      onHover: ({ object, x, y }) => {
        if (!object) {
          onHover(false);
        } else {
          onHover({ x, y });
        }
      },
    })
  ];
}