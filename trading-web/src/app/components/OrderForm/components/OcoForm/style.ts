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
