import React from 'react';
import styled from 'styled-components';
import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import HeaderOrderDetail from './components/HeaderOrderDetail';
import ContentOrderDetail from './components/ContentOrderDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tabOrderDetailService } from 'services/orderDetailService';
import { useDispatch } from 'react-redux';
import { useTabOrderDetailSlice } from './slice';

function TabOrderDetailContainer() {
  const tradeId = Number(useParams()?.id);

  const [tradeDetail, setTradeDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const setBuyerStatus = useTabOrderDetailSlice().actions;
  const setSellerStatus = useTabOrderDetailSlice().actions;
  const setTradeStatus = useTabOrderDetailSlice().actions;
  const setTradeType = useTabOrderDetailSlice().actions;

  const { getTradeById } = tabOrderDetailService;

  const getTrade = () => {
    setLoading(true);
    if (tradeId) {
      getTradeById(tradeId)
        .then(res => {
          if (res.data.rc === 0) {
            setTradeDetail(res.data.item);
            console.log(res.data.item);
            dispatch(setBuyerStatus.setBuyerStatus(res.data.item.buyerStatus));
            dispatch(
              setSellerStatus.setSellerStatus(res.data.item.sellerStatus),
            );
            dispatch(setTradeStatus.setTradeStatus(res.data.item.status));
            if (res.data.item?.buyEmail === res.data.item?.partner?.email) {
              dispatch(setTradeType.setTradeType('Sell'));
            } else dispatch(setTradeType.setTradeType('Buy'));
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch(res => console.log(res));
    }
  };

  useEffect(() => {
    getTrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradeId]);

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="" />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <HeaderOrderDetail trade={tradeDetail} reload={getTrade} />
          <div className="orderDetail-container container">
            <ContentOrderDetail trade={tradeDetail} reload={getTrade} />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default TabOrderDetailContainer;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.p2pBackground};
  color: ${({ theme }) => theme.body};

  min-height: 100vh;

  .loader,
  .loader:before,
  .loader:after {
    background: ${({ theme }) => theme.primary};
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .loader {
    color: ${({ theme }) => theme.primary};
    opacity: 0.8;
    text-indent: -9999em;
    margin: 200px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;
