// import { ALL_COUNTRIES } from 'state/data';
// import { IconLayer, TextLayer } from '@deck.gl/layers';

// const iconMapping = {
//   marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
// };

// export default function _renderLayers(country) {
  
//   const data = !country ? [] : [ALL_COUNTRIES[country]];
//   console.log({ data });
//   return [
//     // new IconLayer({
//     //   data,
//     //   pickable: true,
//     //   wrapLongitude: true,
//     //   billboard: true,
//     //   getPosition: d => [
//     //     new Number(d.coordinates.latitude),
//     //     new Number(d.coordinates.longitude)
//     //   ],
//     //   iconAtlas: 'https://deck.gl/images/icon-atlas.png',
//     //   iconMapping,
//     //   // onHover: this._onHover,
//     //   id: 'icon',
//     //   getIcon: d => 'marker',
//     //   getColor: d => [145, 213, 255],
//     //   getSize: d => 10,
//     //   sizeUnits: 'meters',
//     //   sizeScale: 10
//     // }),
//     // new TextLayer({
//     //   id: 'you-are-here',
//     //   data,
//     //   getText: d => "You are here",
//     //   getPosition: d => [
//     //     new Number(d.coordinates.latitude),
//     //     new Number(d.coordinates.longitude)
//     //   ],
//     //   getColor: d => [29, 145, 192],
//     //   getSize: d => 10,
//     //   sizeScale: 1
//     // })
//   ];
// }



// // const ICON_MAPPING = {
// //   marker: {x: 128, y: 0, width: 128, height: 128, mask: true}
// // };

// // export default (show, data, { onHover, onClick }) => {

// //   return [
// //     new IconLayer({
// //       id: 'icon-layer',
// //       data: show ? data : [],
// //       billboard: true,
// //       pickable: true,
// //       iconAtlas: 'https://deck.gl/images/icon-atlas.png',
// //       iconMapping: ICON_MAPPING,
// //       getIcon: d => 'marker',
// //       sizeScale: 10,
// //       getPosition: d => [
// //         Number(d.x),
// //         Number(d.y)
// //       ],
// //       getSize: d => 10,
// //       getColor: d => [145, 213, 255],
// //       onHover,
// //       onClick: onClick('region')
// //     })
// //   ];
// // };