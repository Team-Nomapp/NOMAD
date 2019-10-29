import {PhongMaterial} from '@luma.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

import { groupByPolygons } from '../helpers';

// const colorRange = [
//   [14,64,111],
//   [17,94,122],
//   [21,127,133],
//   [25,144,125],
//   [29,154,108],
//   [29,154,108],
//   [58,168,107],
//   [88,182,112],
//   [118,196,124],
//   [155,210,148],
//   [192,223,178],
//   [222,236,209]
// ];

export const colorRange = [
  [255, 255, 178, 160],
  [254, 217, 118, 160],
  [254, 178, 76, 160],
  [253, 141, 60, 160],
  [240, 59, 32, 160],
  [189, 0, 38, 160]
];

const material = new PhongMaterial({
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
});

export default function _renderLayers(data, { onHover }) {
  const 
    radius = 500, 
    upperPercentile = 100, 
    coverage = 1;

  return [
    new HexagonLayer({
      id: 'heatmap',
      colorRange,
      coverage,
      data,
      elevationRange: [0, 2662],
      elevationScale: data && data.length ? 10 : 0,
      extruded: true,
      pickable: true,
      getPosition: d => [
        Number(d.x), 
        Number(d.y)
      ],
      getColorWeight: d => d.dem,
      getElevationValue: ([ obj ]) => obj.dem,
      onHover: ({ object, x, y }) => {
        if (!object) {
          onHover({});
        } else {
          onHover({
            object: object.points[0],
            x,
            y
          })
        }
      },
      opacity: 1,
      radius,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 500
      }
    })
  ];
}