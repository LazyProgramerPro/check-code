import AuthMandatory from 'app/components/AuthMandatory';
import { MyTradesComponent, Price, Amount, Time, Table } from './style';
import Header from '../Header';
import { getToken } from 'app/components/common/common';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTradehistorySlice } from 'app/components/TradesInformation/TradeHistory/slice';
import moment from 'moment';
import { selectTradehistory } from 'app/components/TradesInformation/TradeHistory/slice/selectors';
import numeral from 'numeral';

const MyTradesHistory = () => {
  const dispatch = useDispatch();
  const { actions } = useTradehistorySlice();
  const { data }: any = useSelector(selectTradehistory);
  useEffect(() => {
    const startTime = 0;
    const endTime = moment().valueOf();
    dispatch(actions.getTradeHistoryRequest({ startTime, endTime }));
  }, [actions, dispatch]);

  return (
    <>
      <Header />
      <Table>
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex justify-content-between table-item"
            >
              <Price data-type={item.isPriceUp ? 'up' : 'down'}>
                {numeral(item.price).format('0,0.00')}
              </Price>
              <Amount>{numeral(item.executed).format('0,0.00000')}</Amount>
              <Time>{moment(item.ts).format('HH:mm:ss')}</Time>
            </div>
          );
        })}
      </Table>
    </>
  );
};

const MyTrades = () => {
  return (
    <>
      {getToken() ? (
        <MyTradesHistory />
      ) : (
        <MyTradesComponent>
          <AuthMandatory />
        </MyTradesComponent>
      )}
    </>
  );
};
export default MyTrades;
