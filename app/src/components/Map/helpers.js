
export const defaultViewState = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
  pitch: 0,
  bearing: 0
};

export const processData = (data) => {
  console.log({ data });
  return data.map(i => ({
    id: i.id,
    latitude: i.y,
    longitude: i.x,
    value: i.slope,
    tmin: i.tmin_2100,
    tmax: i.tmax_2100
  }))
};

export const buildQuery = (region = false) => {
  const url = process.env.NODE_ENV === "development" ?
    "http://localhost:4000/api" : "/api";
  
  return url + "/country" + (region ? "/region" : "");
};