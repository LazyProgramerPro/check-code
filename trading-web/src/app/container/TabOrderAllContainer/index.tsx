import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import styled from 'styled-components';
import { List, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { OrderAllServices } from 'services/tabOrderAllServices';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import openNotification from 'app/components/NotificationAntd';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { darkTheme } from 'theme/theme';
const TabOrderAllContainer = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [listTrades, setListTrades] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { getTradeByToken, getTradeByStatus } = OrderAllServices;

  const getListOrderUser = () => {
    setLoading(true);
    getTradeByToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListTrades(res.data.rows);
          setLoading(false);
        } else console.log(res.data.rd);
      })
      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  const getListOrderUserProcessing = () => {
    setLoading(true);
    getTradeByStatus('PROCESSING')
      .then(res => {
        if (res.data.rc === 0) {
          setListTrades(res.data.rows);
          setLoading(false);
        } else console.log(res.data.rd);
      })
      .catch(() => openNotification('Error', 'Something went wrong!'));
  };

  const handleCopy = value => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    if (activeTab === 1) {
      getListOrderUserProcessing();
    } else {
      getListOrderUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="" />
      <div className="navTab">
        <div className="container tabTitle">
          <p
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => setActiveTab(1)}
          >
            Processing
          </p>
          <p
            className={activeTab === 2 ? 'active' : ''}
            onClick={() => setActiveTab(2)}
          >
            All orders
          </p>
        </div>
      </div>
      <div className="container mainContent">
        <div className="content">
          <List
            loading={{
              spinning: loading,
              indicator: <AiOutlineLoading3Quarters className="loadingIcon" />,
            }}
            header={
              <div>
                <Row>
                  <Col xl={2} md={2}>
                    Type/Coin
                  </Col>
                  <Col xl={2} md={2}>
                    Fiat amount
                  </Col>
                  <Col xl={2} md={2}>
                    Price
                  </Col>
                  <Col xl={2} md={2}>
                    Crypto amount
                  </Col>
                  <Col xl={3} md={2}>
                    Counterparty
                  </Col>
                  <Col xl={1} md={2}>
                    Status
                  </Col>
                </Row>
              </div>
            }
            dataSource={listTrades?.reverse()}
            renderItem={(item: any) => {
              let d = new Date(item.createTime);
              return (
                <List.Item>
                  <div className="titleItem">
                    <div>
                      {item?.partner?.email === item?.sellEmail ? (
                        <span data-color="red">Sell</span>
                      ) : (
                        <span data-color="green">Buy</span>
                      )}
                      <span>
                        {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()} -{' '}
                        {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
                      </span>
                    </div>
                    <span>
                      {item.orderNumber}{' '}
                      <Tooltip title="Copied" trigger="click" placement="right">
                        <FaCopy
                          className="copyIcon"
                          onClick={() => handleCopy(item.orderNumber)}
                        />
                      </Tooltip>
                      <Link to={`/order/orderDetail/${item.id}`}>
                        <BsFillArrowRightSquareFill
                          style={{
                            color: darkTheme.primary,
                            marginLeft: '20px',
                            fontSize: '20px',
                          }}
                        />
                      </Link>
                    </span>
                  </div>
                  <Row className="item">
                    <Col md={2} xl={2} sm={6} xs={12} className="colToken">
                      <span className="responTitle">Coin: </span>
                      <img
                        className="iconToken"
                        src={item?.order?.token?.icon}
                        alt={item?.order?.token?.assetName}
                      />
                      <span>{item?.order?.token?.assetName}</span>
                    </Col>
                    <Col md={2} xl={2} sm={6} xs={12}>
                      <span className="responTitle">Fiat amount: </span>
                      <b>
                        {item?.total.toFixed(2)} {item?.order?.fiat?.name}
                      </b>
                    </Col>
                    <Col md={2} xl={2} sm={6} xs={12}>
                      <span className="responTitle">Price: </span>
                      <span>
                        {item?.price?.toFixed(2)} {item?.order?.fiat?.name}
                      </span>
                    </Col>
                    <Col md={2} xl={2} sm={6} xs={12}>
                      <span className="responTitle">Crypto amount: </span>
                      <span>
                        {item?.amount?.toFixed(2)}{' '}
                        {item?.order?.token?.assetName}
                      </span>
                    </Col>
                    <Col md={2} xl={3} sm={6} xs={12}>
                      <span className="responTitle">Counterparty: </span>
                      <span>{item?.partner?.email}</span>
                    </Col>
                    <Col md={2} xl={1} sm={6} xs={12}>
                      <span className="responTitle">Status: </span>
                      <b>{item?.status}</b>
                    </Col>
                    {/* <Col md={3} lg={2}>
                      
                    </Col> */}
                  </Row>
                </List.Item>
              );
            }}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5,
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default TabOrderAllContainer;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.p2pBackground};

  .navTab {
    box-shadow: 0 2px 2px -2px ${({ theme }) => theme.brightGrayColor};
    padding-top: 30px;

    .tabTitle {
      padding: 0 28px;
      font-weight: bold;
      font-size: 16px;
      display: flex;
      p {
        margin-right: 15px;
        margin-bottom: 0;
        padding-bottom: 10px;
        border-bottom: 3px solid transparent;
        transition: all 0.25s linear;
        cursor: pointer;
        color: ${({ theme }) => theme.grayColor};
      }
      .active {
        color: ${({ theme }) => theme.p2pText};
        border-bottom: 3px solid ${({ theme }) => theme.primary};
      }
    }
  }

  .mainContent {
    min-height: 50vh;
    padding: 20px 25px;

    .header {
      margin-bottom: 20px;
    }
  }

  .responTitle {
    color: ${({ theme }) => theme.brightGrayColor};
    display: none;
  }
  .item {
    padding: 0 12px;

    & > div {
      margin: 10px 0;
    }
  }

  .ant-list-item {
    width: 100%;
    display: block;
    padding: 0;
    transform: translateX(-1px);
    .iconToken {
      width: 30px !important;
      margin-right: 10px;
    }

    .titleItem {
      display: flex;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      padding: 10px 10px;
      margin: 1px;
      color: ${({ theme }) => theme.brightGrayColor};

      span[data-color='red'] {
        font-weight: bold;
        color: ${({ theme }) => theme.redColor};
        padding-right: 10px;
        margin-right: 10px;
        border-right: 2px solid ${({ theme }) => theme.redColor};
      }
      span[data-color='green'] {
        font-weight: bold;
        color: ${({ theme }) => theme.greenColor};
        padding-right: 10px;
        margin-right: 10px;
        border-right: 2px solid ${({ theme }) => theme.greenColor};
      }
    }

    .col {
      padding: 20px 12px;

      a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
      }

      .colToken {
        /* transform: translateY(-2px); */
      }
    }
    .copyIcon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  @keyframes spining {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .loadingIcon {
    -webkit-animation: spining 1.1s infinite linear;
    animation: spining 1.1s infinite linear;
  }

  @media only screen and (max-width: 900px) {
    .ant-list-item {
      .col {
        padding: 10px 6px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .responTitle {
      display: inline;
    }

    .ant-list-header {
      display: none;
    }
  }

  @media only screen and (max-width: 575px) {
    .titleItem {
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 375px) {
    .mainContent {
      padding: 10px;
    }
  }
`;
