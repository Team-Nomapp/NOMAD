const express = require('express')
const app = express();
const pgp = require('pg-promise')();
const port = 4000
var cors = require('cors')
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors({ origin: "*" }))

var cn = 'postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu';
const db = pgp(cn);

app.post('/', (req, res) => {
  params = req.body;
  console.log(params);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))