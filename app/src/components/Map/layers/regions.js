import { ScatterplotLayer } from '@deck.gl/layers';
 
// const ALL_REGIONS = {
//   Bujumbura: { x: -3.383333, y: 29.366667 },
//   Cankuzo: { x: -3.383333, y: 29.366667 },
//   Gitega: { x: -3.383333, y: 29.366667 },
//   Rutana: { x: -3.383333, y: 29.366667 },
//   Ruyigi: { x: -3.383333, y: 29.366667 },
//   Northern: { x: -3.383333, y: 29.366667 },
//   Karuzi: { x: -3.383333, y: 29.366667 },
//   Kayanza: { x: -3.383333, y: 29.366667 },
//   Kirundo: { x: -3.383333, y: 29.366667 },
//   Muyinga: { x: -3.383333, y: 29.366667 },
//   Ngozi: { x: -3.383333, y: 29.366667 },
//   Southern: { x: -3.383333, y: 29.366667 },
//   Bururi: { x: -3.383333, y: 29.366667 },
//   Makamba: { x: -3.383333, y: 29.366667 },
//   Rumonge: { x: -3.383333, y: 29.366667 },
//   Western: { x: -3.383333, y: 29.366667 },
//   Bubanza: { x: -3.383333, y: 29.366667 },
//   Cibitoke: { x: -3.383333, y: 29.366667 },
//   Muramvya: { x: -3.383333, y: 29.366667 },
//   Mwaro: { x: -3.383333, y: 29.366667 }
// }

// const closeRegions = {};
  
// // go through data, parse list of wiki_page_ids in range of data
// for (let key of Object.keys(ALL_REGIONS)) {
//   const coordinates = ALL_REGIONS[key];
//   for (let i of data) {
//     // check if data is close to region
//     if (arePointsNear(i, coordinates, 10)) {
//       closeRegions[key] = coordinates;
//       continue;
//     }
//   }
// }


const minRadius = 500;
const getRadius = d => d.length / 5;

export default function _renderLayers(data, onHover) {

  return [
    // new ScatterplotLayer({
    //   id: 'scatterplot-layer',
    //   data,
    //   pickable: true,
    //   opacity: 0.1,
    //   stroked: true,
    //   filled: true,
    //   radiusScale: 6,
    //   radiusMinPixels: 1,
    //   radiusMaxPixels: 100,
    //   lineWidthMinPixels: 1,
    //   getPosition: d => {
    //     if (!d.coordinates || d.coordinates.length === 0) return [];
    //     return [
    //       d.coordinates[0].lon,
    //       d.coordinates[0].lat
    //     ];
    //   },
    //   getRadius,
    //   getFillColor: d => [145, 213, 100],
    //   getLineColor: d => [0, 0, 0],
    //   onHover: ({ object, x, y }) => {
    //     if (!object) {
    //       onHover(false);
    //     } else {
    //       onHover({ object, x, y });
    //     }
    //   }
    // })
  ];
}