import React, { useState, useEffect } from 'react';
import useContext from 'hooks/useContext';
import { Popover, Icon, Slider as AntdSlider, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Slider = ({ type, item, max, min, title, description }) => {
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
    <>
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
      />
    </>
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
      />
      <Slider 
        title="How bumpy?"
        description="Elevation distribution. Smaller numbers mean flatter terrains, larger numbers irregular terrains."
        type="BUMPY"
        item="bumpy"
        max={60}
        min={0}
      />
      <Slider 
        title="Temperature increase per year?"
        description="Climate change prediction. (ºC/year)"
        type="TEMPERATURE"
        item="temperature"
        max={307}
        min={297}
      />
      <Slider 
        title="Urban proximity"
        description="Distance to the nearest city (km)"
        type="URBAN"
        item="urban"
        max={170}
        min={0.4}
      />
      <Slider 
        title="Arable land proximity"
        description="Distance to the arable land (km)"
        type="ARABLE"
        item="arable"
        max={185}
        min={0}
      />
    </div>
  )
}

export default Range;