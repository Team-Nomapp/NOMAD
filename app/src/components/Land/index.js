import React, { useContext } from 'react';
import { Typography, Carousel } from 'antd';
import { _Context } from '../../App';
import { ALL_LANDS } from '../../data';
import { LandContainer } from './styles';

const { Title } = Typography;

const chunk_size = 3;

const chunks = ALL_LANDS.map( function(e,i){ 
  return i%chunk_size===0 ? ALL_LANDS.slice(i,i+chunk_size) : null; 
}).filter(function(e){ return e; });

const Land = () => {
  const { state: { land }, dispatch } = useContext(_Context);

  const setLand = payload => 
    dispatch({type: 'UPDATE_LAND', payload});
  
  return (  
    <div>
      <Carousel style={{ width: 400 }}>
        {chunks.map(chunk => (
          <div>
            <LandContainer>
              {chunk.map(({ title, description, value, img }) => (
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
                    { title }
                  </Title>
                  <p>{ description }</p>
                </div>
              ))}
            </LandContainer>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Land;