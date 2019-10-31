import styled from 'styled-components';

export const LandContainer = styled.div`
  overflow: scroll;
  height: 500px;
  width: 100%;
  margin-top: 100px;
  padding-bottom: 50px;

  > div {
    width: 100%;
    margin-bottom: 30px;
    cursor: pointer;
    opacity: 1;

    > div.land-card-img {
      width: 100%;
      height: 100px;
    }

    > p {
      font-size: 8px;
      line-height: 10px;
    }

    &:hover {
      > div.land-card-img {
        border: 1px solid #91d5ff;
      }
    }
  }
`;