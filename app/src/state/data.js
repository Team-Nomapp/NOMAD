
export const ALL_YEARS = [
  '2020',
  '2050',
  '2100'
];

export const MAP_MODES = [
  'temperature',
  'elevation'
];

export const MAP_STYLES = {
  'light': 'mapbox://styles/mapbox/light-v10?optimize=true'
};

export const ALL_COUNTRIES = {
  burundi: { 
    label: 'Burundi', 
    coordinates: {
      longitude: 29.9189,
      latitude: -3.3731,
      zoom: 8
    },
    rest: {
      land: 25,
      bumpy: [10, 40],
      water: [10, 60],
      temperature: [295 - 273.15, 303 - 273.15],
      urban: [20, 100]
    }
  }
}

export const ALL_LANDS = [
  {
    title: "Barren",
    value: 1,
    description: ">60% of area is non-vegetated barren (sand, rock, soil) or permanent snow/ice with less than 10% vegetation.",
    img: "https://nomapp.s3.amazonaws.com/images/barren.jpg"
  },
  {
    title: "Permanent Snow and Ice ",
    value: 2,
    description: ">60% of area is covered by snow and ice for at least 10 months of the year. ",
    img: "https://nomapp.s3.amazonaws.com/images/snow.jpg"
  },
  {
    title: "Dense Forests",
    value: 10,
    description: "Tree cover >60% (canopy >2m).",
    img: "https://nomapp.s3.amazonaws.com/images/forest.jpg"
  },
  {
    title: "Open Forests",
    value: 20,
    description: "Tree cover 10-60% (canopy >2m). ",
    img: "https://nomapp.s3.amazonaws.com/images/forest.jpg"
  },
  {
    title: "Forest / Cropland Mosaics",
    value: 25,
    description: "Mosaics of small-scale cultivation 40-60% with >10% natural tree cover.",
    img: "https://nomapp.s3.amazonaws.com/images/cropland.jpg"
  },
  {
    title: "Natural Herbaceous",
    value: 30,
    description: "Dominated by herbaceous annuals (<2m). At least 10% cover.",
    img: "https://nomapp.s3.amazonaws.com/images/herb.jpg"
  },
  {
    title: "Croplands Mosaics",
    value: 35,
    description: "Mosaics of small-scale cultivation 40-60% with natural shrub or herbaceous vegetation.",
    img: "https://nomapp.s3.amazonaws.com/images/mosiac.jpg"
  },
  {
    title: "Herbaceous Croplands",
    value: 36,
    description: "Dominated by herbaceous annuals (<2m). At least 60% cover. Cultivated fraction >60%.",
    img: "https://nomapp.s3.amazonaws.com/images/herb.jpg"
  },
  {
    title: "Shrublands",
    value: 40,
    description: "Shrub cover >60% (1-2m).",
    img: "https://nomapp.s3.amazonaws.com/images/Shrubland.jpg"
  }
];