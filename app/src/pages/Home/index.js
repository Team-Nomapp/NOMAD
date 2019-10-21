import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Button } from 'antd';
import { HomeContainer } from './styles';
import { _Context } from '../../App';

const { Title, Paragraph } = Typography;

const Home = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/form");
  }

  return (
    <HomeContainer>
      <Title level={4}>What if the perfect location for you exists in your country, but you haven’t discovered it yet?</Title>
      <Paragraph style={{ marginBottom: 20, fontSize: 15 }}>
        Nomad facilitates the use of satellite data to all audiences. It focuses mainly on refugees and nomads, who are looking for an optimal and safe location to settle.
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