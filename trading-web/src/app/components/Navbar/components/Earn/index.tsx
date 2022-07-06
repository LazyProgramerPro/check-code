import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { useTranslation } from 'react-i18next';
import { MdOutlineSavings } from 'react-icons/md';
import { RiCopperCoinLine } from 'react-icons/ri';
import { RiCoinsLine } from 'react-icons/ri';
import { MdOutlineAutorenew } from 'react-icons/md';
import { GiDigDug } from 'react-icons/gi';
import { RiCoinLine } from 'react-icons/ri';
import { IoRocketOutline } from 'react-icons/io5';

const EarnNav = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    // setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const data = [
    {
      id: 1,
      icon: MdOutlineSavings,
      name: t('ByteBuffer-earn'),
      description: t('ByteBuffer-earn-sub'),
    },
    {
      id: 2,
      icon: IoRocketOutline,
      name: t('launchpad'),
      description: t('launchpad-sub'),
    },
    {
      id: 3,
      icon: RiCopperCoinLine,
      name: t('savings'),
      description: t('savings-sub'),
    },
    {
      id: 4,
      icon: RiCopperCoinLine,
      name: t('staking'),
      description: t('staking-sub'),
    },
    {
      id: 5,
      icon: RiCopperCoinLine,
      name: t('BNB-vaults'),
      description: t('BNB-Vaults-sub'),
    },
    {
      id: 6,
      icon: RiCoinsLine,
      name: t('dual-investment'),
      description: t('dual-investment-sub'),
    },
    {
      id: 7,
      icon: RiCoinLine,
      name: t('liquidity-farming'),
      description: t('liquidity-farming-sub'),
    },
    {
      id: 8,
      icon: MdOutlineAutorenew,
      name: t('auto-invest'),
      description: t('auto-invest-sub'),
    },
    {
      id: 9,
      icon: GiDigDug,
      name: t('ByteBuffer-pool'),
      description: t('ByteBuffer-pool-sub'),
    },
  ];
  return (
    <StyledNavDropdown
      title={t('earn')}
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
      disabled
    >
      <DropdownItemGroup>
        {data.map((item, index) => {
          return (
            <NavDropdown.Item href="#action/3.1" key={index}>
              <item.icon
                style={{
                  fontSize: '24px',
                  color: '#10afff',
                  marginRight: '16px',
                }}
              />
              <DropdownItemTitle>
                <span>{item.name}</span>
                <br></br>
                <span className="title_description">{item.description}</span>
              </DropdownItemTitle>
              <FaArrowRight className="arrow-right" />
              <br />
            </NavDropdown.Item>
          );
        })}
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default EarnNav;
