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
      <Title>NOMAD</Title>
      <Paragraph>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
        a design language for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team. Ant Design, a design
        language for background applications, is refined by Ant UED Team. Ant Design, a design
        language for background applications, is refined by Ant UED Team.
      </Paragraph>
      <Form layout="inline" onSubmit={ handleSubmit }>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </HomeContainer>
  );
};

export default Home;