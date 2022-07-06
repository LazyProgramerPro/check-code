import { Container, Nav, Offcanvas } from 'react-bootstrap';
import BuyCrypto from './components/BuyCrypto';
import TradeNav from './components/Trade';
import DerivativesNav from './components/Derivatives';
import EarnNav from './components/Earn';
import FinanceNav from './components/Finance';
import ProductNav from './components/Product';
import {
  StyledNavLink,
  AuthGroup,
  StyledNavBrand,
  Tag,
  StyledNav,
  RegisterButton,
  NavbarToggle,
  NavbarOffcanvas,
  StyledNavBar,
} from './style';
import UserLogged from 'app/components/Navbar/components/UserLogged';
import {
  BsArrowUpCircle,
  BsFillQuestionSquareFill,
  BsSliders,
} from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineTeam } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getToken } from 'app/components/common/common';
import ChangeLanguage from '../ChangeLanguage';
import { useTranslation } from 'react-i18next';
import POWlogo from 'app/assets/img/B2LOGO.png';
import NavbarUser from './components/NavbarUser';
import { useState } from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { GrBitcoin } from 'react-icons/gr';
import { SiConvertio } from 'react-icons/si';
import { IoBarChartOutline } from 'react-icons/io5';
import { RiCoinsLine, RiCopperCoinLine } from 'react-icons/ri';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FaPiggyBank } from 'react-icons/fa';
// import POWlogo2 from 'app/assets/img/logo3.jpg';
const Title = () => {
  const { t } = useTranslation();
  return (
    <>
      <span>NFT</span>
      <Tag>{t('new')}</Tag>
    </>
  );
};
const NavMenu = () => {
  const { t } = useTranslation();
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleCloseNavMenu = () => setShowNavMenu(false);
  const handleOpenNavMenu = () => setShowNavMenu(true);

  return (
    <StyledNavBar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container fluid style={{ height: '64px' }}>
        <Link to="/">
          <StyledNavBrand>
            <img src={POWlogo} width="100%" className="logo" alt="POW" />
          </StyledNavBrand>
        </Link>
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        <StyledNav className="me-auto">
          <ProductNav />
          <BuyCrypto />
          <StyledNavLink href="#pricing">{t('markets')}</StyledNavLink>
          <TradeNav />
          <DerivativesNav />
          <EarnNav />
          <FinanceNav />
          <StyledNavLink href="#pricing">
            <Title />
          </StyledNavLink>
        </StyledNav>
        {/* </Navbar.Collapse> */}
        <StyledNav>
          {!getToken() ? (
            <div className="wrapperAuth">
              <AuthGroup>
                <Link to="/login" className="linktoLogin-button">
                  {t('log-in')}
                </Link>
                <RegisterButton to="/register">{t('register')}</RegisterButton>
              </AuthGroup>
            </div>
          ) : (
            <UserLogged />
          )}
          <Nav.Link href="#pricing" className="linkDownload">
            {t('downloads')}
          </Nav.Link>
          <ChangeLanguage />
          <i className="border"></i>
          <Nav.Link href="#pricing" className="cryptoUsd">
            USD
          </Nav.Link>
          {getToken() && <NavbarUser />}
          <NavbarToggle
            aria-controls="offcanvasNavbar"
            onClick={handleOpenNavMenu}
          />
          <NavbarOffcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showNavMenu}
            onHide={handleCloseNavMenu}
          >
            <Offcanvas.Header closeButton>
              {!getToken() && (
                <div className="btnGroupLogRegis">
                  <Link to="/login" className="linktoLogin-button">
                    {t('log-in')}
                  </Link>
                  <RegisterButton to="/register">
                    {t('register')}
                  </RegisterButton>
                </div>
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Menu mode="inline" theme="dark">
                <Menu.Item key="1" icon={<GrBitcoin />} disabled>
                  Buy Crypto
                </Menu.Item>
                <Menu.Item key="2" icon={<IoBarChartOutline />} disabled>
                  Markets
                </Menu.Item>
                <SubMenu key="sub1" icon={<RiCoinsLine />} title="Trade">
                  <Menu.Item key="3" icon={<SiConvertio />} disabled>
                    <Link to="#">Convert</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<MdOutlineSpaceDashboard />}>
                    <Link to="/">Classic</Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<BsArrowUpCircle />} disabled>
                    <Link to="#">Advanced</Link>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<AiOutlineTeam />}>
                    <Link to="/trade-p2p/p2p">P2P</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="7" icon={<BsSliders />} disabled>
                  Derivatives
                </Menu.Item>
                <Menu.Item key="8" icon={<FaPiggyBank />} disabled>
                  Earn
                </Menu.Item>
                <Menu.Item key="9" icon={<RiCoinsLine />} disabled>
                  Finance
                </Menu.Item>
                <Menu.Item key="10" icon={<RiCopperCoinLine />} disabled>
                  NFT
                </Menu.Item>
              </Menu>
            </Offcanvas.Body>
          </NavbarOffcanvas>
          <Nav.Link href="#pricing" className="question">
            <BsFillQuestionSquareFill />
          </Nav.Link>
          <Nav.Link href="#pricing" className="setting">
            <AiOutlineSetting />
          </Nav.Link>
        </StyledNav>
      </Container>
    </StyledNavBar>
  );
};

export default NavMenu;
