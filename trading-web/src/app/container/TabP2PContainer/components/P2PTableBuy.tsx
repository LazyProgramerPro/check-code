import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { tabP2PService } from '../../../../services/tabP2PServices';
import { useSelector } from 'react-redux';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { useDispatch } from 'react-redux';
import { useTabP2PSlice } from '../slice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import HandleOrder from './HandleOrder';

function P2PTableBuy() {
  const [listP2POrdersBuy, setListP2POrdersBuy] = useState<any>([]);
  const [listP2POrders, setListP2POrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openOrders, setOpenOrders] = useState<any>([]);
  const dispatch = useDispatch();
  const findTokens = useTabP2PSlice().actions;
  const findFiats = useTabP2PSlice().actions;
  const findPayments = useTabP2PSlice().actions;

  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const {
    getListFiat,
    getListToken,
    getListOrderBy,
    getListPayments,
    getListOrder,
  } = tabP2PService;

  const columns: ColumnsType<any> = [
    {
      title: 'Advertisers',
      key: 'Advertisers',
      dataIndex: 'account',
      width: 350,
      render: (text: any, record: any, index: any) => {
        if (!openOrders.includes(index)) {
          return (
            <ColAdvertisers>
              <div className="row1">
                <div className="firstCharacter">
                  {record.account.email.charAt(0).toUpperCase()}
                </div>
                <div className="advertisers">{record.account.email}</div>
                <div className="checked">
                  {<BsFillCheckCircleFill color="#10afff" />}
                </div>
              </div>

              <div className="row2">
                {''}
                <span>{text.orderIn30Day} Orders</span>
                <span className="numberOrderComplete">
                  {text.rateComplete.toFixed(2)} % completed
                </span>
              </div>

              <ColPayment className="paymentRes">
                <span className="paymentRes__title">Payments method:</span>
                {record?.payments?.length === 0 ? (
                  <h6>Unknow payment!</h6>
                ) : (
                  record?.payments?.map((payment, index) => {
                    if (payment) {
                      return (
                        <Tag key={index} className="paymentTag">
                          <img src={payment.paymentMethod.icon} alt="#" />{' '}
                          <span
                            style={{
                              color: `${payment.paymentMethod.colorCode}`,
                            }}
                          >
                            {payment.paymentMethod.name}
                          </span>
                        </Tag>
                      );
                    } else return null;
                  })
                )}
              </ColPayment>
              <ButtonSell
                className="btnOpenOrder"
                onClick={() => {
                  setOpenOrders([...openOrders, index]);
                }}
              >
                <span>Buy {record.token.assetName}</span>
              </ButtonSell>
            </ColAdvertisers>
          );
        } else {
          return (
            <HandleOrder
              listP2POrders={listP2POrders}
              text={text}
              record={record}
              index={index}
              hanldeCloseOrder={hanldeCloseOrder}
              timeLimit={record?.paymentTime?.timeLimit}
              available={record.available}
              type="Buy"
            />
          );
        }
      },

      onCell: (_, index) => {
        return {
          colSpan: openOrders.includes(index) ? 5 : 1,
        };
      },
    },
    {
      title: 'Price',
      key: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.price - b.price,
      width: 200,
      render: (_, record: any) => {
        return (
          <ColPrice>
            <span className="priceSpan">{record.price} </span>
            {record.fiat?.name}
            <ColLimitAvailable className="avaiRes">
              <div className="rowLimitAvailable available">
                <div className="col1">
                  <span>Avai</span>
                </div>
                <div className="col2">
                  {record?.available?.toFixed(5)}{' '}
                  <span>{TabP2PState.searchParam?.crypto}</span>
                </div>
              </div>
              <div className="rowLimitAvailable limit">
                <div className="col1">Limit</div>
                <div className="col2">
                  {record?.fiat?.symbol} {record?.orderLowerBound?.toFixed(2)}{' '}
                  <span> - </span>
                </div>
                <div className="col3">
                  {record?.fiat?.symbol} {record?.orderUpperBound?.toFixed(2)}
                </div>
              </div>
            </ColLimitAvailable>
          </ColPrice>
        );
      },
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
    {
      title: 'Limit/Available',
      key: 'Limit/Available',
      width: 300,
      render: (text: any, record: any) => (
        <ColLimitAvailable>
          <div className="rowLimitAvailable">
            <div className="col1">
              <span>Available</span>
            </div>
            <div className="col2">
              {record?.available?.toFixed(5)}{' '}
              <span>{TabP2PState.searchParam?.crypto}</span>
            </div>
          </div>
          <div className="rowLimitAvailable limit">
            <div className="col1">Limit</div>
            <div className="col2">
              {record?.fiat?.symbol} {record?.orderLowerBound?.toFixed(2)}{' '}
              <span> - </span>
            </div>
            <div className="col3">
              {record?.fiat?.symbol} {record?.orderUpperBound?.toFixed(2)}
            </div>
          </div>
        </ColLimitAvailable>
      ),
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
      responsive: ['md'],
    },
    {
      title: 'Payments',
      key: 'Payments',
      dataIndex: 'payments',

      render: (text: any, record: any) => {
        return (
          <ColPayment>
            {text?.length === 0 ? (
              <h6>Unknow payment!</h6>
            ) : (
              text?.map((payment, index) => {
                if (payment) {
                  return (
                    <Tag key={index} className="paymentTag">
                      <img src={payment.paymentMethod.icon} alt="#" />{' '}
                      <span
                        style={{
                          color: `${payment.paymentMethod.colorCode}`,
                        }}
                      >
                        {payment.paymentMethod.name}
                      </span>
                    </Tag>
                  );
                } else return null;
              })
            )}
          </ColPayment>
        );
      },
      responsive: ['lg'],
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
    {
      title: (
        <ColumnsTrade>
          <div className="title">Trade</div>
          <div className="fee">0 Fee</div>
        </ColumnsTrade>
      ),
      key: 'trade',
      width: 200,
      render: (_, record, index: any) => {
        return (
          <ButtonSell
            onClick={() => {
              setOpenOrders([...openOrders, index]);
            }}
          >
            <span>Buy </span>
            <span>{record.token.assetName}</span>
          </ButtonSell>
        );
      },
      responsive: ['sm'],
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
  ];

  const hanldeCloseOrder = async value => {
    setOpenOrders(value);
  };

  const findAllOrdersBuy = () => {
    setLoading(true);
    const listFiat = TabP2PState.listFiat;
    const listToken = TabP2PState.listToken;
    const listPaymet = TabP2PState.listPayment;

    let payment = TabP2PState.searchParam.payment;
    let fiat = TabP2PState.searchParam.fiat;
    let crypto = TabP2PState.searchParam.crypto;
    let amount = TabP2PState.amount;

    let paymentId = 0;
    let fiatId = 0;
    let cryptoId = 0;

    if (listToken.length !== 0 && crypto) {
      cryptoId = listToken.find(token => token.assetName === crypto)?.id;
    }

    if (listFiat.length !== 0 && fiat) {
      fiatId = listFiat.find(x => x.name === fiat)?.id;
    }

    if (listPaymet.length !== 0 && payment !== 'All payments' && payment) {
      paymentId = listPaymet.find(x => x.name === payment)?.id;
    }

    setTimeout(() => {
      getListOrderBy({
        fiat: fiatId,
        paymentMethod: paymentId || -1,
        tokenId: cryptoId,
        orderType: 1,
        amount: amount,
      })
        .then((res: any) => {
          if (res.data.rc === 0) {
            setListP2POrdersBuy(res.data.rows);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch(res => {
          setLoading(false);
        });
    }, 100);
  };

  const findAllOrders = async () => {
    getListOrder()
      .then(res => {
        if (res.data.rc === 0) {
          setListP2POrders(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllFiat = async () => {
    getListFiat()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findFiats.getListFiat(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllToken = async () => {
    getListToken()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findTokens.getListToken(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllPayment = async () => {
    getListPayments()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findPayments.getListPayment(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  useEffect(() => {
    Promise.all([
      findAllFiat(),
      findAllToken(),
      findAllPayment(),
      findAllOrders(),
    ]).then(() => findAllOrdersBuy());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    findAllOrdersBuy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabP2PState]);

  return (
    <Wrapper>
      <Table
        rowKey={'id'}
        loading={{
          spinning: loading,
          indicator: <AiOutlineLoading3Quarters className="loadingIcon" />,
        }}
        tableLayout="auto"
        columns={columns}
        dataSource={listP2POrdersBuy}
      />
    </Wrapper>
  );
}

export default P2PTableBuy;

const Wrapper = styled.div`
  .ant-table {
    &-column-sort {
      background-color: ${({ theme }) => theme.p2pBackground};
    }

    &-cell.ant-table-column-sort.ant-table-column-has-sorters {
      background-color: ${({ theme }) => theme.titleTableBackground};

      &::before {
        background-color: ${({ theme }) => theme.brightGrayColor} !important;
        opacity: 0.3;
      }
    }
    .ant-table-tbody {
      .ant-table-cell {
        vertical-align: top;
      }
    }
    @media only screen and (max-width: 1150px) {
      .ant-table-cell {
        padding: 16px 8px;
      }
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
`;

const ColAdvertisers = styled.div`
  display: flex;
  flex-direction: column;

  .row1 {
    display: flex;
    align-items: center;

    margin-bottom: 8px;

    .firstCharacter {
      text-align: center;
      font-size: 12px;
      color: ${({ theme }) => theme.text};
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.primary};
    }

    .advertisers {
      margin: 0px 8px;
    }
  }
  .row2 {
    margin-left: 28px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    .numberOrderComplete {
      margin-left: 10px;
      padding-left: 5px;
      border-left: 1px solid #ccc;
    }
  }

  .paymentRes {
    display: none;
    flex-direction: column;
    text-align: left;
    margin-left: 28px;
    margin-top: 10px;
    color: ${({ theme }) => theme.grayColor};

    &__title {
      margin-bottom: 5px;
      display: block;
    }
  }

  .btnOpenOrder {
    margin-top: 20px;
    display: none;
    span {
      width: 100%;
      text-align: center !important;
    }
  }
  @media only screen and (max-width: 991px) {
    .paymentRes {
      display: block;
    }
  }

  @media only screen and (max-width: 425px) {
    .firstCharacter {
      display: none;
    }

    .advertisers {
      margin-left: 0 !important;
      font-weight: bold;
    }
    .row2 {
      margin-left: 0;
    }

    .paymentRes {
      margin-left: 0;
    }

    .checked {
      display: none;
    }
  }

  @media only screen and (max-width: 575px) {
    .btnOpenOrder {
      display: block;
    }
  }
`;

const ColPrice = styled.div`
  .priceSpan {
    font-size: 20px;
  }

  span {
    font-size: 12px;
  }
  .avaiRes {
    display: none;

    .available {
      margin-top: 10px;
      flex-direction: column;
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-width: 767px) {
    .avaiRes {
      display: block;
    }

    .priceSpan {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const ColLimitAvailable = styled.div`
  .rowLimitAvailable {
    display: flex;
    align-items: baseline;

    .col1 {
      min-width: 50px;
      margin-right: 8px;

      font-size: 12px;
      color: ${({ theme }) => theme.primary};
    }

    .col3 {
      margin-left: 2px;
    }
  }
  @media only screen and (max-width: 1150px) {
    .limit {
      .col1 {
        width: 100%;
      }
      flex-wrap: wrap;
    }
  }
`;

const ColPayment = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .paymentTag {
    margin-bottom: 2px;
    margin-right: 2px;
  }
  img {
    width: 25px;
    padding: 2px;
    margin-right: 3px;
  }
  .payment {
    font-size: 12px;
    padding: 0px 4px;
    border-radius: 4px;
    margin-right: 4px;
    margin-bottom: 4px;
    min-width: 70px;
    text-align: center;

    background-color: ${({ theme }) => theme.p2pBorder};
    color: #e72258;
  }
`;

const ColumnsTrade = styled.div`
  display: flex;
  justify-content: space-between;

  .fee {
    padding: 0px 10px;
    color: rgb(0, 192, 135);
    background-color: rgb(226, 253, 244);
  }
`;

const ButtonSell = styled(Button)`
  height: 30px;
  padding: 0px 30px;
  background-color: ${({ theme }) => theme.p2pBuy};
  border: none;
  width: 80%;
  display: block;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  text-align: center;
  span {
    margin-top: 3px;
    margin-right: 4px;
    width: calc(50% - 2px);
    text-align: right;

    &:last-child {
      text-align: left;
    }
  }

  &:hover,
  &:focus,
  &:active,
  &:active:focus {
    background-color: ${({ theme }) => theme.p2pBuy};
    border: none;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    opacity: 0.6;
  }

  @media only screen and (max-width: 1150px) {
    width: 100% !important;
  }
`;
