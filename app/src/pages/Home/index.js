import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Button } from 'antd';

import { HomeContainer } from './styles';

const { Title, Paragraph } = Typography;

const Home = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/demo");
  }

  return (
    <HomeContainer>
      <Title level={4}>Find Home.</Title>
      <Paragraph style={{ marginBottom: 20, fontSize: 15 }}>
        We search every corner of the globe for your ideal habitat, so you can focus on turning it from a habitat to a home.
      </Paragraph>
      <Form layout="inline" onSubmit={ handleSubmit }>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get Started
          </Button>
        </Form.Item>
      </Form>
    </HomeContainer>
  );
};

export default Home;