import { Container, Nav, Navbar } from 'react-bootstrap';
import { StyledNavBrand, StyledNav, StyledNavBar } from './style';
import { BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ChangeLanguage from '../ChangeLanguage';
import POWlogo from 'app/assets/img/B2LOGO.png';

const NavMenu = () => {
  return (
    <StyledNavBar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container fluid style={{ height: '64px' }}>
        <Link to="/">
          <StyledNavBrand>
            <img src={POWlogo} className="logo" alt="Byte Buffer" />
          </StyledNavBrand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="me-auto"></StyledNav>
          <StyledNav>
            <ChangeLanguage />
            <i className="border"></i>
            <Nav.Link href="#pricing">
              <BsSun />
            </Nav.Link>
          </StyledNav>
        </Navbar.Collapse>
      </Container>
    </StyledNavBar>
  );
};

export default NavMenu;
