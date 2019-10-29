
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

function kmToLatLng(km) {
  // 1 point = 111.19 km
  const ratio = 1 / 111.19;
  return km * ratio;
}

function extractParams(params) {
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

function extractTreeParams(params) {
  return ({
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
}

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

  module.exports = {
    extractTreeParams,
    extractParams,
    kmToLatLng,
    getRandom
  }