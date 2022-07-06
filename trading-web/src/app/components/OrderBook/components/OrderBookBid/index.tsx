import { useState, useEffect } from 'react';
import {
  Price,
  Amount,
  Total,
  OrderBookBidHeader,
  Table,
  Wrapper,
} from './style';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { isEmpty } from 'app/components/common/common';
import { useDispatch } from 'react-redux';
import { useOrderbookSlice } from '../../slice';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { darkTheme } from 'theme/theme';
import { OrderbookState } from '../../slice/types';
import { selectOrderbook } from '../../slice/selectors';
import { Badge } from 'antd';

const OrderBookBid = ({ dataSocket, miniTable }: any) => {
  const { t } = useTranslation();
  const [dataView, setDataView]: any[] = useState([]);
  const [lastestPrice, setLastestPrice] = useState('');
  const [currentHover, setCurrentHover] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);
  const [coverHeight, setCoverHeight] = useState(0);
  const [idHover, setIdHover] = useState(0);

  const pairData: any = useSelector(selectGetallpair);
  const dispatch = useDispatch();
  const { actions } = useOrderbookSlice();
  let { pair } = useParams();
  const currentPair = pair?.split('_');

  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair = `${pair?.substring(0, findIndex)}/${pair?.substring(
    findIndex + 1,
  )}`;

  const OrderbookState: OrderbookState = useSelector(selectOrderbook);
  const openOrderBuy = OrderbookState?.openOrder
    ?.filter(order => order?.side === 'BUY')
    .map(order => order?.price);

  useEffect(() => {
    const index: any = pairData?.data?.rows?.findIndex((item: any) => {
      return item?.symbol === changeFormatPair;
    });
    if (index !== -1 && index !== undefined) {
      setLastestPrice(pairData?.data?.rows[index]?.latestPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairData?.data, pair]);
  // useEffect(() => {
  //   if (dataApi?.length > 0) {
  //     setDataView(dataApi);
  //   }
  //   return () => {
  //     setDataView([]);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataApi]);
  useEffect(() => {
    if (
      !isEmpty(dataSocket) &&
      dataSocket.Key === 'PowExchange::OrderBookChange' &&
      dataSocket.Value.side === 'buy'
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
      Array.isArray(dataSocket.Value.bids)
    ) {
      setDataView(dataSocket.Value.bids);
    }
    // else if (
    //   !isEmpty(dataSocket) &&
    //   dataSocket.Key === 'PowExchange::OrderBookChange' &&
    //   dataSocket.Value.bids === undefined &&
    //   dataSocket.Value.side === undefined
    // ) {
    //   setDataView([]);
    // }
    if (!isEmpty(dataSocket) && dataSocket.Key === 'RobinhoodPair') {
      if (!isEmpty(dataSocket.Value)) {
        if (dataSocket.Value.symbol === changeFormatPair) {
          setLastestPrice(dataSocket.Value?.latestPrice);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSocket]);
  const selectPrice = (price: number) => {
    dispatch(actions.selectPrice(price));
  };

  useEffect(() => {
    let totalSum1 = 0;
    let totalPrice = 0;

    if (miniTable) {
      let numberOrder = dataView
        ?.slice(0, 16)
        ?.filter((item, i) => i <= idHover)?.length;
      dataView
        ?.slice(0, 16)
        ?.filter((item, i) => i <= idHover)
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
      let numberOrder = dataView?.filter((item, i) => i <= idHover)?.length;
      dataView
        ?.filter((item, i) => i <= idHover)
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
  const handleMove = (e, index) => {
    setCurrentHover(index + 1);
    setIdHover(index);
    let totalSum1 = 0;
    let totalPrice = 0;

    if (miniTable) {
      setCoverHeight(index * 20);
      let numberOrder = dataView
        ?.slice(0, 16)
        ?.filter((item, i) => i <= index)?.length;
      dataView
        ?.slice(0, 16)
        ?.filter((item, i) => i <= index)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1 / numberOrder);
        setAvgPrice(totalPrice / numberOrder);
        setSum2((totalSum1 * totalPrice) / numberOrder);
      }
    } else {
      setCoverHeight(e?.target?.offsetTop - e.target?.parentElement?.scrollTop);
      let numberOrder = dataView?.filter((item, i) => i <= index)?.length;
      dataView
        ?.filter((item, i) => i <= index)
        ?.forEach(item => {
          totalSum1 += Number(item?.quantity);
          totalPrice += Number(item?.price);
        });
      if (numberOrder && totalSum1 && totalPrice) {
        setSum1(totalSum1 / numberOrder);
        setAvgPrice(totalPrice / numberOrder);
        setSum2((totalSum1 * totalPrice) / numberOrder);
      }
    }
  };
  const HandleOut = index => {
    setCurrentHover(0);
    setIdHover(0);
  };
  return (
    <Wrapper>
      <OrderBookBidHeader>
        <div className="d-flex align-items-center">
          <div
            className="contractPrice"
            // data-type={
            //   dataMarketSocket?.isPriceUp
            //     ? 'up'
            //     : dataMarketSocket?.isPriceUp === false
            //     ? 'down'
            //     : ''
            // }
          >
            {numeral(lastestPrice).format('0,0.000')}
            {/* {dataMarketSocket?.isPriceUp ? (
              <BsArrowUp />
            ) : dataMarketSocket?.isPriceUp === false ? (
              <BsArrowDown />
            ) : null} */}
          </div>
          <div className="markPrice">
            ${numeral(lastestPrice).format('0,0.0')}
          </div>
        </div>
        <a href="/#" className="readmore">
          {t('more')}
        </a>
      </OrderBookBidHeader>
      <Table
        data-type={miniTable ? 'mini' : 'normal'}
        style={{ zIndex: 5, overflowY: 'scroll' }}
      >
        {dataView !== undefined &&
          dataView !== null &&
          miniTable &&
          dataView?.slice(0, 16)?.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex table-item"
                onClick={() => selectPrice(item.price)}
                onMouseOver={e => handleMove(e, index)}
                onMouseOut={e => HandleOut(index)}
                style={{
                  backgroundColor:
                    index <= currentHover - 1 && currentHover !== 0
                      ? darkTheme.brightGrayColorBlur
                      : 'inherit',
                }}
              >
                {openOrderBuy.includes(Number(item?.price)) && (
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

        {dataView !== undefined &&
          dataView !== null &&
          !miniTable &&
          dataView?.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex table-item"
                onClick={() => selectPrice(item.price)}
                onMouseOver={e => handleMove(e, index)}
                onMouseOut={e => HandleOut(index)}
                style={{
                  backgroundColor:
                    index <= currentHover - 1 && currentHover !== 0
                      ? darkTheme.brightGrayColorBlur
                      : 'inherit',
                }}
              >
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
          transform: miniTable
            ? `translate(calc(100% + 5px), 10px)`
            : `translate(calc(100% + 5px), calc(-50% + 19px))`,
        }}
      >
        <p>
          <span className="label">Avg. price :</span>
          <span> ≈ {Math.abs(avgPrice).toFixed(5)}</span>
        </p>
        <p>
          <span className="label">
            Sum {currentPair ? currentPair[0] : ''} :
          </span>
          <span> {Math.abs(sum1).toFixed(5)}</span>
        </p>
        <p>
          <span className="label">
            Sum {currentPair ? currentPair[1] : ''} :
          </span>
          <span> {Math.abs(sum2).toFixed(5)}</span>
        </p>
      </div>
    </Wrapper>
  );
};
export default OrderBookBid;
