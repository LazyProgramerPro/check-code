import { useState, useEffect } from 'react';
import { Price, Amount, Total, Table, Wrapper } from './style';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { isEmpty } from 'app/components/common/common';
import { darkTheme } from 'theme/theme';
import { useParams } from 'react-router-dom';
import { OrderbookState } from '../../slice/types';
import { selectOrderbook } from '../../slice/selectors';
import { Badge } from 'antd';
// import { selectGetallpair } from 'app/components/Market/slice/selectors';

const OrderBookAsk = ({ dataSocket, miniTable }) => {
  const params = useParams();
  const pair = params?.pair?.split('_');
  const [dataView, setDataView]: any[] = useState([]);
  // const { reselectPair } = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  const [currentHover, setCurrentHover] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);
  const [coverHeight, setCoverHeight] = useState(0);
  const [idHover, setIdHover] = useState(0);

  const OrderbookState: OrderbookState = useSelector(selectOrderbook);
  const openOrderSell = OrderbookState?.openOrder
    ?.filter(order => order?.side === 'SELL')
    .map(order => order?.price);

  const handleMove = (e, index) => {
    setCurrentHover(index + 1);
    setIdHover(index);

    if (miniTable) {
      setCoverHeight(index * 20);
    } else {
      setCoverHeight(e?.target?.offsetTop - e.target?.parentElement?.scrollTop);
    }
  };

  const HandleOut = index => {
    setCurrentHover(0);
    setIdHover(0);
  };

  // useEffect(() => {
  //   if (dataApi?.length > 0) {
  //     setDataView(dataApi);
  //   }
  //   return () => {
  //     setDataView([]);
  //   };
  // }, [dataApi]);

  useEffect(() => {
    let totalSum1 = 0;
    let totalPrice = 0;

    if (miniTable) {
      let numberOrder = dataView
        ?.slice(-19)
        ?.filter((item, i) => i >= idHover)?.length;
      dataView
        ?.slice(-19)
        ?.filter((item, i) => i >= idHover)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1);
        setAvgPrice(totalPrice / numberOrder);
        setSum2(totalSum1 * totalPrice);
      }
    } else {
      let numberOrder = dataView?.filter((item, i) => i >= idHover)?.length;
      dataView
        ?.filter((item, i) => i >= idHover)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1);
        setAvgPrice(totalPrice / numberOrder);
        setSum2(totalSum1 * totalPrice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);
  useEffect(() => {
    if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.side === 'sell'
    ) {
      if (dataView === null || dataView === undefined) {
        setDataView([
          {
            price: dataSocket?.Value?.price,
            quantity:
              Number(dataSocket?.Value?.delta) *
              Number(dataSocket?.Value?.sign),
          },
        ]);
      } else if (dataView !== undefined && dataView !== null) {
        const index = dataView.findIndex((item: any) => {
          return item.price === dataSocket?.Value?.price;
        });
        if (index === -1) {
          const dataCopy = [...JSON.parse(JSON.stringify(dataView))];
          dataCopy.push({
            price: dataSocket?.Value.price,
            quantity:
              Number(dataSocket?.Value?.delta) *
              Number(dataSocket?.Value?.sign),
          });
          dataCopy.sort(function (a, b) {
            return b.price - a.price;
          });
          setDataView(dataCopy);
        } else if (index !== -1) {
          const dataCopy = [...JSON.parse(JSON.stringify(dataView))];
          const sumQuantity = Number(
            (
              Number(dataCopy[index].quantity) +
              Number(dataSocket?.Value.delta * dataSocket?.Value.sign)
            ).toPrecision(5),
          );
          if (sumQuantity > 0) {
            dataCopy[index].quantity = sumQuantity;
            setDataView(dataCopy);
          } else if (sumQuantity === 0 || sumQuantity < 0) {
            dataCopy.splice(index, 1);
            setDataView(dataCopy);
          }
        }
      }
    } else if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      Array.isArray(dataSocket.Value.asks)
    ) {
      setDataView(dataSocket.Value.asks);
    }
    //  else if (
    //   !isEmpty(dataSocket) &&
    //   dataSocket.Key === 'PowExchange::OrderBookChange' &&
    //   dataSocket.Value.asks === undefined &&
    //   dataSocket.Value.side === undefined
    // ) {
    //   setDataView([]);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);
  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };
  return (
    <Wrapper style={{ height: '98%', zIndex: 5 }}>
      <Table data-type={miniTable ? 'mini' : 'normal'}>
        {dataView !== undefined &&
          dataView !== null &&
          dataView?.slice(miniTable ? -19 : 0).map((item, index) => {
            return (
              <div
                onClick={() => selectPrice(item.price)}
                key={index}
                className="d-flex justify-content-between table-item"
                onMouseOver={e => handleMove(e, index)}
                onMouseOut={e => HandleOut(index)}
                style={{
                  backgroundColor:
                    index >= currentHover - 1 && currentHover !== 0
                      ? darkTheme.brightGrayColorBlur
                      : 'inherit',
                }}
              >
                {openOrderSell.includes(Number(item?.price)) && (
                  <Badge status="warning" className="markOpen" />
                )}
                <Price>{numeral(item.price).format('0,0.000')}</Price>
                <Amount>
                  {numeral(Math.abs(item.quantity)).format('0,0.00000')}
                </Amount>
                <Total>
                  {numeral(Math.abs(item.price * item.quantity)).format(
                    '0,0.00000',
                  )}
                </Total>
              </div>
            );
          })}
      </Table>
      <div
        className="info"
        style={{
          display: currentHover ? 'block' : 'none',
          top: `calc(${coverHeight}px + 1px)`,
        }}
      >
        <p>
          <span className="label">Avg. price :</span>
          <span> ≈ {Math.abs(avgPrice).toFixed(5)}</span>
        </p>
        <p>
          <span className="label">Sum {pair ? pair[0] : ''} :</span>
          <span> {Math.abs(sum1).toFixed(5)}</span>
        </p>
        <p>
          <span className="label">Sum {pair ? pair[1] : ''} :</span>
          <span> {Math.abs(sum2).toFixed(5)}</span>
        </p>
      </div>
    </Wrapper>
  );
};
export default OrderBookAsk;
