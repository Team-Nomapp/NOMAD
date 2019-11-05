import React from 'react';
import { notification, Icon } from 'antd';

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

export const buildQuery = () => {
  const url = process.env.NODE_ENV === "development" ?
    "http://localhost:8000/tree_search" : process.env.REACT_APP_TREE_SEARCH_API + "tree_search";
  
  return url;
};

export const groupByRegions = data => {
  let ret = [];
  for (let i of data) {
    // check if similar to previous
    const prev = ret.length === 0 ? undefined : ret[ret.length - 1];
    const x = new Number(i.x);
    const y = new Number(i.y);

    const similarToPrevious = !prev ? false : arePointsNear(
      { x: prev.avgX, y:prev.avgY },
      i,
      40
    );

    if (similarToPrevious) {
      const summer = items => {
        return items.reduce((acc, cur) => {
          return {
            x: acc.x ? acc.x + cur.x : cur.x,
            y: acc.y ? acc.y + cur.y : cur.y
          }
        }, {})
      }

      const sum = summer([...prev.geometry, { x, y }]);
      const len = prev.geometry.length + 1;

      ret[ret.length - 1] = {
        avgX: sum.x / len,
        avgY: sum.y / len,
        items: {
          ...prev.items, 
          [ i.id ]: i
        },
        geometry: [ ...prev.geometry, { x, y } ]
      }
    } else {
      ret = [ 
        ...ret, 
        {
          avgX: x,
          avgY: y,
          items: { [ i.id ]: i },
          geometry: [{ x, y }]
        }
      ]
    }
  }

  return ret;
}

export const arePointsNear = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.x / 180.0) * ky;
  var dx = Math.abs(centerPoint.y - checkPoint.y) * kx;
  var dy = Math.abs(centerPoint.x - checkPoint.x) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

export const createNotification = (doCreate=false) => {
  if (!doCreate) return;
  notification.open({
    message: 'Warning',
    description:
      'There are no results for these settings.',
    duration: 0,
    icon: <Icon type="warning" theme="twoTone" />
  });
}

export const getWikiData = (data, setWiki) => {
  const WIKI_URL = 'https://en.wikipedia.org/w/api.php?';
  const QUERY = 'action=query&origin=*';
  const getWiki = async ({ x, y }) => {
    const NEARBY_URL = 
      WIKI_URL + 
      QUERY + 
      `&prop=coordinates|pageimages|description|info` +
      `&inprop=url` +
      `&pithumbsize=144` +
      `&generator=geosearch` +
      `&ggsradius=10000` +
      `&ggslimit=100` +
      `&ggscoord=${y}|${x}` +
      `&format=json`;
    const response = await fetch(NEARBY_URL)
    const json = await response.json();
    return json;
  }

  if (data.length > 0) {
    setTimeout(async () => {
      const grouped = groupByRegions(data);
      let wikiData = [];
      for (let g in grouped) {
        const group = grouped[g];
        const wiki = await getWiki({ x: group.avgX, y: group.avgY });
        if (wiki.query) {
          wikiData = [ 
            ...wikiData, 
            ...Object.values(wiki.query.pages).slice(0, 5)
          ]
        }
      }
      setWiki(wikiData);
    }, 0);
  }
}

export function extractTreeParams(params) {
  return ({
    land: params.land.toString(),
    
    minElevationDistribution: params.bumpy[0] - 0.01,
    maxElevationDistribution: params.bumpy[1],
    minFreshWaterProximity: params.water[0] - 0.01,
    maxFreshWaterProximity: params.water[1],
    minUrbanProximity: params.urban[0] - 0.01,
    maxUrbanProximity: params.urban[1],
    minArableProximity: params.arable[0] - 0.01,
    maxArableProximity: params.arable[1],
    minPredictedTempIncrease: params.temperature[0] - 0.01,
    maxPredictedTempIncrease: params.temperature[1]
  })
}