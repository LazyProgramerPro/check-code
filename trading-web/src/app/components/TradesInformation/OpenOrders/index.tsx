/* eslint-disable react-hooks/exhaustive-deps */
import AuthMandatory from 'app/components/AuthMandatory';
import { Container } from './style';
import { getToken, isEmpty } from 'app/components/common/common';
import OpenOrderList from './components/OpenOrderList';
import { useSelector, useDispatch } from 'react-redux';
import { selectWebsocket } from 'app/container/HomeContainer/slice/selectors';
import { selectBuyspotlimit } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice/selectors';
import { selectSellspotlimit } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice/selectors';
import { useState, useEffect } from 'react';
import { useGetopenOrderSlice } from './slice';
import { selectGetopenOrder } from './slice/selectors';
import { useWebsocketSlice } from 'app/container/HomeContainer/slice';
import { useSellspotlimitSlice } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice';
import { useBuyspotlimitSlice } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice';
import { useOrderbookSlice } from 'app/components/OrderBook/slice';

interface stateProps {
  order_id?: string;
  filled?: number;
}
const Orders = () => {
  const dispatch = useDispatch();
  const { actions } = useGetopenOrderSlice();
  const { actions: actionsWebsocket } = useWebsocketSlice();
  const { actions: actionsSellspotlimit } = useSellspotlimitSlice();
  const { actions: actionsBuyspotlimit } = useBuyspotlimitSlice();
  const dataSocket: any = useSelector(selectWebsocket);
  const dataBuy: any = useSelector(selectBuyspotlimit);
  const dataSell: any = useSelector(selectSellspotlimit);
  const dataOrders: any = useSelector(selectGetopenOrder);
  const [dataOpenOrders, setDataOpenOrders] = useState<stateProps[]>([]);
  const setOpeningOrder = useOrderbookSlice().actions;

  useEffect(() => {
    if (getToken()) {
      const param = {
        pageIndex: dataOrders?.pageIndex,
        pageSize: dataOrders?.pageSize,
      };
      dispatch(actions.getopenOrderRequest(param));
    }
  }, [dataOrders?.pageSize]);
  useEffect(() => {
    if (dataOrders?.data?.list?.length > 0) {
      setDataOpenOrders(dataOrders?.data?.list);
    }
    return () => {
      dispatch(actionsWebsocket.updateOrderFilled({}));
      dispatch(actionsSellspotlimit.clearstate());
      dispatch(actionsBuyspotlimit.clearstate());
    };
  }, [dataOrders?.data]);
  useEffect(() => {
    if (dataOrders?.responseCancelOrder?.rc === 0) {
      const index = dataOpenOrders.findIndex((item: any) => {
        return item.order_id === dataOrders?.responseCancelOrder.orderId;
      });
      if (index !== -1 && dataOpenOrders !== undefined) {
        const dataCopy = [...JSON.parse(JSON.stringify(dataOpenOrders))];
        dataCopy.splice(index, 1);
        setDataOpenOrders(dataCopy);
      }
    }
  }, [dataOrders?.responseCancelOrder]);
  useEffect(() => {
    if (
      !isEmpty(dataBuy?.data) &&
      dataOpenOrders.find(
        (item: any) => item.order_id === dataBuy?.data.order_id,
      ) === undefined
    ) {
      setDataOpenOrders((prev: any) => [dataBuy?.data, ...prev]);
    }
  }, [dataBuy?.data]);
  useEffect(() => {
    if (
      !isEmpty(dataSell?.data) &&
      dataOpenOrders.find(
        (item: any) => item.order_id === dataSell?.data.order_id,
      ) === undefined
    ) {
      setDataOpenOrders((prev: any) => [dataSell?.data, ...prev]);
    }
  }, [dataSell?.data]);
  useEffect(() => {
    if (dataSocket?.Orderfilled.filled === true) {
      const index = dataOpenOrders.findIndex((item: any) => {
        return item.order_id === dataSocket?.Orderfilled.order_id;
      });
      if (index !== -1 && dataOpenOrders !== undefined) {
        const dataCopy = [...JSON.parse(JSON.stringify(dataOpenOrders))];
        dataCopy.splice(index, 1);
        setDataOpenOrders(dataCopy);
      }
    } else if (dataSocket?.Orderfilled.filled === false) {
      const index = dataOpenOrders.findIndex((item: any) => {
        return item.order_id === dataSocket?.Orderfilled.order_id;
      });
      if (index !== -1 && dataOpenOrders !== undefined) {
        const dataCopy = [...JSON.parse(JSON.stringify(dataOpenOrders))];
        const percentFill =
          ((dataSocket?.Orderfilled?.origin_quantity -
            dataSocket?.Orderfilled?.order_quantity) /
            dataSocket?.Orderfilled?.origin_quantity) *
          100;
        dataCopy[index].filled = percentFill;
        setDataOpenOrders(dataCopy);
      }
    }
  }, [dataSocket]);
  useEffect(() => {
    if (dataOpenOrders?.length > 0 && dataOpenOrders?.length <= 5) {
      dispatch(setOpeningOrder.setOpenOrder(dataOpenOrders));
    } else if (dataOpenOrders?.length > 5) {
      dispatch(
        setOpeningOrder.setOpenOrder(dataOpenOrders?.filter((o, i) => i <= 4)),
      );
    } else {
      dispatch(setOpeningOrder.setOpenOrder([]));
    }
  }, [dataOpenOrders]);

  return (
    <>
      {getToken() ? (
        <OpenOrderList dataSource={dataOpenOrders} />
      ) : (
        <Container>
          <AuthMandatory />
        </Container>
      )}
    </>
  );
};
export default Orders;
