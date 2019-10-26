import styled from 'styled-components';

export const LandContainer = styled.div`
  overflow: scroll;
  height: 300px;
  width: 100%;

  > div {
    width: 100%;
    margin-bottom: 30px;
    cursor: pointer;
    opacity: 0.5;

    > div.land-card-img {
      width: 100%;
      height: 100px;
    }

    > p {
      font-size: 8px;
      line-height: 10px;
    }

    &:hover {
      opacity: 1;
    }
  }
`;