import styled from 'styled-components';
import { Link as DomLink } from 'react-router-dom';

export const Bar = styled.div`
  position: fixed;
  background: transparent;
  top: 0;
  left: 50px;
  right: 66%;
  height: 100px;
  display: flex;
  align-items: center;
  z-index: 101;
  transform: translateX(-7px);

  > img {
    height: 30px;
    cursor: pointer;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Link = styled(DomLink)`
  opacity: ${({ selected }) => selected ? '1' : '0.4'};
  transform: translateY(-2px);
  margin-left: 20px;
  color: black;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 1;
  }
`;