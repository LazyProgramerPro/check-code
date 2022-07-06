import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TabExpressContainer from '../TabExpressContainer';
import TabP2PContainer from '../TabP2PContainer';

function TradeP2PContainer() {
  const location = useLocation();

  const pathName = location.pathname.split('/');

  const [defaultActiveKey, setDefaultActiveKey] = useState(
    pathName[2] ? pathName[2] : 'p2p',
  );

  useEffect(() => {
    pathName[2] ? setDefaultActiveKey(pathName[2]) : setDefaultActiveKey('p2p');
  }, [pathName]);

  //

  return (
    <Wrapper>
      <NavMenu />
      <div className="header">
        <h1>ByteBuffer P2P: Buy/Sell Your Crypto Locally</h1>
        <p className="header--des">
          Peer-to-peer exchange (or P2P exchange) is a marketplace where people
          can trade crypto directly with each other on their own terms, in
          virtually any country.
        </p>
      </div>
      <NavbarTradeP2P defaultActiveKey={defaultActiveKey} />
      {defaultActiveKey === 'p2p' && <TabP2PContainer />}
      {defaultActiveKey === 'express' && <TabExpressContainer />}
    </Wrapper>
  );
}

export default TradeP2PContainer;

export const Wrapper = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px 0px;
    background: url('https://wallpaper.dog/large/6768.jpg') no-repeat center;
    color: ${({ theme }) => theme.text};
    h1 {
      color: ${({ theme }) => theme.text};
      text-align: center;
    }

    &--des {
      max-width: 600px;
      text-align: center;
      padding: 10px;
    }
  }
`;
