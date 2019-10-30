import { defaultViewState } from './helpers';
import { ALL_COUNTRIES } from 'state/data';
import { renderRegions, renderElevation, renderTemperature, renderHeatMap } from './layers';

export const useMode = (country, region) => {
  if (!country && !region) {
    return [defaultViewState, 'default'];
  } else if (!!country && !region) {
    // available regions mode
    return [{
      breaing: 0,
      pitch: 30,
      zoom: 8,
      ...ALL_COUNTRIES[country].coordinates
    }, 'country'];
  } else {
    // specific region mode
    const regional = [{
      breaing: 0,
      pitch: 50,
      longitude: region.x,
      latitude: region.y,
      zoom: 10
    }, 'region'];

    return regional;
  }
}

export const useLayers = (
  loading,
  mode, 
  filterMode, 
  { data, onClick, onHover }
) => {
  if (loading) return [];
  if (mode === 'country') {
    return renderRegions(data, { onHover, onClick });
  } else if (mode === 'region') {
    switch (filterMode) {
      case 'elevation':
        return renderElevation(data, { onHover, onClick });
      case 'temperature':
        return renderTemperature(data, { onHover, onClick });
      default:
        return renderHeatMap(data, { onHover, onClick })
    }
  };
  return [];
};