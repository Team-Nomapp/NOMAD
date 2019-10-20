import { ALL_COUNTRIES } from './data';

export const initialState = {
  country: null,
  land: null,
  bumpy: [0, 100],
  water: [0, 100],
  temperature: [0, 100]
};

export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_COUNTRY':
      return { 
        country: action.payload
      };
    case 'UPDATE_LAND':
      return { 
        land: action.payload
      };
    case 'UPDATE_BUMPY':
      return { 
        bumpy: action.payload
      };
    case 'UPDATE_WATER':
      return { 
        water: action.payload
      };
    case 'UPDATE_TEMPERATURE':
      return { 
        temperature: action.payload
      };
    default:
      throw new Error();
  }
}