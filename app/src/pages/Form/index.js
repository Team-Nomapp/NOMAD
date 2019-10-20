import React from 'react';
import { Anchor, Typography } from 'antd';
import { FormContainer, Form } from './styles';
import CountrySelect from '../../components/CountrySelect'; 
import LandSelect from '../../components/Land';
import Range from '../../components/Range';

const { Title, Paragraph } = Typography;
const { Item } = Form;
const { Link } = Anchor;

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
  return (
    <FormContainer>
      <Anchor targetOffset={ 100 }>
        <Link href="#form-country" title="Country" />
        <Link href="#form-land" title="Land" />
        <Link href="#form-range" title="Range" />
      </Anchor>
      <Form>
        <Item>
          <div id="form-country">
            { label("Select your destination country") }
            { p("In order to display the most suitable information for you, we’ll need to know some things first. Choose the country and the optimal livable places of the location will be displayed on the map. You can also click on your preferences editing the default choices, and personalize your destination.") }
            <CountrySelect />
          </div>
        </Item>
        <Item>
          <div id="form-land">
            { label("Select your land") }
            <LandSelect />
          </div>
        </Item>
        <Item>
          <div id="form-range">
            <Range />
          </div>
        </Item>
      </Form>
    </FormContainer>
  )
};

export default FormPage;