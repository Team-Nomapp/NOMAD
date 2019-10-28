
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

export const buildQuery = (region = false) => {
  const url = process.env.NODE_ENV === "development" ?
    "http://localhost:4000/api" : "/api";
  
  return url + "/country" + (region ? "/region" : "");
};