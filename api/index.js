require("dotenv").config();

const express = require('express');
const pgp = require('pg-promise')();
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');

const { extractTreeParams, extractParams, kmToLatLng, getRandom } = require('./helpers');

const port = process.env.PORT || 4000;
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors({ origin: "*" }))

const db = pgp(process.env.REACT_APP_POSTGRES_URL);

app.get('/api/country', (req, res) => {
  const data = extractTreeParams(req.query);

  axios.post(process.env.TREE_SEARCH_API, data)
  .then(function (response) {
    const ids = response.data.resultIndices; // [ 123, 345, ... ]
    db.multi(`
      SELECT * FROM country 
      WHERE 
        id = ANY($/ids/) AND
        land = $/land/
      LIMIT 10;
    `, { ids, land: req.query.land.toString() }).then(data => {
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

app.get('/api/country/region', (req, res) => {
  const { year } = req.query;
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
    minLon: lon - kmToLatLng(10),
    ...extractParams(req.query)
  }).then(data => {
    res.json(data[0]);
  }).catch(err => {
    console.log({ err });
  })
});

app.listen(port, err => {
  if (err) throw err;
  console.log("API is up bitcheezzzzz");
});