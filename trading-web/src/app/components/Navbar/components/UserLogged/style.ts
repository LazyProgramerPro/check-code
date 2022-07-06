import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const StyledNavDropdown = styled(NavDropdown)`
  margin: 0 8px;
  @media only screen and (max-width: 1331px) {
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
    width: 200px;
    .dropdown-item {
      white-space: unset;
      /* padding: 16px; */
      color: ${({ theme }) => theme.text};
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 15px;
      &:hover {
        background-color: ${({ theme }) => theme.backgroundDropdown};
        .arrow-right {
          display: inline-block;
        }
        button {
          color: ${({ theme }) => theme.primary};
        }
      }

      button {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
        text-align: left;
        font-size: 16px;

        &:focus {
          box-shadow: none;
        }

        svg {
          font-size: 18px;
          margin-right: 5px;
          transform: translateY(-1px);
        }
      }
    }
  }
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
