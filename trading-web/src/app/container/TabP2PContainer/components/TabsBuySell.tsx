import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTabP2PSlice } from '../slice';

function TabsBuySell() {
  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const P2PSearchParams = Object.fromEntries(searchParams);
  const [defaultActiveKey, setDefaultActiveKey] = useState(
    P2PSearchParams.action ? P2PSearchParams.action : 'sell',
  );

  const handleChangeTabs = (key: any) => {
    if (key === defaultActiveKey) {
      return;
    }

    if (key === 'sell') {
      dispatch(actions.actionTabP2P('sell'));
    }

    if (key === 'buy') {
      dispatch(actions.actionTabP2P('buy'));
    }
  };

  useEffect(() => {
    setDefaultActiveKey(P2PSearchParams.action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Wrapper>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        className="TabP2P-nav-tabs"
        onSelect={key => handleChangeTabs(key)}
      >
        <Tab
          eventKey="buy"
          title="Buy"
          tabClassName={defaultActiveKey === 'buy' ? 'TabP2P-Buy' : ''}
        ></Tab>
        <Tab
          eventKey="sell"
          title="Sell"
          tabClassName={defaultActiveKey === 'sell' ? 'TabP2P-Sell' : ''}
        ></Tab>
      </Tabs>
    </Wrapper>
  );
}

export default TabsBuySell;

const Wrapper = styled.div`
  min-width: 130px;
  .TabP2P-nav-tabs {
    border: 1px solid ${({ theme }) => theme.p2pBorder};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.whiteSmokeColor};

    & .nav-link {
      color: ${({ theme }) => theme.body};
      margin: 2px;
      height: 30px;
      padding: 0px 10px;
      border-radius: 4px;
      min-width: 60px;

      &:hover {
        border-color: transparent;
      }

      border-color: transparent;
      background-color: transparent;
    }

    .TabP2P-Buy {
      background: ${({ theme }) => theme.p2pBuy};
      color: ${({ theme }) => theme.text};
      font-weight: 500;
    }

    .TabP2P-Sell {
      background: ${({ theme }) => theme.p2pSell};
      color: ${({ theme }) => theme.text};
      font-weight: 500;
    }
  }
`;
