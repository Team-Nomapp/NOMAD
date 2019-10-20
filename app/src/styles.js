import styled from 'styled-components';

import { Row as AntdRow } from 'antd';

export const Row = styled(AntdRow)`
  > div.ant-col {
    height: 100vh;
  }
`;