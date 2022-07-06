import styled from 'styled-components';

export const EmailSection = styled.div`
  margin: 0px 0px 24px;
  .email-input {
    box-sizing: border-box;
    margin: 4px 0px 0px 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
    border-radius: 4px;
    height: 48px;
    background-color: transparent;
    width: 100%;
    &:hover,
    &:focus-within {
      border-color: ${({ theme }) => theme.primary};
    }
    .bn-input-suffix {
      flex-shrink: 0;
      margin-left: 4px;
      margin-right: 4px;
      font-size: 14px;
      line-height: 0.9;
    }
  }
`;
export const PasswordSection = styled.div`
  margin: 0px 0px 24px;
  .password-input {
    box-sizing: border-box;
    margin: 4px 0px 0px 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
    border-radius: 4px;
    height: 48px;
    background-color: transparent;
    width: 100%;
    &:hover,
    &:focus-within {
      border-color: ${({ theme }) => theme.primary};
    }
    .bn-input-suffix {
      flex-shrink: 0;
      margin-left: 4px;
      margin-right: 4px;
      font-size: 14px;
      line-height: 0.9;
      .show-password {
        margin: 0px;
        min-width: 0px;
        font-size: 24px;
        fill: currentcolor;
        color: ${({ theme }) => theme.darkGrayColor};
        width: 1em;
        height: 1em;
      }
    }
  }
`;
export const RefID = styled.div`
  margin: 0px 0px 24px;
  min-width: 0px;
  width: 100%;
  .ref-title {
    box-sizing: border-box;
    margin: 0px 0px 4px;
    min-width: 0px;
    display: flex;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    color: ${({ theme }) => theme.matteWhiteColor};
    cursor: pointer;
    .updown-icon {
      margin: 0;
      min-width: 0;
      color: currentColor;
      font-size: 24px;
      fill: currentColor;
      width: 1em;
      height: 1em;
    }
  }
  .ref-input {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
    border-radius: 4px;
    height: 48px;
    background-color: transparent;
    &:hover,
    &:focus-within {
      border-color: ${({ theme }) => theme.primary};
    }
    width: 100%;
    .bn-input-suffix {
      flex-shrink: 0;
      margin-left: 4px;
      margin-right: 4px;
      font-size: 14px;
      line-height: 0.9;
    }
  }
`;
export const StyledCheckbox = styled.div`
  margin: 0px 0px 24px;
  min-width: 0px;
  width: 100%;
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }
  .labelView {
    font-size: 14px;
    position: relative;
    padding-left: 24px;
    color: ${({ theme }) => theme.colorDescription};
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover input ~ .checkmark {
      border-color: ${({ theme }) => theme.primary};
    }
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: ${({ theme }) => theme.primary};
      }
      :checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 17px;
      width: 17px;
      background-color: transparent;
      border: ${({ theme }) => theme.borderGray};
      &:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
`;
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
`;
export const Form = styled.form`
  #submit_email {
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
    padding: 12px 24px;
    min-width: 80px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.brightBlackColor};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.primary};
    width: 100%;
    &:hover {
      opacity: 0.9;
    }
    @media screen and (min-width: 767px) {
      margin-top: 16px;
    }
  }
  input {
    color: ${({ theme }) => theme.matteWhiteColor};
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: inherit;
    opacity: 1;
  }
  .error {
    border-color: ${({ theme }) => theme.errorColor} !important;
  }
`;
