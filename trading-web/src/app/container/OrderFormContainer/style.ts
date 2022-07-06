import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
export const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundAccordion};
`;
export const Header = styled.div`
  display: flex;
  height: 48px;
  cursor: pointer;
  .tradeItemSwitchWrap {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 14px;
    color: ${({ theme }) => theme.grayColor};
    text-align: center;
    background-color: ${({ theme }) => theme.backgroundFooter};
    border-top: 2px solid transparent;
    border-bottom: 1px solid ${({ theme }) => theme.backgroundDropdown};
  }
  .spotTab {
    width: 120px;
  }
  .active {
    border-top: 2px solid ${({ theme }) => theme.primary};
    border-right: 1px solid ${({ theme }) => theme.backgroundDropdown};
    border-bottom: 1px solid transparent;
    color: ${({ theme }) => theme.matteWhiteColor};
    background-color: ${({ theme }) => theme.backgroundAccordion};
  }
`;
export const A = styled.a`
  margin: 0px 16px;
  min-width: 0px;
  display: flex;
  color: ${({ theme }) => theme.grayColor};
  font-size: 12px;
  height: 16px;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.grayColor};
  }
  .hrefText {
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.matteWhiteColor};
    }
  }
  .marginRatio {
    height: 16px;
    margin-left: 4px;
    padding: 0px 4px;
    color: ${({ theme }) => theme.primary};
    font-size: 12px;
    border-radius: 2px;
    background-color: rgb(60, 46, 16);
  }
`;
export const StyledDropdown = styled(Dropdown)`
  margin: 0px 8px 0px 0px;
  .dropdown-toggle {
    padding: 0px;
    margin: 0px;
    min-width: 0px;
    &::after {
      display: none;
    }
    &:active:focus {
      box-shadow: none;
    }
  }
  .more-icon {
    margin: 0px;
    min-width: 0px;
    fill: currentcolor;
    font-size: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.darkerGrayColor};
    width: 1em;
    height: 1em;
    &:hover {
      color: ${({ theme }) => theme.grayColor};
    }
  }
  .btn-success {
    background-color: transparent !important;
    border: none;
    &:hover {
      background-color: transparent;
      border: none;
    }
  }
  .dropdown-menu {
    background-color: ${({ theme }) => theme.backgroundAccordion};
    padding: 0px;
    min-width: 160px;
    font-size: 14px;
    .dropdown-item {
      color: ${({ theme }) => theme.text};
      padding: 0.5rem 1rem;
      &:hover {
        background-color: rgba(233, 236, 239, 0.3);
      }
    }
  }
`;
