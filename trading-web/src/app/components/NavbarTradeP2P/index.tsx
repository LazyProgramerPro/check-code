import { Button, List, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AiOutlinePlayCircle,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineMore,
  AiOutlineCaretDown,
  AiOutlineControl,
  AiOutlineMonitor,
  AiOutlinePlusCircle,
  AiOutlineProfile,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { OrderAllServices } from 'services/tabOrderAllServices';
import openNotification from '../NotificationAntd';
import { useSelector } from 'react-redux';
import { selectTabOrderDetail } from 'app/container/TabOrderDetailContainer/slice/selectors';
import { TabOrderDetailState } from 'app/container/TabOrderDetailContainer/slice/types';
import Countdown from 'antd/lib/statistic/Countdown';

interface Props {
  defaultActiveKey: string;
}

function NavbarTradeP2P(props: Props) {
  const navigate = useNavigate();
  const { defaultActiveKey } = props;
  const { getTradeByStatus } = OrderAllServices;
  const [listTradeProcess, setListTradeProcess] = useState<any>([]);
  const [loadingNotifi, setLoadingNotify] = useState(false);
  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);

  const handleChangeTabs = (key: any) => {
    if (key === 'p2p') {
      navigate({
        pathname: '/trade-p2p/p2p/',
        search: `?${createSearchParams({
          action: 'buy',
          crypto: '',
          fiat: '',
          payment: '',
        })}`,
      });
    }

    if (key === 'express') {
      navigate('/trade-p2p/express');
    }
  };

  const findAllOrderProcessing = () => {
    setLoadingNotify(true);
    getTradeByStatus('PROCESSING')
      .then(res => {
        if (res.data.rc === 0) {
          setListTradeProcess(res.data.rows.reverse());
          setLoadingNotify(false);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(() => {
        setLoadingNotify(false);
        openNotification('Error', 'Something went wrong!');
      });
  };

  useEffect(() => {
    findAllOrderProcessing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState.tradeStatus]);

  useEffect(() => {
    findAllOrderProcessing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ContentOrders = (
    <ContentOrdersStyled>
      <div className="orderTitle">
        <div className="orderTitle__text">Processing</div>
        <Button type="link" className="orderTitle__link">
          <Link to="/order/all">All Orders</Link>
        </Button>
      </div>

      <div className="orderContent">
        <List
          size="small"
          dataSource={listTradeProcess}
          loading={{
            spinning: loadingNotifi,
            indicator: <AiOutlineLoading3Quarters className="loadingIcon" />,
          }}
          renderItem={(item: any) => {
            let d = new Date(item?.createTime);
            const date1 = Date.now();
            return (
              <Link to={`/order/orderDetail/${item.id}`}>
                <div className="notificationItem">
                  <p className="">
                    <span>
                      <span className="actionOrder">
                        {item?.partner?.email !== item?.buyEmail ? (
                          <b data-color="green">Buy </b>
                        ) : (
                          <b data-color="red">Sell </b>
                        )}
                      </span>
                      <span className="crypto">
                        {item?.order?.token?.assetName}
                      </span>
                    </span>
                    <span className="status">
                      {item?.buyerStatus === 'NOT_PAID' &&
                        'Pending payment ...'}
                      {item?.buyerStatus === 'PAID' && 'Checking payment ...'}
                      {(item?.buyerStatus === 'APPEAL' ||
                        item?.sellerStatus === 'APPEAL') &&
                        'Appealing...'}
                    </span>
                  </p>
                  <p>
                    <span>
                      Price
                      <span className="price">
                        {' '}
                        {item?.price} {item?.order?.fiat?.name}
                      </span>
                    </span>
                    <span className="createTradeTime">
                      {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()} -{' '}
                      {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
                    </span>
                  </p>
                  <p>
                    <span>
                      Crypto amount{' '}
                      <b className="amount">
                        {item.amount?.toFixed(5)}{' '}
                        {item?.order?.token?.assetName}
                      </b>
                    </span>
                    <span className="total">
                      {item.total} {item?.order?.fiat?.name}
                    </span>
                  </p>
                  <p>
                    <span className="partner">
                      <span className="avatar">
                        {item?.partner?.email?.charAt(0).toUpperCase()}
                      </span>
                      {item?.partner?.email}
                    </span>
                    <span className="timeCountdown">
                      {item?.buyerStatus === 'NOT_PAID' && (
                        <Countdown
                          value={
                            Date.now() +
                            item?.order?.paymentTime?.timeLimit * 60000 -
                            (date1 - d.getTime())
                          }
                        ></Countdown>
                      )}
                    </span>
                  </p>
                </div>
              </Link>
            );
          }}
        ></List>
      </div>
    </ContentOrdersStyled>
  );

  const ContentMore = (
    <ContentMoreStyled>
      <ul>
        <Link to="/p2pUserCenter" className="responLink">
          <li>
            <AiOutlineTeam className="moreIcon" /> P2P User Center
          </li>
        </Link>
        <Link to="/order/all" className="responLink">
          <li>
            <AiOutlineFileText className="moreIcon" /> Order
          </li>
        </Link>
        <Link to="#" className="responLink">
          <li>
            <AiOutlinePlayCircle className="moreIcon" /> Video tutorial
          </li>
        </Link>
        <Link to="/p2pUserCenter#tabPaymentMethod">
          <li>
            <AiOutlineMonitor className="moreIcon" /> Payment Methods
          </li>
        </Link>

        <Link to="/en/postAd">
          <li>
            <AiOutlinePlusCircle className="moreIcon" /> Post new Ad
          </li>
        </Link>

        <Link to="#">
          <li>
            <AiOutlineControl className="moreIcon" /> My Ads
          </li>
        </Link>

        <Link to="#">
          <li>
            <AiOutlineProfile className="moreIcon" /> P2P Trading FAQ
          </li>
        </Link>
      </ul>
    </ContentMoreStyled>
  );
  return (
    <Wrapper>
      <NavbarTradeP2PStyled>
        <div className="trade-tabs container">
          <div>
            <Button
              type="link"
              className={
                defaultActiveKey === 'express'
                  ? 'trade-tabs__button trade-tabs__button--active'
                  : 'trade-tabs__button'
              }
              onClick={() => handleChangeTabs('express')}
            >
              Express
            </Button>

            <Button
              type="link"
              className={
                defaultActiveKey === 'p2p'
                  ? 'trade-tabs__button trade-tabs__button--active'
                  : 'trade-tabs__button'
              }
              onClick={() => handleChangeTabs('p2p')}
            >
              P2P
            </Button>
          </div>

          <div className="trade-tabs__options">
            <Button
              type="link"
              className="btnOption"
              icon={<AiOutlinePlayCircle className="btnOption__icon" />}
            >
              Video tutorial
            </Button>

            <Popover content={ContentOrders} placement="bottomLeft">
              <Button
                type="link"
                className="btnOption"
                icon={<AiOutlineFileText className="btnOption__icon" />}
              >
                <Link to="/order/all">Orders</Link>
              </Button>
            </Popover>

            <Button
              type="link"
              className="btnOption"
              icon={<AiOutlineTeam className="btnOption__icon" />}
            >
              <Link to="/p2pUserCenter">P2P User Center</Link>
            </Button>

            <Popover content={ContentMore} placement="bottomRight">
              <Button
                type="link"
                className="btnOption"
                icon={<AiOutlineMore className="btnOption__icon moreIcon" />}
              >
                More <AiOutlineCaretDown style={{ marginLeft: '8px' }} />
              </Button>
            </Popover>
          </div>
        </div>
      </NavbarTradeP2PStyled>
    </Wrapper>
  );
}

export default NavbarTradeP2P;

export const Wrapper = styled.div``;

const NavbarTradeP2PStyled = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: #000;

  .trade-tabs {
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button:focus,
    button:active {
      box-shadow: none;
    }

    &__button {
      height: 60px;

      color: ${({ theme }) => theme.text};
      opacity: 0.5;

      border: 2px solid transparent;
      background-color: inherit;

      &--active {
        border-bottom: 2px solid #ffffff;
        opacity: 1;
      }
    }

    &__options {
      .btnOption {
        height: 60px;
        color: ${({ theme }) => theme.text};

        &__icon {
          font-size: 20px;
          margin-right: 4px;
          margin-top: -3px;
        }

        &:hover {
          opacity: 0.5;
        }

        a {
          color: ${({ theme }) => theme.text};
          text-decoration: none;
        }
      }
    }
  }

  @media only screen and (max-width: 730px) {
    .trade-tabs__options {
      & > button:not(:last-child) {
        display: none;
      }

      .moreIcon {
        display: none;
      }
    }
  }
`;

const ContentOrdersStyled = styled.div`
  width: 300px;
  .orderTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__text {
      font-weight: bold;
    }

    &__link {
      color: ${({ theme }) => theme.primary};
    }

    border-bottom: 1px solid ${({ theme }) => theme.p2pBorder};
  }

  .orderContent {
    max-height: 50vh;
    overflow: scroll;

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
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.primary};
      border-radius: 0;
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.p2pText};
    }

    .notificationItem {
      border-bottom: 1px solid ${({ theme }) => theme.whiteSmokeColor} !important;
      padding: 10px 0;
      cursor: pointer;

      .actionOrder {
        font-size: 16px;
      }

      .crypto {
        font-weight: bold;
        font-size: 16px;
      }

      .status {
        color: ${({ theme }) => theme.primary};
      }

      .price {
        font-weight: bold;
      }

      .createTradeTime {
        color: ${({ theme }) => theme.grayColor};
      }
      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 5px 0;
      }

      b[data-color='green'] {
        color: ${({ theme }) => theme.greenColor};
      }

      b[data-color='red'] {
        color: ${({ theme }) => theme.redColor};
      }

      .amount,
      .total {
        font-weight: bold;
      }
      .timeCountdown {
        .ant-statistic-content-value {
          font-size: 14px !important;
          transform: translateY(-14px);
          color: ${({ theme }) => theme.primary};
        }
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
      }

      .partner {
        .avatar {
          font-weight: bold;
          background-color: ${({ theme }) => theme.primary};
          padding: 3px 7px;
          margin-right: 5px;
          border-radius: 50%;
          color: ${({ theme }) => theme.whiteSmokeColor};
        }
      }

      .timeCountdown {
        .clockIcon {
          font-size: 16px;
          transform: translateY(-2px);
        }
      }
    }
  }
`;

const ContentMoreStyled = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    width: 200px;
    height: 40px;
    line-height: 40px;

    &:hover {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
    }
  }
  .moreIcon {
    font-size: 20px;
  }

  .responLink {
    display: none;
  }
  @media only screen and (max-width: 730px) {
    .responLink {
      display: block;
    }
  }
`;
