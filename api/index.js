require("dotenv").config();

const express = require('express');
const pgp = require('pg-promise')();
var cors = require('cors')
var bodyParser = require('body-parser');

const port = process.env.PORT || 4000;
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors({ origin: "*" }))

var cn = process.env.REACT_APP_POSTGRES_URL;
const db = pgp(cn);

const GENERAL_FILTER = `
  tmin_2100 > $/tmin/ AND 
  tmax_2100 < $/tmax/ AND
  land = $/land/ AND 
  slope > $/slopeMin/ AND
  slope < $/slopeMax/
`;

const extractParams = (params) => ({
  tmin: params.temperature[0],
  tmax: params.temperature[1],
  land: params.land,
  slopeMin: params.bumpy[0],
  slopeMax: params.bumpy[1]
});

const kmToLatLng = (km) => {
  // 1 point = 111.19 km
  const ratio = 1 / 111.19;
  return km * ratio;
}

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

app.get('/api/country', (req, res) => {
  db.multi(`
    SELECT * FROM country 
    WHERE 
      ${ GENERAL_FILTER }
  `, extractParams(req.query)).then(data => {
    res.json(getRandom(data[0], 10));
  }).catch(err => {
    console.log({ err });
  })
});

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
    res.json(data[0]);
  }).catch(err => {
    console.log({ err });
  })
});

app.listen(port, err => {
  if (err) throw err;
  console.log("API is up bitcheezzzzz");
});