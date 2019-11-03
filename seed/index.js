const pgp = require('pg-promise')();

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
var cn = 'postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu';
const db = pgp(cn);

// db.one('SELECT * FROM country WHERE id = 2').then(res => {
//   console.log({ res });
// }).catch(err => {
//   console.log({ err });
// });

// db.one('SELECT COUNT(*) FROM country').then(res => {
//   console.log({ res });
// }).catch(err => {
//   console.log({ err });
// });


fs.createReadStream('all_data_with_water_urban_arable_distance_fixed.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const cs = new pgp.helpers.ColumnSet(
      ['id', 'x', 'y', 'slope', 'dem', 'land', 'tmin_2100', 'tmax_2100', 'tmin_2050', 'tmax_2050', 'tmin_2020', 'tmax_2020', 'water_distance', 'urban_distance', 'arable_distance'], 
      {table: 'country'}
    );

    // data input values:
    const values = results.map(i => ({
      id: i.ID,
      x: i.X, 
      y: i.Y, 
      slope: i.slope, 
      dem: i.dem === 'NA' ? 0 : i.dem, 
      land: i.land, 
      tmin_2100: i.Tmin_2100, 
      tmax_2100: i.Tmax_2100,
      tmin_2050: i.Tmin_2050,
      tmax_2050: i.Tmax_2050,
      tmin_2020: i.Tmin_2020,
      tmax_2020: i.Tmax_2020,
      water_distance: i.Water_distance_km,
      urban_distance: i.Distance_to_urban_km,
      arable_distance: i.Distance_to_arable_km
    }));

    // generating a multi-row insert query:
    const query = pgp.helpers.insert(values, cs);

    db.none('TRUNCATE TABLE country').then(() => {
      db.one(query).then(res => {
        console.log({ res });
      }).catch(err => {
        console.log({ err });
      });
    })
  });



// db.none(`
//   TRUNCATE TABLE country;
// `)
//     .then(results => {
//         console.log({results});
//     })
//     .catch(error => {
//         console.log({error});
//     });