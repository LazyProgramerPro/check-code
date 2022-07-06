import styled from 'styled-components';

export const Title = styled.div`
  margin: 0;
  min-width: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  @media screen and (min-width: 767px) {
    font-size: 32px;
    line-height: 40px;
  }
`;
export const Description = styled.div`
  margin: 0;
  min-width: 0;
  margin-top: 8px;
  color: ${({ theme }) => theme.colorDescription};
  @media screen and (min-width: 767px) {
    margin-top: 16px;
  }
`;
export const SubTitle = styled.div`
  margin: 40px 0px 16px;
  min-width: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colorDescription};
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
  margin: 40px 0px 0px;
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
    margin-top: 40px;
  }
`;
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
`;
