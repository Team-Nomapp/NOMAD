import styled from 'styled-components';
import { Form as AntdForm, Row as AntdRow } from 'antd';

export const Row = styled(AntdRow)`
  > div.ant-col {
    &:first-child {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      z-index: 100;
      background-color: #fff;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &:nth-child(2) {
      width: 67%;
    }

    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 35%;
  }
`;

export const FormContainer = styled.div`
  padding-left: 50px;
`

export const Form = styled(AntdForm)`
  height: 100vh;

  > div.ant-tabs {
    height: 100vh;

    > div.ant-tabs-content {
      height: 100vh;
      display: flex !important;
      align-items: center !important;

      > div.ant-tabs-tabpane-inactive {
        width: 0px !important;
        height: 0px !important;
      }
    }

    > div.ant-tabs-bar {
      height: 100vh;
      box-shadow: 0 0 -6px rgba(0,0,0,0.16);

      > div.ant-tabs-nav-container {
        > div.ant-tabs-nav-wrap {
          display: flex !important;
          align-items: center !important;

          > div > div > div {
            > div.ant-tabs-tab {
              opacity: 0.5 !important;
            }

            > div.ant-tabs-tab-active {
              opacity: 1 !important;
              color: #333 !important;
            }
          }
        }
      }
    }
  }
`;

// div.ant-form-item {
//   height: 100vh;
//   display: flex;
//   align-items: center;
  
//   > div {
//     display: flex;
//     flex-direction: column;
//   }
// }