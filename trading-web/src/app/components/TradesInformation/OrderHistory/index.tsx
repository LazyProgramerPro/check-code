/* eslint-disable react-hooks/exhaustive-deps */
import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken } from 'app/components/common/common';
import OrderHistoryList from './components/orderHistoryList';
import { useSelector } from 'react-redux';
import { selectOrderhistory } from './slice/selectors';
import FilterOrderHistory from './components/FilterOrderHistory';

const OrdersHistory = () => {
  const dataOrderHistory: any = useSelector(selectOrderhistory);

  return (
    <>
      {getToken() ? (
        <>
          <FilterOrderHistory />
          <OrderHistoryList dataSource={dataOrderHistory?.data?.list} />
        </>
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default OrdersHistory;
