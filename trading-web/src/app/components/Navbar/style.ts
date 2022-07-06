import styled from 'styled-components';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const StyledNavBar = styled(Navbar)`
  background-color: ${({ theme }) => theme.body} !important;
  padding: 0px !important;
  .linkDownload {
    /* margin-right: 10px; */
  }
  @media only screen and (max-width: 1231px) {
    .linkDownload,
    .border,
    .cryptoUsd,
    .question,
    .setting {
      display: none;
    }
  }
`;
export const StyledNavLink = styled(Nav.Link)`
  @media only screen and (max-width: 1231px) {
    display: none;
  }
  margin: 0 4px;
  color: ${({ theme }) => theme.darkGrayColor} !important;
`;
export const AuthGroup = styled.div`
  margin: 0 16px;
  display: flex;
  .linktoLogin-button {
    display: block;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
export const StyledNavBrand = styled(Navbar.Brand)`
  display: flex;
  margin-right: 4px;
  width: 120px;
  height: 40px;
  padding: 0;
  svg {
    color: ${({ theme }) => theme.primary};
  }
  .logo {
    margin-left: 12px;
    /* width: 120px;
    height: 34px; */
    width: 100%;
    height: 100%;
    padding-bottom: 4px;
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
export const RegisterButton = styled(Link)`
  margin: 0px;
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
  padding: 6px 12px !important;
  min-width: 52px;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  color: ${({ theme }) => theme.background} !important;
  border-radius: 4px;
  min-height: 24px;
  border: none;
  background-image: linear-gradient(
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.primary} 100%
  );
  font-weight: 400;
  margin-left: 12px;
  &:hover {
    box-shadow: none;
    background-image: linear-gradient(#ff9710 0%, #ff9710 100%);
  }
`;
export const StyledNav = styled(Nav)`
  flex-direction: row;
  align-items: center;
  .border {
    box-sizing: border-box;
    margin: 0px 8px;
    min-width: 0px;
    width: 1px;
    height: 13px;
    background-color: ${({ theme }) => theme.darkGrayColor};
  }

  @media only screen and (max-width: 1231px) {
    .wrapperAuth {
      display: none;
    }
  }
`;
export const NavbarToggle = styled(Navbar.Toggle)`
  font-size: 16px;
  border: none;
  margin-right: 0 !important;

  &:focus {
    box-shadow: none;
  }

  display: none;

  @media only screen and (max-width: 1231px) {
    display: block !important;
  }
`;
export const NavbarOffcanvas = styled(Navbar.Offcanvas)`
  background-color: ${({ theme }) => theme.background};
  max-width: 90vw;

  .offcanvas-header {
    .btnGroupLogRegis {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      a {
        width: 100%;
        text-align: center;
        padding: 12px 0 !important;
        font-size: 18px;
        margin: 5px 0;
        text-decoration: none;
        color: ${({ theme }) => theme.p2pTextLight} !important;
      }
    }
    position: relative;
    display: block;
    .ant-typography {
      color: ${({ theme }) => theme.p2pTextLight};
    }

    .titleHeader {
      width: 100%;
    }

    .userDesc {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${({ theme }) => theme.darkPinkColor};

      .verify {
        color: ${({ theme }) => theme.greenColor};
        margin-left: auto;
        background-color: ${({ theme }) => theme.greenColorBlur};
        padding: 2px 10px;
        border-radius: 10px;
      }
    }

    .btn-close {
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      margin: 12px 10px;

      &:focus {
        box-shadow: none;
      }
    }
  }

  .offcanvas-body {
    padding: 0 0 16px 0;
    margin-top: 40px;

    .-title-content {
      margin-left: 9px;
    }

    .ant-menu {
      background-color: transparent;

      &-submenu-title {
        font-size: 18px;
        color: ${({ theme }) => theme.whiteSmokeColor};
        height: 60px;
        transition: all 0.25s linear;

        a {
          text-decoration: none;
          transition: all 0.25s linear;
        }

        &:hover {
          color: ${({ theme }) => theme.primary};
          background-color: ${({ theme }) => theme.brightBlackColor};
          a {
            color: ${({ theme }) => theme.primary};
          }
          .-item-icon {
            color: ${({ theme }) => theme.primary};
          }
        }
      }

      .ant-menu-item {
        font-size: 18px;
        color: ${({ theme }) => theme.whiteSmokeColor};
        margin: 0;
        height: 60px;
        a {
          text-decoration: none;
          transition: all 0.25s linear;
          color: ${({ theme }) => theme.whiteSmokeColor};
        }

        transition: all 0.25s linear;

        &:hover {
          color: ${({ theme }) => theme.primary} !important;
          background-color: ${({ theme }) => theme.brightBlackColor};
          .ant-menu-item-icon {
            color: ${({ theme }) => theme.primary};
          }
          a {
            color: ${({ theme }) => theme.primary};
          }
        }
        &-selected {
          background-color: transparent;
        }
      }

      .-item-icon,
      .ant-menu-item-icon {
        transition: all 0.25s linear;
        font-size: 23px;
        color: ${({ theme }) => theme.whiteSmokeColor};
      }
    }
  }
`;
