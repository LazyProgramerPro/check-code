import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Funds from 'app/components/TradesInformation/Funds';
import TradeHistory from 'app/components/TradesInformation/TradeHistory';
import OrderHistory from 'app/components/TradesInformation/OrderHistory';
import OpenOrders from 'app/components/TradesInformation/OpenOrders';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const TradeFormContainer = () => {
  const [active, setActive] = useState(1);
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <Tabs>
        <div
          onClick={() => setActive(1)}
          className={active === 1 ? 'tab-item active' : 'tab-item'}
        >
          {t('open-orders')}(0)
        </div>
        <div
          onClick={() => setActive(2)}
          className={active === 2 ? 'tab-item active' : 'tab-item'}
        >
          {t('order-history')}
        </div>
        <div
          onClick={() => setActive(3)}
          className={active === 3 ? 'tab-item active' : 'tab-item'}
        >
          {t('trade-history')}
        </div>
        <div
          onClick={() => setActive(4)}
          className={active === 4 ? 'tab-item active' : 'tab-item'}
        >
          {t('funds')}
        </div>
      </Tabs>
      {active === 1 ? (
        <OpenOrders />
      ) : active === 2 ? (
        <OrderHistory />
      ) : active === 3 ? (
        <TradeHistory />
      ) : (
        <Funds />
      )}
    </StyledContainer>
  );
};
export default TradeFormContainer;
export const StyledContainer = styled(Container)`
  border: ${({ theme }) => theme.borderGray};
`;
export const Tabs = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  -webkit-box-flex: 0;
  flex-grow: 0;
  font-size: 16px;
  line-height: 16px;
  position: relative;
  background-color: transparent;
  width: 100%;
  .tab-item {
    margin: 0px 16px 0px 0px;
    min-width: 0px;
    padding: 16px 1px 10px;
    height: 100%;
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    color: ${({ theme }) => theme.grayColor};
    cursor: pointer;
    @media screen and (min-width: 1279px) {
      margin-right: 24px;
    }
    @media screen and (min-width: 1023px) {
      margin-right: 16px;
    }
    @media screen and (min-width: 767px) {
      margin-right: 16px;
    }
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .active {
    font-weight: 600;
    border: none;
    color: ${({ theme }) => theme.primary};
  }
`;
