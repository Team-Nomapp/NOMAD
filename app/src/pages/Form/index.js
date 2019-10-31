import React from 'react';
import { Col } from 'antd';

import useContext from 'hooks/useContext';
import Map from 'components/Map';
import FilterBar from 'components/FilterBar';

import { Row } from './styles';
import Form from './Form';

function FormPage() {
  const { 
    state: { collapsed, window: { isMobile } }
  } = useContext();

  return (
    <Row collapsed={collapsed} isMobile={isMobile}>
      <Col>
        <FilterBar />
        <Form />
      </Col>
      <Col>
        <Map />
      </Col>
    </Row>
  );
}

export default FormPage;