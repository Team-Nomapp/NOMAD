import React from 'react';
import { useHistory } from 'react-router-dom';
import useContext from 'hooks/useContext';

import { Bar, Link } from './styles';

const Nav = () => {
  const history = useHistory();
  const { state: { collapsed } } = useContext();
  
  const p = history.location.pathname;

  return collapsed ? null : (
    <Bar>
      <img 
        src={ "https://nomapp.s3.amazonaws.com/images/logo.png" }
        onClick={() => history.push("/")}
      />
      <Link to="/demo" selected={p === "/demo"}>
        Demo
      </Link>
      <Link to="/about" selected={p === "/about"}>
        About Us 
      </Link>
    </Bar>
  )
};

export default Nav;