import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import group from 'images/squad.jpg';

const { Paragraph } = Typography;

const Container = styled.div`
  text-align: center;
  padding: 100px 0;

  > div {
    padding: 0 200px;
    font-size: 20px;
    margin-bottom: 20px;
  }

  > img {
    width: 70%;
  }

  @media (max-width: 800px) {
    > div {
      padding: 0 100px;
    }
    > img {
      width: 85%;
    }
  }

  @media (max-width: 500px) {
    > div {
      padding: 0 50px;
    }
    > img {
      width: 95%;
    }
  }
`;

const About = () => {
  return (
    <Container>
      <img src={ group } />
      <div>
        <Paragraph>
          The world is changing. With the impending climate crisis, the UN estimates that by 2050 there will be over a billion climate refugees. Nomad aims to empower these displaced persons to find their perfect home, so that they can set down new roots, without worry of further climate displacement for their children and children’s children. By processing NASA satellite data on elevation, land classification, and urban/fresh water locations, and combining it with climate models through to 2100, Nomad aims to provide users with simple, easy to understand measures of habitability for every location on Earth. By organizing this data into spatial trees, Nomad enables users to rapidly search through billions of points for those that closely match their criteria for a perfect home. Moreover, Nomad is scalable - the “branch and bound” search architecture ensures consistent performance, even if the number of searchable points increases by several orders of magnitude†. The Nomad web app also enables users to browse the raw satellite data at the locations that match their selected parameters. Stay tuned for new functionalities, the addition of new data sets (with a focus on socioeconomic factors) and more searchable countries!
        </Paragraph>
        <Paragraph>
          - Team NoMapp
        </Paragraph>
      </div>
    </Container>
  );
};

export default About;