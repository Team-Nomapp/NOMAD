import styled from 'styled-components';
import { Form as AntdForm, Row as AntdRow } from 'antd';

export const Row = styled(AntdRow)`
  > div.ant-col {
    transition: all 0.2s;
    
    &:first-child {
      padding-top: 50px;
      transition: all 0.2s;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      z-index: 100;
      background-color: #fff;
      border-radius: 8px;
      width: 35%;
      position: fixed;
      left: 20px;
      top: 20px;
      bottom: 20px;
      transform: translateX(${({ collapsed }) => collapsed ? 'calc(-100% - 20px)' : '0'});
      min-width: 320px;
    }

    &:nth-child(2) {
      // width: ${({ isMobile }) => isMobile ? '100%' : '66%'};
      width: 100%;
      height: 100vh;
    }
  }
`;

export const FormContainer = styled.div`
  padding-left: 30px;
`

const T = `calc(100vh - 40px - 50px)`

export const Form = styled(AntdForm)`
  overflow: hidden;
  height: ${T};

  > div.ant-tabs {
    height: ${T};

    > div.ant-tabs-content {
      height: ${T};
      display: flex !important;
      align-items: center !important;
      border: none;
      padding: 0 !important;

      > div.ant-tabs-tabpane-inactive {
        width: 0px !important;
        height: 0px !important;
      }
    }

    > div.ant-tabs-bar {
      height: ${T};
      box-shadow: 0 0 -6px rgba(0,0,0,0.16);
      border: none;

      > div.ant-tabs-nav-container {
        > div.ant-tabs-nav-wrap {
          display: flex !important;
          align-items: center !important;

          > div > div {
            > div.ant-tabs-ink-bar {
              display: none !important;
            }

            > div {
              > div.ant-tabs-tab {
                font-size: 20px;
                text-align: center;
                opacity: 0.5 !important;
  
                > i {
                  margin: auto;
                }
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
  }
`;