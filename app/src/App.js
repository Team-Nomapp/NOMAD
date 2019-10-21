import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useTransition, animated } from 'react-spring';
import { Col } from 'antd';

import './App.css';

import { Row } from './styles';
import { reducer, initialState } from './reducer';
import useRouter from './useRouter';
import Map from './components/Map';
import Home from './pages/Home';
import Form from './pages/Form';

export const _Context = React.createContext(null);

function App() {
  const { location } = useRouter();
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <_Context.Provider value={{ state, dispatch }}>
      <Row>
        <Col span={12}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/form" component={Form} exact />
          </Switch>
        </Col>
        <Col span={12} style={{
          position: 'fixed',
          right: '0px',
          top: '0px',
          height: '100vh',
          width: '50%'
        }}>
          <Map />
        </Col>
      </Row>
    </_Context.Provider>
  );
}

export default App;