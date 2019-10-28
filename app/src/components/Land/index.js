import React from 'react';
import { Typography, Icon, Popover } from 'antd';
import useContext from 'hooks/useContext';
import { ALL_LANDS } from 'state/data';
import { LandContainer } from './styles';

const { Title } = Typography;

const Land = () => {
  const { state: { land }, dispatch } = useContext();

  const setLand = payload => 
    dispatch({type: 'UPDATE_LAND', payload});
  
  return (  
    <div>
      <LandContainer>
        {ALL_LANDS.map(({ title, description, value, img }) => (
          <div 
            key={ title }
            onClick={() => land === value ? setLand(null) : setLand(value)}
          >
            <div 
              className="land-card-img"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                border: land === value && "5px solid #91d5ff"
              }}
            />
            <Title style={{ 
              fontSize: 12,
              margin: "5px 0"
            }}>
              <Popover content={(<p style={{ maxWidth: 200 }}>{ description }</p>)}>
                <Icon type="question-circle" style={{ marginRight: 5 }} />
              </Popover>
              { title }
            </Title>
          </div>
        ))}
      </LandContainer>
    </div>
  );
}

export default Land;