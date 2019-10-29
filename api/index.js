require("dotenv").config();

const express = require('express');
const pgp = require('pg-promise')();
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');

const port = process.env.PORT || 4000;
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors({ origin: "*" }))

var cn = process.env.REACT_APP_POSTGRES_URL;
const db = pgp(cn);

const extractParams = (params) => {
  return ({
    land: params.land,
  
    tmin: params.temperature[0],
    tmax: params.temperature[1],
    slopeMin: params.bumpy[0],
    slopeMax: params.bumpy[1],
    arableMin: params.arable[0],
    arableMax: params.arable[1],
    waterMin: params.water[0],
    waterMax: params.water[1],
    urbanMin: params.urban[0],
    urbanMax: params.urban[1]
  })
};

const kmToLatLng = (km) => {
  // 1 point = 111.19 km
  const ratio = 1 / 111.19;
  return km * ratio;
}

const extractTreeParams = (params) => ({
  minElevationDistribution: params.bumpy[0],
  maxElevationDistribution: params.bumpy[1],
  minFreshWaterProximity: params.water[0],
  maxFreshWaterProximity: params.water[1],
  minUrbanProximity: params.urban[0],
  maxUrbanProximity: params.urban[1],
  minArableProximity: params.arable[0],
  maxArableProximity: params.arable[1],
  minPredictedTempIncrease: params.temperature[0],
  maxPredictedTempIncrease: params.temperature[1]
})

/** {
    minElevationDistribution: 0.0,
    maxElevationDistribution: 10.0,
    minFreshWaterProximity: 0.4,
    maxFreshWaterProximity: 5.0,
    minUrbanProximity: 10.0,
    maxUrbanProximity: 30.0,
    minArableProximity: 0.4,
    maxArableProximity: 3.0,
    minPredictedTempIncrease: 300.0,
    maxPredictedTempIncrease: 304.0
  } */

app.get('/api/country', (req, res) => {
  const data = extractTreeParams(req.query);
  const url = 'https://aqueous-sea-22023.herokuapp.com/tree_search';

  axios.post(url, data)
  .then(function (response) {
    const ids = response.data.resultIndices; // [ 123, 345, ... ]
    db.multi(`
      SELECT * FROM country 
      WHERE 
        id = ANY($/ids/)
    `, { ids }).then(data => {
      res.json(data[0]);
    }).catch(err => {
      console.log({ err });
      res.json(err);
    })
  })
  .catch(function (error) {
    console.log({ error });
  });
});

// app.get('/api/country', (req, res) => {
//   const params = extractParams(req.query);
//   const { year } = req.query;
//   db.multi(`
//     SELECT * FROM country 
//     WHERE 
//       land = $/land/ AND 
//       tmin_${year} >= $/tmin/ AND 
//       tmax_${year} <= $/tmax/ AND
//       slope >= $/slopeMin/ AND
//       slope <= $/slopeMax/ AND
//       water_distance >= $/waterMin/ AND
//       water_distance <= $/waterMax/ AND
//       urban_distance >= $/urbanMin/ AND
//       urban_distance <= $/urbanMax/ AND
//       arable_distance >= $/arableMin/ AND
//       arable_distance <= $/arableMax/
//   `, params).then(data => {
//     const arr = data[0];
//     const random = getRandom(arr, arr.length < 10 ? arr.length : 10);
//     res.json(random);
//   }).catch(err => {
//     console.log({ err });
//     res.json(err);
//   })
// });

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

app.get('/api/country/region', (req, res) => {
  const
    lat = new Number(req.query.latitude),
    lon = new Number(req.query.longitude)

  db.multi(`
    SELECT * FROM country 
    WHERE
      y < $/maxLat/ AND 
      y > $/minLat/ AND
      x < $/maxLon/ AND 
      x > $/minLon/
  `, {
    maxLat: lat + kmToLatLng(10),
    minLat: lat - kmToLatLng(10),
    maxLon: lon + kmToLatLng(10),
    minLon: lon - kmToLatLng(10)
  }).then(data => {
    const arr = data[0];
    const ret = getRandom(arr, arr.length < 500 ? arr.length : 500);
    res.json(ret);
  }).catch(err => {
    console.log({ err });
  })
});

app.listen(port, err => {
  if (err) throw err;
  console.log("API is up bitcheezzzzz");
});