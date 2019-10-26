import React, { useReducer } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import { reducer, initialState } from './reducer';
import Home from './pages/Home';
import Form from './pages/Form';
import About from './pages/About';

export const _Context = React.createContext(null);

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  return (
    <_Context.Provider value={{ state, dispatch }}>
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/demo" component={Form} exact />
        <Route path="/about" component={About} exact />
      </Switch>
    </_Context.Provider>
  );
}

export default App;