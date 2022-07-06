import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const StyledNavDropdown = styled(NavDropdown)`
  margin: 0 8px;
  &:hover {
    .dropdown-toggle:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .arrow-right {
    display: none;
    float: right;
    color: ${({ theme }) => theme.primary};
  }
  .dropdown-menu {
    background-color: ${({ theme }) => theme.background};
    min-width: 340px;
    .dropdown-item {
      padding: 16px;
      color: ${({ theme }) => theme.text};
      border-radius: 8px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${({ theme }) => theme.backgroundDropdown};
        .arrow-right {
          display: inline-block;
        }
      }
    }
  }

  @media only screen and (max-width: 1331px) {
    margin: 0 0px;
  }

  @media only screen and (max-width: 1231px) {
    display: none;
  }
`;
export const DropdownHeader = styled.div`
  margin: 0 0 0 16px;
  color: ${({ theme }) => theme.text};
`;
export const DropdownItemGroup = styled.div`
  margin: 0 16px 16px;
`;
export const DropdownItemTitle = styled.div`
  flex: 1;
  .title_description {
    color: ${({ theme }) => theme.colorDescription};
    font-size: 12px;
  }
`;
export const Tag = styled.span`
  box-sizing: border-box;
  display: inline-block;
  margin: 0px 0px 0px 8px;
  min-width: 0px;
  /* display: flex; */
  position: relative;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 12px;
  line-height: 16px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  &::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    left: -3px;
    top: 2px;
    border-width: 6px 6px 6px 0px;
    border-left-style: initial;
    border-left-color: initial;
    border-top-style: solid;
    border-top-color: transparent;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    border-right-style: solid;
    border-right-color: ${({ theme }) => theme.primary};
  }
`;
