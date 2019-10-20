import React from 'react';
import { Anchor, Typography } from 'antd';
import { FormContainer, Form } from './styles';
import CountrySelect from '../../components/CountrySelect'; 
import LandSelect from '../../components/Land';
import Range from '../../components/Range';

const { Title } = Typography;
const { Item } = Form;
const { Link } = Anchor;

const label = str => <Title level={4}>{str}</Title>;

const FormPage = () => {
  return (
    <FormContainer>
      <Anchor targetOffset={ 300 }>
        <Link href="#form-country" title="Country" />
        <Link href="#form-land" title="Land" />
        <Link href="#form-range" title="Range" />
      </Anchor>
      <Form>
        <Item>
          <div id="form-country">
            { label("Select your destination country") }
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