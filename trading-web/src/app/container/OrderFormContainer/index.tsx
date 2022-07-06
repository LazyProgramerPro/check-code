import { useState } from 'react';
import { Container, Header, A, StyledDropdown } from './style';
import IconSvg from 'app/assets/img/icon';
import { Dropdown } from 'react-bootstrap';
import OrderForm from 'app/components/OrderForm';
import { useTranslation } from 'react-i18next';
const OrderFormContainer = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  return (
    <Container>
      <Header>
        <div className="tradeItemSwitchWrap spotTab active ">{t('spot')}</div>
        <div className="tradeItemSwitchWrap" style={{ flex: ' 1 1 0%' }}></div>
        <div className="tradeItemSwitchWrap">
          <A target="_blank" href="/#">
            <div className="hrefText">{t('margin')}</div>
            <div className="marginRatio">10x</div>
          </A>
          <StyledDropdown
            show={show}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <IconSvg name="more" className="more-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/#">{t('trading-rules')}</Dropdown.Item>
              <Dropdown.Item href="/#">{t('FAQ')}</Dropdown.Item>
              <Dropdown.Item href="/#">{t('spot-tutorial')}</Dropdown.Item>
            </Dropdown.Menu>
          </StyledDropdown>
        </div>
      </Header>
      <div>
        <OrderForm />
      </div>
    </Container>
  );
};
export default OrderFormContainer;
