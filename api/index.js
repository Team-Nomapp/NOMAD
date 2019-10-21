const express = require('express');
const http = require('http');
const pgp = require('pg-promise')();
var cors = require('cors')
var bodyParser = require('body-parser');

const port = 4000;
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors({ origin: "*" }))

var cn = 'postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu';
const db = pgp(cn);

app.post('/', (req, res) => {
  params = req.body;
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

const server = http.createServer(app);
server.listen(port);