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
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
`;
export const Form = styled.form`
  margin-top: 48px;
  #submit {
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
