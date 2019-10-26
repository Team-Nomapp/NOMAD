import React from 'react';
import { Col } from 'antd';

import { Row } from './styles';
import Form from './Form';
import Map from '../../components/Map';

function FormPage() {
  return (
    <Row>
      <Col style={{ left: 0 }}>
        <Form />
      </Col>
      <Col style={{ right: 0 }}>
        <Map />
      </Col>
    </Row>
  );
}

export default FormPage;