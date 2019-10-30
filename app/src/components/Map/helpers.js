
export const defaultViewState = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
  pitch: 0,
  bearing: 0
};

export const processData = (data, year) => {
  return data.map(i => ({
    ...i,
    tmin_2100: i.tmin_2100 - 273.15,
    tmax_2100: i.tmax_2100 - 273.15,
    tmin_2050: i.tmin_2050 - 273.15,
    tmax_2050: i.tmax_2020 - 273.15,
    tmin_2020: i.tmin_2020 - 273.15,
    tmax_2020: i.tmax_2020 - 273.15,
    tmin: i[`tmin_${year}`] - 273.15,
    tmax: i[`tmax_${year}`] - 273.15
  }))
};

export const buildQuery = () => {
  const url = process.env.NODE_ENV === "development" ?
    "http://localhost:4000/api" : "/api";
  
  return url + "/country";
};

export const groupByPolygons = data => {
  let ret = [];
  for (let i of data) {
    // check if similar to previous
    const prev = ret.length === 0 ? undefined : ret[ret.length - 1];
    const x = new Number(i.x);
    const y = new Number(i.y);
    const dem = new Number(i.dem);

    const similarToPrevious = ret.length === 0 ? false : prev.geometry.coordinates.length < 6;

    if (similarToPrevious) {
      const sumDem = items => {
        const keys = Object.keys(items);
        return keys.reduce((acc, cur) => acc + items[cur].dem, 0)
      }

      ret[ret.length - 1] = {
        ...prev,
        properties: {
          dem: (dem + sumDem(prev.properties.items)) / (prev.geometry.coordinates.length + 1),
          items: {
            ...prev.properties.items, [ i.id ]: i
          }
        },
        geometry: {
          ...prev.geometry,
          coordinates: [ ...prev.geometry.coordinates, [ x, y ] ]
        }
      }
    } else {
      ret = [ ...ret, {
        type: "Feature",
        properties: { dem, items: { [ i.id ]: i } },
        geometry: { type: "Polygon", coordinates: [[ x, y ]] }
       } 
      ]
    }
  }

  return ret;
}

// {
//   "type": "Feature",
//   "geometry": { 
//     "type":"Polygon",
//     "coordinates":[
//       [
//         [-123.0249569,49.2407190],
//         [-123.0241582,49.2407165],
//         [-123.0240445,49.2406847],
//         [-123.0239311,49.2407159],
//         [-123.0238530,49.2407157],
//         [-123.0238536,49.2404548],
//         [-123.0249568,49.2404582],
//         [-123.0249569,49.2407190]
//       ]
//     ]
//   },
//   "properties":{
//     "valuePerSqm":4563,
//     "growth":0.3592
//   }
// }