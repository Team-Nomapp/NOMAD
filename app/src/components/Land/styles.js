import styled from 'styled-components';

export const LandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 100px;
    margin-right: 30px;
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