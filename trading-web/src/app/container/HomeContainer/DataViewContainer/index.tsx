/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import ContentHeader from 'app/components/ContentHeader';
import OrderBook from 'app/components/OrderBook';
import Chart from 'app/components/Chart';
import OrderFormContainer from 'app/container/OrderFormContainer';
import Market from 'app/components/Market';
import Trades from 'app/components/Trades';
import MarketActivities from 'app/components/Trades/components/MarketActivities';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGetallpair } from 'app/components/Market/slice/selectors';
import { useTradesSlice } from 'app/components/Trades/slice';
import { selectTrades } from 'app/components/Trades/slice/selectors';
import { useWebsocketSlice } from 'app/container/HomeContainer/slice';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;

// const socket = new WebSocket(`${baseURL}/ws`);
const HomeContentContainer = () => {
  // const [dataMarketSocket, setDataMarketSocket]: any = useState({});
  // const [dataOrder, setDataOrder]: any = useState({});
  const [webSocket, setWebSocket]: any = useState();
  const [windowWidth, setWindowWidth] = useState(0);
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const [socketMess, setSocketMess]: any = useState({});
  const { actions: actionsTrades } = useTradesSlice();
  const { actions: actionsWebsocket } = useWebsocketSlice();
  const dataAllPair = useSelector(selectGetallpair);
  const dataAllTrades = useSelector(selectTrades);
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  const changeFormatPair = `${pair?.substring(0, findIndex)}/${pair?.substring(
    findIndex + 1,
  )}`;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    var socket = new ReconnectingWebSocket(`${baseURL}/ws`, [], {
      connectionTimeout: 5000,
    });
    setWebSocket(socket);
    socket.onopen = () => {
      console.log(`Websocket Market connected`);
      if (
        changeFormatPair !== '' &&
        changeFormatPair !== undefined &&
        changeFormatPair !== null
      ) {
        socket.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            pair: changeFormatPair,
          }),
        );
      }
      setInterval(
        () =>
          socket.send(
            JSON.stringify({
              method: 'GET_PROPERTY',
              id: Math.random(),
            }),
          ),
        5000,
      );
    };
    socket.onclose = () => {
      console.log('WebSocket Closed!');
    };
    socket.onmessage = (message: any) => {
      const Message = JSON.parse(message?.data);
      setSocketMess(Message);
      if (Message.Key === 'Robinhood::OrderFilled') {
        dispatch(actionsWebsocket.updateOrderFilled(Message.Value));
      }
    };
    return () => {
      socket.close();
    };
  }, []);
  // useEffect(() => {
  // setDataOrder({});
  // setDataMarketSocket({});
  // }, [dataAllPair?.reselectPair]);

  useEffect(() => {
    const findIndex: any = pair?.indexOf('_');
    if (pair !== '') {
      dispatch(
        actionsTrades.getTradesRequest(
          `${pair?.substring(0, findIndex)}/${pair?.substring(findIndex + 1)}`,
        ),
      );
    }
  }, [pair]);
  return (
    <Container>
      {windowWidth >= 657 && (
        <StyledRow>
          <Col md={12} lg={12} xxl={9} xl={9}>
            <StyledRow>
              <ContentHeader socketMess={socketMess} />
            </StyledRow>
            <StyledRow className="content-left">
              <StyledCol
                xxl={4}
                xl={4}
                lg={12}
                md={12}
                className="orderbook-section"
              >
                <OrderBook socketMess={socketMess} />
                <div className="market">
                  <Market
                    dataSocket={socketMess}
                    dataApi={dataAllPair}
                    socket={webSocket}
                  />
                  <Trades dataSocket={socketMess} dataApi={dataAllTrades} />
                  <MarketActivities />
                </div>
              </StyledCol>
              <StyledCol
                xxl={8}
                xl={8}
                lg={12}
                md={12}
                className="d-flex flex-column"
              >
                <Row
                  style={{
                    maxWidth: 'calc(100vw - 5px)',
                    margin: '0 auto',
                    width: '100%',
                  }}
                >
                  <Col xxl={12} xl={12} lg={8}>
                    <Chart />
                  </Col>
                  <Col xxl={12} xl={12} lg={4}>
                    <OrderFormContainer />
                  </Col>
                </Row>
              </StyledCol>
            </StyledRow>
          </Col>
          <StyledCol xxl={3} lg={6} xl={3} className="right-menu">
            <Market
              dataSocket={socketMess}
              dataApi={dataAllPair}
              socket={webSocket}
            />
            <Trades dataSocket={socketMess} dataApi={dataAllTrades} />
            <MarketActivities />
          </StyledCol>
        </StyledRow>
      )}
      {windowWidth < 657 && (
        <ContainerMobile>
          <ContentHeader socketMess={socketMess} />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Chart" key="1">
              <Chart />
              <OrderFormContainer />
            </TabPane>
            <TabPane tab="Order Book" key="2">
              <OrderBook socketMess={socketMess} />
            </TabPane>
            <TabPane tab="Market" key="3">
              <Market
                dataSocket={socketMess}
                dataApi={dataAllPair}
                socket={webSocket}
              />
              <Trades dataSocket={socketMess} dataApi={dataAllTrades} />
              <MarketActivities />
            </TabPane>
          </Tabs>
        </ContainerMobile>
      )}
    </Container>
  );
};
export default HomeContentContainer;
const StyledRow = styled(Row)`
  padding: 0;

  .orderbook-section,
  .right-menu {
    border: ${({ theme }) => theme.borderGray};
    border-top: none;
    border-bottom: none;
  }
  .right-menu {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 1199px) {
    .content-left {
      display: flex;
      flex-direction: column-reverse;
    }

    .right-menu {
      display: none;
    }
    .orderbook-section {
      display: flex;
      justify-content: space-between;

      & > div {
        width: 50%;
      }
      .market {
        width: 50%;
        display: flex;
        flex-direction: column;
      }
    }

    #orderbook {
      width: 50%;
    }
  }

  @media only screen and (min-width: 1200px) {
    .market {
      display: none;
    }
  }

  @media only screen and (max-width: 650px) {
    .orderbook-section {
      flex-direction: column;
      & > div {
        width: 100%;
      }

      .market {
        width: 100%;
      }
    }
  }
`;
const StyledCol = styled(Col)`
  padding: 0;
`;

const ContainerMobile = styled.div`
  .ant-tabs {
    color: ${({ theme }) => theme.p2pTextLight};
  }

  .ant-tabs-nav {
    &::before {
      display: none;
    }

    margin-bottom: 0;
    padding-left: 16px;
    margin-top: 20px;
  }
  .ant-tabs-ink-bar {
    display: none;
  }

  .ant-tabs-tab-active {
    font-weight: bold;
  }
`;
