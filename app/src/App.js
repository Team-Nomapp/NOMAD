import React, { useState, useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useTransition, animated } from 'react-spring';
import axios from 'axios';
import { Col } from 'antd';
import './App.css';

import { Row } from './styles';
import { reducer, initialState } from './reducer';
import useRouter from './useRouter';
import Map from './components/Map';
import Home from './pages/Home';
import Form from './pages/Form';

const apiUrl = 'http://localhost:4000';

const initialViewState = {
  longitude: 43.2473,
  latitude: 11.7172,
  zoom: 0,
  pitch: 0,
  bearing: 0
};

const data = [{
  sourcePosition: [-122.41669, 37.7853], 
  targetPosition: [-122.41669, 37.781]
}];

export const _Context = React.createContext(null);

function App() {
  const { location } = useRouter();
  const [ results, setResults ] = useState([]);
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const fetchData = async () => {
    const result = await axios.get(apiUrl, {
      params: state
    });
    setResults(result.data);
  };

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
          <Map 
            data={data}
            initialViewState={initialViewState}
          />
        </Col>
      </Row>
    </_Context.Provider>
  );
}

export default App;