import React, { useContext, useState, useEffect } from 'react';
import { Tabs, Typography, Icon } from 'antd';
import CountrySelect from 'components/CountrySelect'; 
import LandSelect from 'components/Land';
import Range from 'components/Range';
import { _Context } from 'App';

import { FormContainer, Form } from './styles';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Item } = Form;

const label = str => <Title level={4}>{str}</Title>;
const p = str => (
  <Paragraph style={{
    width: "80%",
    lineHeight: "17px"
  }}>
    {str}
  </Paragraph>
);

const FormPage = () => {
  const [ key, setKey ] = useState("1");
  const { state: { country, collapsed } } = useContext(_Context);

  const handleTabSelect = k => {
    if (!!country) {
      return setKey(k);
    }
  }

  useEffect(() => {
    handleTabSelect("2");
  }, [ country ])

  return (
    <FormContainer>
      <Form>
        <Tabs 
          tabPosition={'right'} 
          activeKey={key}
          onTabClick={ handleTabSelect }
        >
          <TabPane 
            tab={(<Icon type="flag" />)}
            key="1"
          >
            <Item>
              <div id="form-country">
                { label("Select your destination country") }
                { p("In order to display the most suitable information for you, we’ll need to know some things first. Choose the country and the optimal livable places of the location will be displayed on the map. You can also click on your preferences editing the default choices, and personalize your destination.") }
                <CountrySelect />
              </div>
            </Item>
          </TabPane>
          <TabPane 
            tab={(<Icon type="picture" />)}
            key="2" 
            disabled={!country} 
            style={{ width: '100%' }}
          >
            <Item>
              <div id="form-land">
                <LandSelect />
              </div>
            </Item>
          </TabPane>
          <TabPane 
            tab={(<Icon type="sliders" />)}
            key="3" 
            disabled={!country}
          >
            <Item>
              <div id="form-range">
                <Range />
              </div>
            </Item>
          </TabPane>
        </Tabs>
      </Form>
    </FormContainer>
  )
};

export default FormPage;