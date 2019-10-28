import styled from 'styled-components';

export const SliderContainer = styled.div`
  > div.ant-slider {
    > div.ant-slider-mark {
      > span {
        &:first-child {
          left: 15% !important;
          font-size: 10px;
          white-space: nowrap;
        }
        &:nth-child(2) {
          left: 85% !important;
          font-size: 10px;
          white-space: nowrap;
        }
      }
    }
  }
`;