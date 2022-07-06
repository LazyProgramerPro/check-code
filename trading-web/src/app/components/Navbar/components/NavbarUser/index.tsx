import { Menu, Typography } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import { BsFillBookmarkPlusFill, BsPersonCircle } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { RiProfileLine, RiVipDiamondFill } from 'react-icons/ri';
import { SiSpringsecurity } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { authService } from 'services/authService';
import styled from 'styled-components';

const NavbarUser = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const handleClose = () => {
    setShowCanvas(false);
  };

  const logout = () => {
    authService.removeAccessToken();
    authService.removeUserId();
    window.location.href = '/';
  };

  const handleClickUser = () => {
    setShowCanvas(true);
  };

  const userId = localStorage.getItem('userId');

  const { Title } = Typography;

  return (
    <Wrapper>
      <BsPersonCircle className="iconUser" onClick={handleClickUser} />
      <OffCanvasUser
        show={showCanvas}
        onHide={handleClose}
        placement="end"
        className="offCanvasUser"
      >
        <Offcanvas.Header closeButton>
          <Title level={3} className="titleHeader">
            User {userId}
          </Title>
          <div className="userDesc">
            <span>
              <RiVipDiamondFill className="dinamoIcon" /> Regular user
            </span>
            <span className="verify">Verified</span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Menu mode="inline" theme="dark">
            <Menu.Item key="1" icon={<RiProfileLine />}>
              <Link to="#">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<FaWallet />} title="Wallet">
              <Menu.Item key="2">
                <Link to="/wallet/spot">Fiat & Spot</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/wallet/p2p">P2P Wallet</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<BsFillBookmarkPlusFill />}>
              <Link to="#">Orders</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SiSpringsecurity />}>
              <Link to="#">Security</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<BiLogOut />} onClick={logout}>
              <Link to="#">Logout</Link>
            </Menu.Item>
          </Menu>
        </Offcanvas.Body>
      </OffCanvasUser>
    </Wrapper>
  );
};

export default NavbarUser;

const Wrapper = styled.div`
  display: none;
  @media only screen and (max-width: 1231px) {
    display: block;
  }
  .iconUser {
    margin-right: 15px;
    margin-left: 27px;
    font-size: 20px;
    cursor: pointer;
    transform: translateY(-1px);
    color: ${({ theme }) => theme.whiteSmokeColor};

    &:hover {
      transition: all 0.25s linear;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const OffCanvasUser = styled(Offcanvas)`
  background-color: ${({ theme }) => theme.background} !important;
  max-width: 90vw;
  .offcanvas-header {
    position: relative;
    display: block;
    margin-bottom: 20px;
    padding-right: 0;

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
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      .dinamoIcon {
        font-size: 16px;
        transform: translateY(-2px);
        margin-right: 3px;
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

    .-title-content {
      margin-left: 9px;
    }
    .ant-menu {
      background-color: transparent;
      font-size: 18px;

      .ant-menu-item-icon,
      .-item-icon {
        font-size: 18px;
      }

      &-submenu-title {
        color: ${({ theme }) => theme.whiteSmokeColor};
        height: 60px;
        transition: all 0.25s linear;
        margin: 5px 0;

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
          .ant-menu-item-icon,
          .-item-icon {
            color: ${({ theme }) => theme.primary};
          }
        }
      }

      .ant-menu-item {
        color: ${({ theme }) => theme.whiteSmokeColor};
        height: 60px;
        transition: all 0.25s linear;
        margin: 5px 0;

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
          .ant-menu-item-icon,
          .-item-icon {
            color: ${({ theme }) => theme.primary};
          }
        }
        &-selected {
          background-color: transparent;
        }
      }
    }
  }
`;
