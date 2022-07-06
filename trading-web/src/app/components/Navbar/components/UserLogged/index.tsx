import { useState } from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import { StyledNavDropdown, DropdownItemGroup } from './style';
import { authService } from 'services/authService';
import WalletLogged from './wallet';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';

const UserLogged = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const logout = () => {
    authService.removeAccessToken();
    authService.removeUserId();
    window.location.href = '/';
  };
  const username = JSON.parse(
    JSON.stringify(localStorage.getItem('userId') || ''),
  );
  return (
    <>
      <WalletLogged />
      <StyledNavDropdown
        title={`${t('user')} ${username}`}
        id="collasible-nav-dropdown"
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <DropdownItemGroup>
          <NavDropdown.Item>
            <Button>
              <MdSpaceDashboard /> {t('Dashboard')}
            </Button>
            <AiOutlineArrowRight className="arrow-right" />
          </NavDropdown.Item>
          <NavDropdown.Item href="/order/all">
            <Button>
              <BsFillBookmarkPlusFill /> {t('Order')}
            </Button>
            <AiOutlineArrowRight className="arrow-right" />
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">
            <Button variant="danger" onClick={logout}>
              <BiLogOut /> {t('logout')}
            </Button>
            <AiOutlineArrowRight className="arrow-right" />
          </NavDropdown.Item>
        </DropdownItemGroup>
      </StyledNavDropdown>
    </>
  );
};
export default UserLogged;
