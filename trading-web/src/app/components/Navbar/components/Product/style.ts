import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const StyledNavDropdown = styled(NavDropdown)`
  margin: 0 8px 0 0;

  @media only screen and (max-width: 1331px) {
    margin: 0 0px;
  }
  @media only screen and (max-width: 1231px) {
    display: none;
  }
  .dropdown-toggle {
    position: relative;
    /* padding: 0; */
    &::after {
      position: absolute;
      top: 50%;
    }
  }
  &:hover {
    .dropdown-toggle {
      &:hover {
        color: ${({ theme }) => theme.primary};
      }
      &::after {
        border-bottom: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-top: 0;
        border-left: 0.3em solid transparent;
      }
    }
  }
  .arrow-right {
    display: none;
    float: right;
    color: ${({ theme }) => theme.primary};
  }
  .dropdown-menu {
    background-color: ${({ theme }) => theme.background};
    width: 1200px;
    /* min-width: 600px; */
    overflow: hidden;
    .dropdown-item {
      padding: 16px;
      color: ${({ theme }) => theme.text};
      border-radius: 8px;
      display: flex;
      align-items: center;
      width: 33.33%;
      &:hover {
        background-color: ${({ theme }) => theme.backgroundDropdown};
        .arrow-right {
          display: inline-block;
        }
      }
    }
  }
`;
export const DropdownItemGroup = styled.div`
  margin: 0 16px 16px;
  display: flex;
  flex-wrap: wrap;
`;
export const DropdownItemTitle = styled.div`
  flex: 1;

  .title_description {
    color: ${({ theme }) => theme.colorDescription};
    font-size: 12px;
  }
`;
