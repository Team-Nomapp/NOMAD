import styled from 'styled-components';
import { Form as AntdForm } from 'antd';

export const FormContainer = styled.div`
  padding: 0 50px;
`

export const Form = styled(AntdForm)`
  > div.ant-form-item {
    height: 100vh;
    display: flex;
    align-items: center;
    
    > div {
      display: flex;
      flex-direction: column;
    }
  }
`;