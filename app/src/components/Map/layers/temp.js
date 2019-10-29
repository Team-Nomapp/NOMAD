import {ScreenGridLayer} from '@deck.gl/aggregation-layers';

const colorRange = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255]
];

export default function _renderLayers(data) {
  const cellSize = 20, gpuAggregation = true, aggregation = 'Sum';

  const mapped = data
    // .filter((d, key) => key % 100 === 0)
    .map(d => [
      Number(d.x), 
      Number(d.y),
      Number(d.tmax)
  ]);

  return [
    new ScreenGridLayer({
      id: 'grid',
      data: mapped,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      cellSizePixels: cellSize,
      colorRange,
      gpuAggregation,
      aggregation
    })
  ];
}