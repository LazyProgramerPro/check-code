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
