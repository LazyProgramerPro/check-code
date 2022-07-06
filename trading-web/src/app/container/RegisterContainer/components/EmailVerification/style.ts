import styled from 'styled-components';
export const Title = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;
export const Description = styled.div`
  margin: 0px 0px 32px;
  min-width: 0px;
  display: flex;
  @media screen and (min-width: 767px) {
    margin-bottom: 40px;
  }
  .subtitle--content {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    flex: 1 1 0%;
    color: ${({ theme }) => theme.colorDescription};
  }
`;
export const SubTitle = styled.div`
  margin: 0px 0px 16px;
  min-width: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colorDescription};
`;
export const ResendButton = styled.button`
  margin: 32px 0px 0px;
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
  min-width: 52px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  color: ${({ theme }) => theme.primary};
  border-radius: 4px;
  min-height: 24px;
  border: none;
  background-color: transparent;
  padding: 0px;
  @media screen and (min-width: 767px) {
    margin-top: 40px;
  }
`;
export const HelpButton = styled.div`
  margin: 24px 0px 0px;
  min-width: 0px;
  display: flex;
  @media screen and (min-width: 767px) {
    margin-top: 16px;
  }
  .text {
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    display: inline-block;
  }
`;
export const Input = styled.input`
  background-color: ${({ theme }) => theme.backgroundFooter};
  border: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
  outline: none;
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  font-size: 24px;
  font-weight: 500;
  padding: 12px;
  letter-spacing: 2px;
  width: 100%;
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  &[data-status='error'] {
    border-color: ${({ theme }) => theme.errorColor};
  }
`;
export const ConfirmCodeButton = styled.button`
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
`;
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
`;
