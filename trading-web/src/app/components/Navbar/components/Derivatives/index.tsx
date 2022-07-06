import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { useTranslation } from 'react-i18next';
import { BsFilePersonFill } from 'react-icons/bs';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BsCoin } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { GiCrossedSwords } from 'react-icons/gi';

const DerivativesNav = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const showDropdown = e => {
    // setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const data = [
    // {
    //   id: 1,
    //   icon: GrOverview,
    //   name: t('ByteBuffer-futures-overview'),
    //   description: t('view-our-full-range'),
    // },
    {
      id: 2,
      icon: BsFilePersonFill,
      name: t('responsible-trading'),
      description: t('responsible-trading-sub'),
    },
    {
      id: 3,
      icon: RiMoneyDollarBoxLine,
      name: t('USDM-futures'),
      description: t('USDM-futures-sub'),
    },
    {
      id: 4,
      icon: BsCoin,
      name: t('COINM-futures'),
      description: t('COINM-futures-sub'),
    },
    {
      id: 5,
      icon: CgOptions,
      name: t('vanilla-options'),
      description: t('vanilla-options-sub'),
    },
    {
      id: 6,
      icon: CgArrowsExchangeV,
      name: t('leveraged-token'),
      description: t('leveraged-token-sub'),
    },
    {
      id: 7,
      icon: GiCrossedSwords,
      name: t('battle'),
      description: t('battle-sub'),
    },
  ];
  return (
    <StyledNavDropdown
      title={t('derivatives')}
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
                <div className="title_description">{item.description}</div>
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
export default DerivativesNav;
