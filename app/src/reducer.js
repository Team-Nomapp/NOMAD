import { ALL_COUNTRIES, ALL_YEARS } from './data';

export const initialState = {
  country: null,
  region: null,
  land: null,
  year: ALL_YEARS[0],
  bumpy: [0, 50],
  water: [0, 100],
  temperature: [295, 303],
  urban: [0, 100]
};

export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_YEAR':
      return {
        ...state,
        year: action.payload
      };
    case 'UPDATE_COUNTRY':
      return {
        ...state,
        country: action.payload,
        ...ALL_COUNTRIES[action.payload].rest
      };
    case 'UPDATE_LAND':
      return { 
        ...state,
        land: action.payload
      };
    case 'UPDATE_BUMPY':
      return { 
        ...state,
        bumpy: action.payload
      };
    case 'UPDATE_WATER':
      return { 
        ...state,
        water: action.payload
      };
    case 'UPDATE_TEMPERATURE':
      return { 
        ...state,
        temperature: action.payload
      };
    case 'UPDATE_REGION':
      return { 
        ...state,
        region: action.payload
      };
    case 'UPDATE_URBAN':
      return {
        ...state,
        urban: action.payload
      }
    default:
      throw new Error();
  }
}