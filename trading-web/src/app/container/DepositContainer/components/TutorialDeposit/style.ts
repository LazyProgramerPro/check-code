import styled from 'styled-components';
import { Alert } from 'react-bootstrap';

export const StyledAlert = styled(Alert)`
  box-sizing: border-box;
  margin: 0px 0px 24px;
  min-width: 0px;
  .content-wrapper {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    border-radius: 8px;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 16px;
    @media screen and (min-width: 767px) {
      padding: 24px;
    }
    .content-avarta {
      box-sizing: border-box;
      margin: 0px 24px 24px 0px;
      min-width: 0px;
      max-width: 100%;
      width: 64px;
      height: 64px;
    }
  }
  .btn-close {
    padding: 11px 28px;
    outline: none;
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.text};
    }
    &:focus {
      box-shadow: none;
    }
  }
`;
export const MainContent = styled.div`
  box-sizing: border-box;
  margin: -8px 0px 0px -8px;
  min-width: 0px;
  order: 2;
  flex: 1 1 auto;
  width: 100%;
  @media screen and (min-width: 767px) {
    order: 1;
    flex: 1 1 0%;
    margin-top: -28px;
  }
  @media screen and (min-width: 767px) {
    width: auto;
  }
  .content-desc {
    box-sizing: border-box;
    margin: 24px 0px 0px 8px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
  }
`;
export const IllustrativeContent = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  align-items: flex-start;
  min-height: 300px;
  @media screen and (min-width: 767px) {
    min-height: auto;
  }
  .finish-line {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    top: 40px;
    height: 0px;
    align-self: flex-start;
    flex: 1 1 0%;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      height: 4px;
      background-color: inherit;
    }
  }
`;
export const BnStepsStepFirst = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: static;
  color: ${({ theme }) => theme.backgroundFooter};
  padding: 8px;
  -webkit-box-flex: 0;
  flex-grow: 0;
  align-items: center;
  text-align: center;
  overflow: hidden;
  .step {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: flex-start;
    text-align: left;
    .step_marker_row {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: relative;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 100%;
      margin-top: 20px;
      background-color: ${({ theme }) => theme.primary};
      user-select: none;
      &::after {
        content: '';
        position: absolute;
        height: 4px;
        top: 12px;
        width: 9999px;
        background-color: inherit;
        left: 100%;
        margin-left: 8px;
      }
    }
    .text-content {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      padding-top: 0px;
      padding-left: 16px;
      flex: 1 1 0%;
      @media screen and (min-width: 767px) {
        padding-top: 8px;
        padding-left: 0px;
      }
      &--title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      }
      &--desc {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.slateGrayColor};
      }
    }
  }
`;
export const BnStepsStep = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: static;
  color: ${({ theme }) => theme.backgroundFooter};
  padding: 8px;
  -webkit-box-flex: 0;
  flex-grow: 0;
  align-items: center;
  text-align: center;
  overflow: hidden;
  .step {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: flex-start;
    text-align: left;
    .step_marker_row {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: relative;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 100%;
      margin-top: 20px;
      background-color: ${({ theme }) => theme.primary};
      user-select: none;
      &::after {
        content: '';
        position: absolute;
        height: 4px;
        top: 12px;
        width: 9999px;
        background-color: inherit;
        left: 100%;
        margin-left: 8px;
      }
      &::before {
        content: '';
        position: absolute;
        height: 4px;
        top: 12px;
        width: 9999px;
        background-color: inherit;
        right: 100%;
        margin-right: 8px;
      }
    }
    .text-content {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      padding-top: 0px;
      padding-left: 16px;
      flex: 1 1 0%;
      @media screen and (min-width: 767px) {
        padding-top: 8px;
        padding-left: 0px;
      }
      &--title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      }
      &--desc {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.slateGrayColor};
      }
    }
  }
`;
export const BnStepsStepLast = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: static;
  color: ${({ theme }) => theme.backgroundFooter};
  padding: 8px;
  -webkit-box-flex: 0;
  flex-grow: 0;
  align-items: center;
  text-align: center;
  overflow: hidden;
  .step {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: flex-start;
    text-align: left;
    .step_marker_row {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: relative;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 100%;
      margin-top: 20px;
      background-color: ${({ theme }) => theme.primary};
      user-select: none;
      &::before {
        content: '';
        position: absolute;
        height: 4px;
        top: 12px;
        width: 9999px;
        background-color: inherit;
        right: 100%;
        margin-right: 8px;
      }
    }
    .text-content {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      padding-top: 0px;
      padding-left: 16px;
      flex: 1 1 0%;
      @media screen and (min-width: 767px) {
        padding-top: 8px;
        padding-left: 0px;
      }
      &--title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      }
      &--desc {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${({ theme }) => theme.slateGrayColor};
      }
    }
  }
`;
