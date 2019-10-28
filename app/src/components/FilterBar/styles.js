import styled from 'styled-components';
import { Icon } from 'antd';

const ABSOLUTE_RIGHT = `
  position: absolute;
  left: calc(100% + 20px);
  z-index: 105;
  font-size: 20px;
`;

const BLOCK = `
  transition: all 0.2s;
  background-color: #fff;
  padding: 5px 5px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

export const Bar = styled.div`
  ${ABSOLUTE_RIGHT}
  top: 20px;

  > div {
    ${ BLOCK }
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 10px;
    

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
    }
  }
`;

export const BottomBar = styled.div`
  ${ABSOLUTE_RIGHT}
  bottom: 20px;

  > div {
    font-size: 12px;
    margin-bottom: 10px;
    height: 60px;
    ${ BLOCK }
  }
`;

export const I = styled(Icon)`
  cursor: pointer;
  opacity: ${({ selected }) => selected ? '1' : '0.7'};
  color: ${({ selected }) => selected ? '#707070' : '#bdbdbd'};
  &:hover {
    color: #bdbdbd !important;
  }
`;

export const A = styled.a`
  font-size: 10px;
  margin: 5px 0;
  opacity: ${({ selected }) => selected ? '1' : '0.7'};
  color: ${({ selected }) => selected ? '#707070' : '#bdbdbd'};
  &:hover {
    color: #bdbdbd !important;
    opacity: 1;
  }
`;