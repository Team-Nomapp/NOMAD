import React, { useReducer, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { reducer, initialState } from 'state/reducer';

import Nav from 'components/Nav';

import Home from 'pages/Home';
import Form from 'pages/Form';
import About from 'pages/About';

export const _Context = React.createContext(null);

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'UPDATE_WINDOW', 
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: window.innerWidth < 550
      }});
    }

    // run method initially
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => { 
      window.removeEventListener('resize', handleResize);
    }
  }, []);

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