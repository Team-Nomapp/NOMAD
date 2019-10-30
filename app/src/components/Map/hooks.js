import { defaultViewState } from './helpers';
import { ALL_COUNTRIES } from 'state/data';

export const useMode = (country) => {
  if (!country) {
    return [ defaultViewState, 'default' ];
  } else {
    return [{
      breaing: 0,
      pitch: 30,
      zoom: 8,
      ...ALL_COUNTRIES[country].coordinates
    }, 'country'];
  }
}
