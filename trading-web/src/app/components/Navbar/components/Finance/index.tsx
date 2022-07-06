import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { useTranslation } from 'react-i18next';
import { BiCreditCardAlt } from 'react-icons/bi';
import { FaCreditCard } from 'react-icons/fa';
import { BiCreditCardFront } from 'react-icons/bi';

const FinanceNav = () => {
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
      icon: BiCreditCardAlt,
      name: t('ByteBuffer-visa-card'),
      description: t('ByteBuffer-visa-card-sub'),
    },
    {
      id: 2,
      icon: FaCreditCard,
      name: t('crypto-loans'),
      description: t('crypto-loans-sub'),
    },
    {
      id: 3,
      icon: BiCreditCardFront,
      name: t('ByteBuffer-pay'),
      description: t('ByteBuffer-pay-sub'),
    },
  ];

  return (
    <StyledNavDropdown
      title={t('finance')}
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
              <FaArrowRight className="arrow-right animate__fadeInLeft" />
              <br />
            </NavDropdown.Item>
          );
        })}
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default FinanceNav;
