import { defaultViewState } from './helpers';
import { ALL_COUNTRIES } from '../../data';
import { renderElevation, renderTemperature, renderHeatMap } from './layers';

export const useMode = (country, region) => {
  if (!country && !region) {
    return [defaultViewState, 'default'];
  } else if (!!country && !region) {
    // available regions mode
    return [{
      ...defaultViewState,
      pitch: 45,
      ...ALL_COUNTRIES[country].coordinates
    }, 'country'];
  } else {
    // specific region mode
    return [{
      ...defaultViewState,
      pitch: 60,
      ...region.coordinates
    }, 'region'];
  }
}

export const useLayers = (mode, data, filterMode) => {
  if (mode === 'country') {
    switch (filterMode) {
      case 'elevation':
        return renderElevation(data);
      case 'temp':
        return renderTemperature(data);
      default:
        return renderHeatMap(data)
    }
  };
  return [];
};