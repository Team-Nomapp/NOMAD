import {ScreenGridLayer} from '@deck.gl/aggregation-layers';

export const colorRange = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255]
];

export default function _renderLayers(show=false, data, year) {
  const cellSize = 20, gpuAggregation = true, aggregation = 'Sum';

  return [
    new ScreenGridLayer({
      id: 'grid',
      data: show ? data : [],
      getPosition: d => [
        Number(d.x), 
        Number(d.y)
      ],
      getWeight: d => d[`tmax_${year}`],
      cellSizePixels: cellSize,
      colorRange,
      gpuAggregation,
      aggregation,
      pickable: true
    })
  ];
}