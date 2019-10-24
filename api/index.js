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

app.get('/api', (req, res) => {
  params = req.query;
  db.multi(`
    SELECT * FROM country 
    WHERE 
      tmin_2100 > $1 AND 
      tmax_2100 < $2 AND
      land = $3 AND 
      slope > $4 AND
      slope < $5;
  `, [
    params.temperature[0], // min
    params.temperature[1], // max
    params.land,
    params.bumpy[0], //min
    params.bumpy[1] // max
  ]).then(data => {
    res.json(data[0]);
  }).catch(err => {
    console.log({ err });
  });
});

app.listen(port);