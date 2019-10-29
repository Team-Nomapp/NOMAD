import {PhongMaterial} from '@luma.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
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
      // getElevationValue: ([ dem ]) => dem,
      onHover: ({ object, x, y }) => {
        object && onHover({
          object: object.points[0],
          x,
          y
        })
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