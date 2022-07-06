import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const StyledNavDropdown = styled(NavDropdown)`
  margin: 0 8px;
  @media only screen and (max-width: 1296px) {
    margin: 0 0px;
  }
  @media only screen and (max-width: 1231px) {
    display: none;
  }
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
    min-width: 240px;
    .item {
      white-space: unset;
      padding: 4px 16px;
      color: ${({ theme }) => theme.text};
      border-radius: 8px;
      text-decoration: none;
      display: flex;
      align-items: center;
      &:hover {
        background-color: ${({ theme }) => theme.backgroundDropdown};
      }
    }
  }
`;
export const DropdownItemTitle = styled.div`
  flex: 1;
  .title_description {
    color: ${({ theme }) => theme.colorDescription};
    font-size: 12px;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
`;
