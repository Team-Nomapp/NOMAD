import { GreatCircleLayer } from 'deck.gl';
import { IconLayer, TextLayer } from '@deck.gl/layers';
import icon from '../../../images/map-marker-alt-solid.svg';

const iconMapping = {
  marker: { x: 0, y: 0, width: 200, height: 200, mask: true }
};

export default function _renderLayers({ latitude, longitude }) {
  const data = [
    {
      from: {
        coordinates: [
          Number(longitude),
          Number(latitude)
        ]
      },
      to: {
        coordinates: [
          Number(latitude),
          Number(longitude)
        ]
      }
    }
  ]
  return [
    // new IconLayer({
    //   data: [[
    //     Number(longitude), 
    //     Number(latitude)
    //   ]],
    //   pickable: true,
    //   wrapLongitude: true,
    //   getPosition: d => d,
    //   iconAtlas: icon,
    //   iconMapping,
    //   // onHover: this._onHover,
    //   id: 'icon',
    //   getIcon: d => 'marker',
    //   sizeUnits: 'meters',
    //   sizeScale: 2000,
    //   sizeMinPixels: 6
    // }),
    // new GreatCircleLayer({
    //   id: 'great-circle-layer',
    //   data,
    //   pickable: true,
    //   getStrokeWidth: 12,
    //   getSourcePosition: d => d.from.coordinates,
    //   getTargetPosition: d => d.to.coordinates,
    //   getSourceColor: [64, 255, 0],
    //   getTargetColor: [0, 128, 200],
    //   // onHover: ({object, x, y}) => {
    //   //   const tooltip = `${object.from.name} to ${object.to.name}`;
    //   // }
    // }),
    // new TextLayer({
    //   id: 'you-are-here',
    //   data: [],
    //   getText: d => "You are here",
    //   getPosition: x => [
    //     Number(longitude), 
    //     Number(latitude)
    //   ],
    //   getColor: d => [29, 145, 192],
    //   getSize: d => 50,
    //   sizeScale: 32 / 20
    // })
  ];
}