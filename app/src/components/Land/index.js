import React, { useContext } from 'react';
import { Typography, Icon, Popover } from 'antd';
import { _Context } from '../../App';
import { ALL_LANDS } from '../../data';
import { LandContainer } from './styles';

const { Title } = Typography;

const Land = () => {
  const { state: { land }, dispatch } = useContext(_Context);

  const setLand = payload => 
    dispatch({type: 'UPDATE_LAND', payload});
  
  return (  
    <div>
      <LandContainer>
        {ALL_LANDS.map(({ title, description, value, img }) => (
          <div 
            key={ title }
            style={{ 
              opacity: land === value && 1
            }}
            onClick={() => land === value ? setLand(null) : setLand(value)}
          >
            <div 
              className="land-card-img"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
              }}
            />
            <Title style={{ 
              fontSize: 12,
              margin: "5px 0"
            }}>
              <Popover style={{ maxWidth: 200 }} content={(<p>{ description }</p>)}>
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