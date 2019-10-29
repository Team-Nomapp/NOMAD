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

export default function _renderLayers(data) {

  const 
    radius = 500, 
    upperPercentile = 100, 
    coverage = 1;

  const mapped = data.map(d => [
    Number(d.x), 
    Number(d.y)
  ]);
  

  return [
    new HexagonLayer({
      id: 'heatmap',
      colorRange,
      coverage,
      data: mapped,
      elevationRange: [0, 500],
      elevationScale: data && data.length ? 20 : 0,
      extruded: true,
      getPosition: d => d,
      // onHover: this.props.onHover,
      opacity: 1,
      // pickable: Boolean(this.props.onHover),
      radius,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 500
      }
    })
  ];
}