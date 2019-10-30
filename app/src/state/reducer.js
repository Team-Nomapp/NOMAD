import { ALL_COUNTRIES, ALL_YEARS, MAP_STYLES, MAP_MODES } from './data';

export const initialState = {
  window: {
    isMobile: null,
    height: window.innerHeight,
    width: window.innerWidth
  },  
  map: {
    mode: MAP_MODES[0],
    style: MAP_STYLES.light
  },
  collapsed: false,
  country: null,
  land: null,
  year: ALL_YEARS[0],
  bumpy: [0, 60],
  water: [0.4, 174],
  temperature: [297 - 273.15, 307 - 273.15],
  urban: [0.4, 170],
  arable: [0, 185]
};

export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_STYLE':
      return {
        ...state,
        map: {
          ...state.map,
          style: action.payload
        }
      }
    case 'UPDATE_COLLAPSED':
      return {
        ...state,
        collapsed: action.payload
      };
    case 'UPDATE_MAP_MODE':
      return {
        ...state,
        map: {
          ...state.map,
          mode: action.payload
        }
      };
    case 'UPDATE_WINDOW':
      return {
        ...state,
        window: action.payload
      };
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
    case 'UPDATE_ARABLE':
      return { 
        ...state,
        arable: action.payload
      };
    case 'UPDATE_URBAN':
      return { 
        ...state,
        urban: action.payload
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
    case 'UPDATE_URBAN':
      return {
        ...state,
        urban: action.payload
      }
    default:
      throw new Error();
  }
}