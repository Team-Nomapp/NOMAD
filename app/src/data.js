

export const ALL_COUNTRIES = {
  iceland: { 
    label: 'Iceland',
    coordinates: {
      longitude: -64.9631,
      latitude: -19.0208
    }
  },
  burundi: { 
    label: 'Burundi', 
    coordinates: {
      longitude: 3.3731,
      latitude: 29.9189
    }
  }
}

export const ALL_LANDS = [
  {
    title: "Barren",
    value: 1,
    description: ">60% of area is non-vegetated barren (sand, rock, soil) or permanent snow/ice with less than 10% vegetation."
  },
  {
    title: "Permanent Snow and Ice ",
    value: 2,
    description: ">60% of area is covered by snow and ice for at least 10 months of the year. "
  },
  {
    title: "Dense Forests",
    value: 10,
    description: "Tree cover >60% (canopy >2m)."
  },
  {
    title: "Open Forests",
    value: 20,
    description: "Tree cover 10-60% (canopy >2m). "
  },
  {
    title: "Forest/Cropland Mosaics",
    value: 25,
    description: "Mosaics of small-scale cultivation 40-60% with >10% natural tree cover."
  },
  {
    title: "Natural Herbaceous",
    value: 30,
    description: "Dominated by herbaceous annuals (<2m). At least 10% cover."
  },
  {
    title: "Natural Herbaceous/Croplands Mosaics",
    value: 35,
    description: "Mosaics of small-scale cultivation 40-60% with natural shrub or herbaceous vegetation."
  },
  {
    title: "Herbaceous Croplands",
    value: 36,
    description: "Dominated by herbaceous annuals (<2m). At least 60% cover. Cultivated fraction >60%."
  },
  {
    title: "Shrublands",
    value: 40,
    description: "Shrub cover >60% (1-2m)."
  }
];