import React, { useState, useEffect } from 'react';
import useContext from 'hooks/useContext';
import { Popover, Icon, Slider as AntdSlider, Typography } from 'antd';
import { SliderContainer } from './styles';

const { Title, Paragraph } = Typography;

const Slider = ({ type, item, max, min, title, description, unit }) => {
  const { state, dispatch } = useContext();
  const value = state[item];
  const [ stateValue, setStateValue ] = useState(value);

  useEffect(() => {
    if (value !== stateValue) {
      setStateValue(value);
    }
  }, [ value ]);

  const set = () => 
    dispatch({type: 'UPDATE_'+type, payload: stateValue });

  return (
    <SliderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        <Popover content={(
            <Paragraph style={{ lineHeight: '15px', maxWidth: 250 }}>{description}</Paragraph>
          )}>
          <Icon type="question-circle" style={{ marginRight: 10 }} />
        </Popover>
        <Title style={{ fontSize: '15px', flex: 1, margin: 0 }} level={4}>{title}</Title>
      </div>
      <AntdSlider 
        style={{ width: 150, marginBottom: 20 }}
        range 
        defaultValue={stateValue} 
        value={stateValue}
        max={max}
        min={min}
        onChange={ setStateValue }
        onAfterChange={ set }
        marks={{
          [min]: `${min} ${unit}`,
          [max]: `${max} ${unit}`
        }}
      />
    </SliderContainer>
  )
}

const Range = () => {

  return (
    <div style={{ marginTop: 50 }}>
      <Slider
        title="How close to water?"
        description="Proximity to water bodies: rivers, lakes, mangrove swamps, sea…"
        type="WATER"
        item="water"
        max={174}
        min={0.4}
        unit="km"
      />
      <Slider 
        title="How bumpy?"
        description="Elevation distribution. Smaller numbers mean flatter terrains, larger numbers irregular terrains."
        type="BUMPY"
        item="bumpy"
        max={60}
        min={0}
        unit="m"
      />
      <Slider 
        title="Max temperature"
        description="Climate change prediction. (ºC/year)"
        type="TEMPERATURE"
        item="temperature"
        max={34}
        min={23}
        unit="C"
      />
      <Slider 
        title="Urban proximity"
        description="Distance to the nearest city (km)"
        type="URBAN"
        item="urban"
        max={170}
        min={0.4}
        unit="km"
      />
      <Slider 
        title="Arable land proximity"
        description="Distance to the arable land (km)"
        type="ARABLE"
        item="arable"
        max={187}
        min={0}
        unit="km"
      />
    </div>
  )
}

export default Range;