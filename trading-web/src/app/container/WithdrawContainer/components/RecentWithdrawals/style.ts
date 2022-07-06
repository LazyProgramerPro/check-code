import styled from 'styled-components';
export const StyledContainer = styled.div`
  margin: 40px 0px 0px;
  min-width: 0px;
  width: 100%;
  @media screen and (min-width: 767px) {
    margin-top: 48px;
  }
  @media screen and (min-width: 1023px) {
    margin-top: 64px;
  }
  .wrapper-header {
    margin: 0px 0px 24px;
    min-width: 0px;
  }
`;
export const StyledHeader = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.background};
  .header-left {
    margin: 0px;
    min-width: 0px;
    display: flex;
    align-items: center;
    &--title {
      margin: 0px;
      min-width: 0px;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      @media screen and (min-width: 767px) {
        font-size: 24px;
        line-height: 32px;
      }
      @media screen and (min-width: 1023px) {
        line-height: 24px;
      }
    }
    &--tabs {
      margin: 0px 0px 0px 16px;
      min-width: 0px;
    }
  }
  .header-tab {
    margin: 0px;
    min-width: 0px;
    display: flex;
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.text};
    width: 74px;
    border-radius: 99999px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    &--icon {
      margin: 0px;
      min-width: 0px;
      cursor: pointer;
      width: 16px;
      height: 16px;
      svg {
        margin: 0px;
        min-width: 0px;
        color: ${({ theme }) => theme.colorDescription};
        font-size: 16px;
        fill: ${({ theme }) => theme.colorDescription};
        width: 1em;
        height: 1em;
        &:hover {
          color: ${({ theme }) => theme.background};
        }
      }
      .icon-active {
        color: ${({ theme }) => theme.background};
        fill: ${({ theme }) => theme.background};
      }
    }
    &--compartment {
      margin: 0px;
      min-width: 0px;
      width: 1px;
      height: 16px;
      background-color: ${({ theme }) => theme.matteWhiteColor};
    }
  }
  .header-right {
    margin: 0px;
    min-width: 0px;
    color: ${({ theme }) => theme.background};
    font-size: 14px;
    line-height: 20px;
    text-decoration: underline;
    &:active {
      text-decoration: none;
    }
  }
`;
