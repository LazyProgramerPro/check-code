import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import { useSelector } from 'react-redux';
import { selectTradehistory } from './slice/selectors';
import FilterOrderHistory from './components/FilterOrderHistory';
import TradeHistoryList from './components/TradeHistoryList';

const TradeHistory = () => {
  const dataTradeHistory: any = useSelector(selectTradehistory);
  return (
    <>
      {getToken() ? (
        <>
          <FilterOrderHistory />
          <TradeHistoryList dataSource={dataTradeHistory?.data} />
        </>
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default TradeHistory;
