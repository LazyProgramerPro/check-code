import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HandleP2PTradeUrl from './components/HandleP2PTradeUrl';
import P2PFilter from './components/P2PFilter';
import P2PTableBuy from './components/P2PTableBuy';
import P2PTableSell from './components/P2PTableSell';
import TabsBuySell from './components/TabsBuySell';
import TabsCrypto from './components/TabsCrypto';
import { selectTabP2P } from './slice/selectors';
import { TabP2PState } from './slice/type';

function TabP2PContainer() {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);

  return (
    <Wrapper>
      <div className="p2pTabList">
        <div className="p2pTabList-container container">
          <TabsBuySell />
          <TabsCrypto />
        </div>
      </div>
      <P2PFilter />
      <div className="container mt-3">
        {TabP2PState.searchParam.action === 'buy' && <P2PTableBuy />}
        {TabP2PState.searchParam.action === 'sell' && <P2PTableSell />}
      </div>
      <HandleP2PTradeUrl />
    </Wrapper>
  );
}

export default TabP2PContainer;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};

  min-height: 100vh;

  .p2pTabList {
    height: 60px;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 8%), 0px 0px 4px rgb(0 0 0 / 8%);

    &-container {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
    }
  }
`;
