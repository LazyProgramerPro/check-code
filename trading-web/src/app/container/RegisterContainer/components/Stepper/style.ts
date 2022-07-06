import styled from 'styled-components';
export const Container = styled.div`
  @media screen and (min-width: 767px) {
    margin-left: 0px;
  }
  @media screen and (min-width: 1023px) {
    margin-left: 228px;
  }
`;
export const Step = styled.div`
  display: flex;
  .step_marker_column {
    position: relative;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.brightBlackColor};
    user-select: none;
    .step-counter {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 16px;
    }
  }
  .step-title {
    margin: 0px 0px 0px 8px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.grayColor};
    white-space: nowrap;
  }
`;
export const Steps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 140px;
  .line {
    margin: 0px;
    min-width: 0px;
    width: 4px;
    left: 18px;
    flex: 1 1 0%;
    position: relative;
    background-color: ${({ theme }) => theme.brightBlackColor};
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 4px;
      background-color: inherit;
    }
    &[data-status='process'] {
      background-color: ${({ theme }) => theme.primary};
    }
  }
  .bn-steps-step {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    position: static;
    color: ${({ theme }) => theme.grayColor};
    padding: 8px;
    -webkit-box-flex: 0;
    flex-grow: 0;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    &[data-status='process'] {
      .step_marker_column {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.backgroundFooter};
      }
      .step-title {
        color: ${({ theme }) => theme.matteWhiteColor};
      }
    }
  }
`;
