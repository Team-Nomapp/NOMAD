import {HeatmapLayer} from '@deck.gl/aggregation-layers';


export default function _renderLayers(data) {
  const intensity = 1, threshold = 0.03, radiusPixels = 20;

  const mapped = data
    .map(d => [
      Number(d.x), 
      Number(d.y),
      Number(d.tmax)
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