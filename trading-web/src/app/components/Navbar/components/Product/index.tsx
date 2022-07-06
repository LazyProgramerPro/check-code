import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { CgMenuGridR } from 'react-icons/cg';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { AiOutlineInteraction } from 'react-icons/ai';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { RiExchangeBoxLine } from 'react-icons/ri';
import { MdOutlineHomeRepairService } from 'react-icons/md';
import { MdOutlineManageSearch } from 'react-icons/md';
import { GiNestedHearts } from 'react-icons/gi';
import { WiCloudy } from 'react-icons/wi';
import { ImLab } from 'react-icons/im';
import { FiCreditCard } from 'react-icons/fi';
import { BsShield } from 'react-icons/bs';
import { SiBinance } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import { IoRocketOutline } from 'react-icons/io5';

const ProductNav = () => {
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
      icon: CgArrowsExchangeV,
      name: t('exchange'),
      description: t('exchange-sub'),
    },
    {
      id: 2,
      icon: HiOutlineAcademicCap,
      name: t('academy'),
      description: t('academy-sub'),
    },
    {
      id: 3,
      icon: RiExchangeBoxLine,
      name: t('broker'),
      description: t('broker-sub'),
    },
    {
      id: 4,
      icon: MdOutlineHomeRepairService,
      name: t('institutional-vip-service'),
      description: t('institutional-vip-service-sub'),
    },
    {
      id: 5,
      icon: GiNestedHearts,
      name: t('charity'),
      description: t('charity-sub'),
    },
    {
      id: 6,
      icon: WiCloudy,
      name: t('cloud'),
      description: t('cloud-sub'),
    },
    {
      id: 7,
      icon: AiOutlineInteraction,
      name: t('DEX'),
      description: t('DEX-sub'),
    },
    {
      id: 8,
      icon: ImLab,
      name: t('labs'),
      description: t('labs-sub'),
    },
    {
      id: 9,
      icon: IoRocketOutline,
      name: t('launchpad'),
      description: t('launchpad-sub'),
    },
    {
      id: 10,
      icon: MdOutlineManageSearch,
      name: t('research'),
      description: t('research-sub'),
    },
    {
      id: 11,
      icon: BsShield,
      name: t('trust-wallet'),
      description: t('trust-wallet-sub'),
    },
    {
      id: 12,
      icon: FiCreditCard,
      name: t('gift-card'),
      description: t('gift-card-sub'),
    },
    {
      id: 13,
      icon: SiBinance,
      name: t('ByteBuffer-live'),
      description: t('ByteBuffer-live-sub'),
    },
  ];

  return (
    <StyledNavDropdown
      title={<CgMenuGridR style={{ fontSize: '24px' }} />}
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
export default ProductNav;
