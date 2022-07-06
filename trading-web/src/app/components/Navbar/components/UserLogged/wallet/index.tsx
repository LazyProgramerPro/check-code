import { useState } from 'react';
import { StyledNavDropdown, DropdownItemTitle, StyledLink } from './style';
import { useTranslation } from 'react-i18next';

const WalletLogged = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  return (
    <StyledNavDropdown
      title={t('wallet')}
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <StyledLink to="/wallet/spot">
        <div className="item">
          <DropdownItemTitle>
            <span>{t('fiat-spot')}</span>
            <br></br>
            <span className="title_description">({t('deposit-withdraw')})</span>
          </DropdownItemTitle>
        </div>
      </StyledLink>
      <StyledLink to="/wallet/p2p">
        <div className="item">
          <DropdownItemTitle>
            <span>P2P {t('wallet')}</span>
            <br></br>
            <span className="title_description">({t('deposit-withdraw')})</span>
          </DropdownItemTitle>
        </div>
      </StyledLink>
    </StyledNavDropdown>
  );
};
export default WalletLogged;
