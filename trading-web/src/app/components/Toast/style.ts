import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

export const StyledSuccessToast = styled(Toast)`
  background-color: ${({ theme }) => theme.backgroundDropdown};
  opacity: 1;
  transition: all 0.5s ease-out;
  .toast-header {
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border-bottom: none;
    padding-left: 2rem;
    .icon-success {
      font-size: 20px;
      color: ${({ theme }) => theme.brightGreenColor};
      margin-right: 6px;
    }
  }
  .toast-body {
    color: ${({ theme }) => theme.grayColor};
    padding-left: 2rem;
  }
`;

export const StyledErrorToast = styled(Toast)`
  background-color: ${({ theme }) => theme.backgroundDropdown};
  opacity: 1;
  transition: all 0.5s ease-out;
  .toast-header {
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border-bottom: none;
    padding-left: 2rem;
    .icon-error {
      font-size: 20px;
      color: ${({ theme }) => theme.errorColor};
      margin-right: 6px;
    }
  }
  .toast-body {
    color: ${({ theme }) => theme.grayColor};
    padding-left: 2rem;
  }
`;
