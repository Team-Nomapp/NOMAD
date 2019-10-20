import React, { useContext } from 'react';
import { _Context } from '../../App';
import { Slider as AntdSlider, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Slider = ({ type, item, max, min, title, description }) => {
  const { state, dispatch } = useContext(_Context);
  const value = state[item];

  const set = payload => 
    dispatch({type: 'UPDATE_'+type, payload});

  return (
    <>
      <Title style={{ fontSize: '15px', margin: '5px 0' }} level={4}>{title}</Title>
      <Paragraph style={{ lineHeight: '15px', maxWidth: 350 }}>{description}</Paragraph>
      <AntdSlider 
        style={{ width: 200, marginBottom: 20 }}
        range 
        defaultValue={[0, 100]} 
        value={value}
        max={max}
        min={min}
        onChange={ set }
      />
    </>
  )
}

const Range = () => {

  return (
    <>
      <Slider
        title="How close to water?"
        description="Proximity to water bodies: rivers, lakes, mangrove swamps, sea…"
        type="WATER"
        item="water"
        max={100}
        min={0}
      />
      <Slider 
        title="How bumpy?"
        description="Elevation distribution. Smaller numbers mean flatter terrains, larger numbers irregular terrains."
        type="BUMPY"
        item="bumpy"
        max={100}
        min={0}
      />
      <Slider 
        title="Temperature increase per year?"
        description="Climate change prediction. (ºC/year)"
        type="TEMPERATURE"
        item="temperature"
        max={100}
        min={0}
      />
      <Slider 
        title="How close to Urban Areas"
        description="Urban and Built-up Lands. Including building materials, asphalt, and vehicles. "
        type="URBAN"
        item="urban"
        max={100}
        min={0}
      />
    </>
  )
}

export default Range;