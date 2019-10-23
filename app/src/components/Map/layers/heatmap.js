import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {CompositeLayer} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';


const squash = data => {
  let ret = [];
  for (let i of data) {
    const k = ret.find(r => (
      Math.abs(r.latitude - i.latitude) < 0.1 &&
      Math.abs(r.longitude - i.longitude) < 0.1
    ))
    if (!k) {
      ret = [ ...ret, i ]
    }
  }
  return ret;
}

export default function _renderLayers(data) {
  const intensity = 1, threshold = 0.03, radiusPixels = 20;

  const mapped = data
    .filter((d, key) => key % 1000 === 0)
    .map(d => [
      Number(d.longitude), 
      Number(d.latitude),
      Number(d.value)
  ]);

  return [
    new HeatmapLayer({
      data: mapped,
      id: 'heatmp-layer',
      opacity: 1,
      pickable: false,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      radiusPixels,
      intensity,
      threshold
    }),
    // new IconLayer(
    //   this.getSubLayerProps({
    //     id: 'icon',
    //     data: squash(data),
    //     iconAtlas,
    //     iconMapping,
    //     sizeScale,
    //     getPosition: d => d.geometry.coordinates,
    //     getIcon: d => getIconName(d.properties.cluster ? d.properties.point_count : 1),
    //     getSize: d => getIconSize(d.properties.cluster ? d.properties.point_count : 1)
    //   })
    // )
  ];
}