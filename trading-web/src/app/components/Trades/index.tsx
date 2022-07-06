import Header from './components/Header';
import { useState } from 'react';
import { Container, Tabs } from './style';
import MyTrades from './components/MyTrades';
import MarketTrades from './components/MarketTrades';
import { useTranslation } from 'react-i18next';

const Trades = ({ dataSocket, dataApi }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(true);
  return (
    <>
      <Container>
        <div>
          <Tabs>
            <button
              onClick={() => setActive(true)}
              className={active ? 'btn-active btn-market' : 'btn-market'}
            >
              {t('market-trades')}
            </button>
            <button
              onClick={() => setActive(false)}
              className={!active ? 'btn-active btn-myTrades' : 'btn-myTrades'}
            >
              {t('my-trades')}
            </button>
          </Tabs>
          {active ? <Header /> : ''}
        </div>
        {active ? (
          <MarketTrades dataSocket={dataSocket} dataApi={dataApi} />
        ) : (
          <MyTrades />
        )}
      </Container>
    </>
  );
};
export default Trades;
