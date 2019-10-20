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
      <Title level={4}>{title}</Title>
      <Paragraph>{description}</Paragraph>
      <AntdSlider 
        style={{ width: 200 }}
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
        title="Distance from water"
        description="..."
        type="WATER"
        item="water"
        max={100}
        min={0}
      />
      <Slider 
        title="Bumpiness"
        description="..."
        type="BUMPY"
        item="bumpy"
        max={100}
        min={0}
      />
      <Slider 
        title="Temperature increase"
        description="..."
        type="TEMPERATURE"
        item="temperature"
        max={100}
        min={0}
      />
    </>
  )
}

export default Range;