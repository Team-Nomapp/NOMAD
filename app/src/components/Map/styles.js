import styled from 'styled-components';
import { Icon } from 'antd';

export const Bar = styled.div`
  position: fixed;
  left: 37%;
  top: 20px;
  z-index: 9999;
  font-size: 20px;


  > div {
    background-color: #fff;
    padding: 5px 5px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
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

    > hr {
      width: 100%;
      opacity: 0.5;
      margin-block-start: 0.2em;
      margin-block-end: 0.2em;
    }
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