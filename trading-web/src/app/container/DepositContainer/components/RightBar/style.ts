import styled from 'styled-components';
export const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 40px 0px 0px;
  min-width: 0px;
  width: 100%;
  @media screen and (min-width: 767px) {
    width: 100%;
    margin-top: 48px;
  }
  @media screen and (min-width: 1023px) {
    width: 384px;
    margin-top: 0px;
  }
`;
export const DescSection = styled.div`
  margin: 0px;
  min-width: 0px;
  .desc-header {
    margin: 0px;
    min-width: 0px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.background};
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
        font-size: 16px;
        line-height: 24px;
      }
    }
    &--link {
      margin: 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-size: 14px;
      line-height: 20px;
      text-decoration: underline;
    }
  }
  .desc-content {
    margin: 24px 0px 16px;
    min-width: 0px;
    font-size: 14px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    line-height: 20px;
    ul {
      margin: 0px 0px 0px 24px;
      padding: 0px;
      li {
        display: list-item;
        text-align: -webkit-match-parent;
      }
    }
  }
  .desc-search-button {
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
    padding: 6px 12px;
    min-width: 52px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.background};
    min-height: 24px;
    border: none;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    border-radius: 99999px;
    &:hover {
      box-shadow: none;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
    }
    &:active {
      box-shadow: none;
      background-color: ${({ theme }) => theme.colorDescription};
      color: ${({ theme }) => theme.background};
    }
    svg {
      margin: 0px 0px 0px 4px;
      min-width: 0px;
      color: currentcolor;
      font-size: 20px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
`;
export const FAQSection = styled.div`
  box-sizing: border-box;
  margin: 40px 0px 0px;
  min-width: 0px;
  @media screen and (min-width: 767px) {
    margin-top: 48px;
  }
  @media screen and (min-width: 1023px) {
    margin-top: 40px;
  }
  .FAQ-header {
    margin: 0px;
    min-width: 0px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.background};
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
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  .FAQ-content {
    margin: 24px 0px 0px;
    min-width: 0px;
    .FAQ-link {
      margin: 16px 0px 0px;
      min-width: 0px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-decoration: underline;
      display: flex;
      cursor: pointer;
      align-items: center;
      color: ${({ theme }) => theme.darkBrightGrayColor};
      &--icon {
        margin: 0px 8px 0px 0px;
        min-width: 0px;
        width: 24px;
        height: 24px;
        svg {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          color: ${({ theme }) => theme.slateGrayColor};
          font-size: 24px;
          fill: rgb(146, 154, 165);
          width: 1em;
          height: 1em;
        }
      }
      &:hover {
        color: ${({ theme }) => theme.background};
        svg {
          color: ${({ theme }) => theme.background};
        }
      }
    }
  }
`;
