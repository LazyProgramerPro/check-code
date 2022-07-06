import styled from 'styled-components';
export const App = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundWallet};
  display: flex;
  flex-direction: column;
`;
export const Parameter = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  border-radius: 0px;
  box-shadow: none;
  background-color: ${({ theme }) => theme.text};
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  flex-wrap: wrap;
  @media screen and (min-width: 767px) {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 8px;
  }
  @media screen and (min-width: 1023px) {
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 16px;
  }
  .content {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.matteWhiteColor};
    align-items: flex-end;
    flex-flow: row wrap;
    flex: 1 1 0%;
  }
`;
export const LeftParameter = styled.div`
  box-sizing: border-box;
  margin: 16px 8px 16px 0px;
  min-width: 300px;
  flex: 1 0 100%;
  @media screen and (min-width: 767px) {
    margin-right: 32px;
    min-width: 460px;
    flex: 1 0 100%;
  }
  @media screen and (min-width: 1023px) {
    min-width: 460px;
    flex: 1 0 35%;
  }
  .title {
    margin: 0px 0px 8px;
    min-width: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    @media screen and (min-width: 767px) {
      margin-bottom: 12px;
    }
    &--text {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      /* color: rgb(30, 35, 41); */
    }
    &--icon {
      margin: 0px;
      appearance: none;
      user-select: none;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      box-sizing: border-box;
      font-family: inherit;
      text-align: center;
      text-decoration: none;
      outline: none;
      padding: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      word-break: keep-all;
      color: ${({ theme }) => theme.brightBlackColor};
      min-height: 24px;
      border: none;
      min-width: auto;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 4px;
      .show-icon {
        margin: 0px;
        min-width: 0px;
        color: currentcolor;
        font-size: 16px;
        fill: currentcolor;
        width: 1em;
        height: 1em;
      }
    }
  }
  .amount {
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-flow: column nowrap;
    @media screen and (min-width: 767px) {
      flex-direction: row;
    }
    &-coin {
      margin: 0px;
      min-width: 0px;
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-end;
      &--number {
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        @media screen and (min-width: 767px) {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
        }
      }
      &--name {
        margin: 0px 0px 0px 4px;
        min-width: 0px;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        @media screen and (min-width: 767px) {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
    &-money {
      margin: 4px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.grayColor};
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      white-space: nowrap;
      @media screen and (min-width: 767px) {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        margin-left: 12px;
      }
    }
  }
`;
export const RightParameter = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  min-width: 300px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1 0 40%;
  @media screen and (min-width: 767px) {
    flex-wrap: wrap;
    min-width: 400px;
  }
  @media screen and (min-width: 1023px) {
    flex-wrap: nowrap;
    min-width: 600px;
  }
`;
export const Balance = styled.div`
  margin: 16px 8px 16px 0px;
  min-width: 155px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  @media screen and (min-width: 767px) {
    margin-right: 32px;
    min-width: auto;
  }
`;
export const BalanceName = styled.div`
  margin: 0px 0px 8px;
  min-width: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  .balance--name-text {
    margin: 0px 8px 0px 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;
export const BalanceNumber = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-flow: column nowrap;
  .amount-coin {
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    &--number {
      margin: 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      @media screen and (min-width: 767px) {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }
    }
    &--name {
      margin: 0px 0px 0px 4px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      @media screen and (min-width: 767px) {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
  .amount-money {
    margin: 0px;
    min-width: 0px;
    color: ${({ theme }) => theme.slateGrayColor};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }
`;
export const SpotAccountPnl = styled.div`
  margin: 16px 32px 16px 0px;
  min-width: 0px;
  display: flex;
  cursor: pointer;
  position: relative;
  flex-direction: column;
  &:hover {
    .tooltip-box {
      opacity: 1;
      visibility: visible;
    }
  }
  .title {
    margin: 0px 0px 8px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.background};
    display: inline-flex;
    align-items: center;
    &-text {
      margin: 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.slateGrayColor};
      border-bottom: 1px dashed ${({ theme }) => theme.slateGrayColor};
      white-space: nowrap;
    }
    &-icon {
      margin: 0px 0px 0px 4px;
      min-width: 0px;
      display: flex;
      height: 24px;
      width: 24px;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      svg {
        margin: 0px;
        min-width: 0px;
        color: ${({ theme }) => theme.background};
        font-size: 16px;
        fill: ${({ theme }) => theme.background};
        width: 1em;
        height: 1em;
      }
    }
  }
`;
export const FirstLinePnl = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  align-items: flex-start;
  @media screen and (min-width: 1023px) {
    align-items: flex-end;
  }
  .content-section {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: ${({ theme }) => theme.background};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    @media screen and (min-width: 767px) {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
    .content-main {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: ${({ theme }) => theme.graySmokeColor};
    }
  }
`;
export const SecondLinePnl = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  .content-section {
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.slateGrayColor};
    @media screen and (min-width: 767px) {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    .content-main {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.graySmokeColor};
      @media screen and (min-width: 767px) {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;
export const Tooltip = styled.div`
  position: absolute;
  left: -140px;
  top: -110px;
  transition: opacity 120ms ease-in-out 0s, transform 120ms ease-in-out 0s;
  opacity: 0;
  transform: translate3d(0px, -6px, 0px);
  visibility: hidden;
  margin: 0px;
  box-sizing: content-box;
  position: absolute;
  width: max-content;
  word-break: normal;
  z-index: 1400;
  min-width: 0px;
  max-width: 296px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.darkGrayColor};
  border-radius: 4px;
  padding: 8px 12px;
  filter: drop-shadow(rgba(20, 21, 26, 0.08) 0px 3px 6px)
    drop-shadow(rgba(71, 77, 87, 0.08) 0px 7px 14px)
    drop-shadow(rgba(20, 21, 26, 0.1) 0px 0px 1px);
  .bn-tooltip-arrow {
    position: absolute;
    right: 100px;
    bottom: -4px;
    width: 8px;
    height: 8px;
    z-index: -1;
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      z-index: -1;
      display: block;
      background-color: ${({ theme }) => theme.darkGrayColor};
      transform: rotate(45deg);
    }
  }
  .gap-fill {
    position: absolute;
    display: block;
    bottom: -8px;
    left: 0px;
    width: 100%;
    height: 8px;
  }
`;
