import styled from 'styled-components';
export const ColLeft = styled.div`
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
export const Button = styled.button`
  margin: 8px 0px 0px;
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  padding: 6px 12px;
  min-width: 52px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  min-height: 24px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: white;
  &[data-type='buyButton'] {
    background-color: ${({ theme }) => theme.brightGreenColor};
    &:hover {
      box-shadow: none;
      background-color: ${({ theme }) => theme.darkWashedGreen};
    }
  }
  &[data-type='sellButton'] {
    background-color: ${({ theme }) => theme.redColor};
    &:hover {
      box-shadow: none;
      background-color: ${({ theme }) => theme.middleWashedRose};
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
      }
    }
  }
`;
