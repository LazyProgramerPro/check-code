import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import {
  StyledNavDropdown,
  DropdownHeader,
  DropdownItemGroup,
  DropdownItemTitle,
  Tag,
} from './style';
import { AiFillBank } from 'react-icons/ai';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { BiDollarCircle } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation();
  return (
    <>
      <span>{t('buy-crypto')}</span>
      <Tag>EUR</Tag>
    </>
  );
};
const BuyCryptoNav = () => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const showDropdown = e => {
    // setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const data = [
    {
      id: 1,
      icon: AiFillBank,
      name: t('card-deposit'),
      description: t('card-deposit-subtitle'),
    },
    {
      id: 2,
      icon: AiOutlineCreditCard,
      name: t('credit-debit-card'),
      description: t('credit-debit-card-subtitle'),
    },
    {
      id: 3,
      icon: MdPeopleOutline,
      name: t('p2p-trading'),
      description: t('p2p-trading-subtitle'),
    },
    {
      id: 4,
      icon: BsCreditCard,
      name: t('card-balance'),
      description: t('card-balance-subtitle'),
    },
    {
      id: 5,
      icon: BiDollarCircle,
      name: t('third-party-payment'),
      description: t('third-party-payment-subtitle'),
    },
  ];

  return (
    <StyledNavDropdown
      disabled
      title={<Title />}
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <DropdownHeader>{t('pay-with')}</DropdownHeader>
      <DropdownItemGroup>
        {data.map((item, index) => {
          return (
            <NavDropdown.Item disabled href="#action/3.1" key={index}>
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
export default BuyCryptoNav;
