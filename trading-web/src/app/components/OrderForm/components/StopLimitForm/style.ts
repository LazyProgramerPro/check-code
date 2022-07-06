import styled from 'styled-components';
export const ColLeft = styled.div`
  flex: 1 1 0%;
  padding-right: 32px;
  .balance {
    box-sizing: border-box;
    margin: 0px 0px 8px 0px;
    min-width: 0px;
    padding-top: 10px;
    display: flex;
    font-size: 14px;
    &-name {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.grayColor};
      font-size: 12px;
      height: 16px;
    }
    &-coin {
      margin: 0px;
      min-width: 0px;
      flex: 1 1 0%;
      text-align: right;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      font-size: 12px;
      height: 16px;
    }
  }
`;
export const ColRight = styled.div`
  flex: 1 1 0%;
  .balance {
    box-sizing: border-box;
    margin: 0px 0px 8px 0px;
    min-width: 0px;
    padding-top: 10px;
    display: flex;
    font-size: 14px;
    &-name {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.grayColor};
      font-size: 12px;
      height: 16px;
    }
    &-coin {
      margin: 0px;
      min-width: 0px;
      flex: 1 1 0%;
      text-align: right;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      font-size: 12px;
      height: 16px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  flex-wrap: nowrap;
  .second-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > div {
      display: inline-block;
      width: 50%;
      padding: 0 5px;
    }
  }

  .first-content {
    display: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (min-width: 1199px) {
    .first-content {
      display: none;
    }
  }

  @media only screen and (max-width: 1199px) {
    .first-content {
      display: block;
      & > div {
        padding-right: 0;
      }
    }
    .second-content {
      display: none;
    }
  }

  @media only screen and (max-width: 991px) {
    .first-content {
      display: none;
    }
    .second-content {
      display: block;
      flex-direction: row;
      padding: 0 5px;

      & > div {
        display: inline-block;
        width: 50%;
        padding: 0 5px;
      }
    }
  }
`;
