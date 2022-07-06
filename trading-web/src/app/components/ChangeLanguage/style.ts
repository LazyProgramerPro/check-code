import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
export const LanguageName = styled.div`
  color: ${({ theme }) => theme.text};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
  }
`;
export const Option = styled.div`
  min-width: 160px;
  cursor: pointer;
  padding: 12px 16px;
  margin: 0 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.matteWhiteColor};
  &:hover {
    background-color: ${({ theme }) => theme.backgroundDropdown};
  }
  &[data-type='active'] {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.backgroundDropdown};
  }
`;
export const StyledModal = styled(Modal)`
  .modal-content {
    min-width: 600px;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.matteWhiteColor};
    box-shadow: rgb(0 0 0 / 8%) 0px 0px 20px;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 8px;
    .modal-header {
      padding: 0 1rem 0 1rem;
      border-bottom: ${({ theme }) => theme.borderGray};
      .modal-title {
        margin: 0px 24px 0px 0px;
        min-width: 0px;
        padding-top: 24px;
        padding-bottom: 24px;
        cursor: pointer;
        font-weight: 500;
        border-bottom: 1px solid ${({ theme }) => theme.primary};
      }
    }
    .btn-close {
      filter: invert(1) grayscale(100%) brightness(200%);
      &:focus {
        box-shadow: none;
      }
    }
    .modal-body {
      padding: 16px 16px 16px 16px;
      &--title {
        margin: 0px;
        min-width: 0px;
        font-size: 16px;
        font-weight: 500;
      }
      &--list {
        min-height: 100px;
      }
    }
  }
`;
