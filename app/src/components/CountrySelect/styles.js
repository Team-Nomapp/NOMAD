import styled from 'styled-components';
import { Select as AntdSelect } from 'antd';

export const Select = styled(AntdSelect)`
  background-color: transparent !important;
  > div {
    background-color: transparent !important;
    > span > i {
      color: #fff !important;
    }
  }
`