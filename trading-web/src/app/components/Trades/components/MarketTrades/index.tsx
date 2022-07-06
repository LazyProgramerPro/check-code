import numeral from 'numeral';
import { Price, Amount, Time, Table } from './style';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { isEmpty } from 'app/components/common/common';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { useSelector } from 'react-redux';

const MarketTrades = ({ dataSocket, dataApi }) => {
  const [dataView, setDataView]: any[] = useState([]);
  const { reselectPair } = useSelector(selectGetallpair);
  useEffect(() => {
    if (!isEmpty(dataApi.data)) {
      setDataView(dataApi.data.data.list);
    } else {
      setDataView([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reselectPair]);
  useEffect(() => {
    if (!isEmpty(dataApi.data)) {
      setDataView(dataApi.data.data.list);
    }
  }, [dataApi]);
  useEffect(() => {
    if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'Robinhood::RecentTrade' &&
      dataSocket.Value.marker_id !== dataSocket.Value.taker_id
    ) {
      setDataView((prevState: any) => {
        const newData = [...prevState];
        newData.splice(-1);
        return [dataSocket.Value, ...newData];
      });
    }
  }, [dataSocket]);
  return (
    <Table>
      {dataView !== undefined &&
        dataView.map((item, index) => {
          return (
            <div
              key={index}
              className="d-flex justify-content-between table-item"
            >
              <Price data-type={item.isPriceUp ? 'up' : 'down'}>
                {numeral(item.price).format('0,0.00')}
              </Price>
              <Amount>{numeral(item.amount).format('0,0.00000')}</Amount>
              <Time>{moment(item.ts).format('HH:mm:ss')}</Time>
            </div>
          );
        })}
    </Table>
  );
};
export default MarketTrades;
