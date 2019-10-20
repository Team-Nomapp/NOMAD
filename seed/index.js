const pgp = require('pg-promise')();

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
var cn = 'postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu';
const db = pgp(cn);

db.one('SELECT * FROM country WHERE id = 2').then(res => {
  console.log({ res });
}).catch(err => {
  console.log({ err });
});

// fs.createReadStream('final_database.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     var cn = 'postgres://crxnqdqu:kInJllQCS3PgB8ISVP8J13nfC9qNiB_E@salt.db.elephantsql.com:5432/crxnqdqu';
//     const db = pgp(cn);

//     const cs = new pgp.helpers.ColumnSet(
//       ['id', 'x', 'y', 'slope', 'dem', 'land', 'tmin_2100', 'tmax_2100'], 
//       {table: 'country'}
//     );

//     // data input values:
//     const values = results.map(i => ({
//       id: i.ID,
//       x: i.X, 
//       y: i.Y, 
//       slope: i.slope, 
//       dem: i.dem === 'NA' ? 0 : i.dem, 
//       land: i.land, 
//       tmin_2100: i.Tmin_2100, 
//       tmax_2100: i.Tmax_2100
//     }));

//     // generating a multi-row insert query:
//     const query = pgp.helpers.insert(values, cs);

//     db.none('TRUNCATE TABLE country').then(() => {
//       db.one(query).then(res => {
//         console.log({ res });
//       }).catch(err => {
//         console.log({ err });
//       });
//     })
//   });

// // // db.none(`
// // //   CREATE TABLE country (
// // //     id          int CONSTRAINT firstkey PRIMARY KEY,
// // //     x           double precision NOT NULL,
// // //     y           double precision NOT NULL,
// // //     slope       double precision NOT NULL,
// // //     dem         integer NOT NULL,
// // //     land        integer NOT NULL,
// // //     tmin_2100   double precision NOT NULL,
// // //     tmax_2100   double precision NOT NULL
// // //   )
// // // `)
// // //     .then(results => {
// // //         console.log(results);
// // //     })
// // //     .catch(error => {
// // //         console.log(error);
// // //     });