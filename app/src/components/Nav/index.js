import React from 'react';
import styled from 'styled-components';
import { useHistory, Link as DomLink } from 'react-router-dom';
import logo from '../../images/logo.png';

const Bar = styled.div`
  position: fixed;
  background: transparent;
  top: 0;
  left: 50px;
  right: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  z-index: 999;

  > img {
    height: 30px;
    cursor: pointer;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
`;

const Link = styled(DomLink)`
  opacity: ${({ selected }) => selected ? '1' : '0.4'};
  transform: translateY(-2px);
  margin-left: 20px;
  color: black;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Nav = () => {
  const history = useHistory();

  const p = history.location.pathname;
  return (
    <Bar>
      <img 
        src={ logo }
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