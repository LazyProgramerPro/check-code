import styled from 'styled-components';
import { Steps, Button, Radio, Tooltip, Input, Tag, Checkbox } from 'antd';
import { Col, Modal, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { Collapse } from 'antd';
import { HiPlusCircle } from 'react-icons/hi';
import { FaCopy } from 'react-icons/fa';
import openNotification from 'app/components/NotificationAntd';
import { tabOrderDetailService } from 'services/orderDetailService';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TabOrderDetailState } from '../slice/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTabOrderDetail } from '../slice/selectors';
import { useTabOrderDetailSlice } from '../slice';
import ChatBox from 'app/components/ChatBox';
import QRCode from 'react-qr-code';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Countdown from 'antd/lib/statistic/Countdown';
import { IoMdChatbubbles } from 'react-icons/io';
import { BsHeadset } from 'react-icons/bs';
import FormAppeal from './FormAppeal';
import AppealBlock from './Appeal';
const baseURLWs = process.env.REACT_APP_BASE_WEBSOCKET_URL;

const ContentOrderDetail = ({ trade, reload }) => {
  const [visibleNote, setVisibleNote] = useState(true);
  const [visibleModalCancel, setVisibleModalCancel] = useState(false);
  const [visibleModalVerification, setVisibleModalVerification] =
    useState(false);
  const [loadingBtnSubmit, setLoadingBtnSubmit] = useState(false);
  const [listAppeal, setListAppeal] = useState([]);
  const [inputAnother, setInputAnother] = useState(false);
  const [visibleBtnConfirmPayment, setVisibleBtnConfirmPayment] =
    useState(true);
  const [disableAppeal, setDisableAppeal] = useState(true);

  const [paymentSeller, setPaymentSeller] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentFirstSteps, setCurrentFirstSteps] = useState<number>(0);
  const [qrCode, setQrCode] = useState('');
  const [qr, setQR] = useState('');
  const [visibleModalConfirmPayment, setVisibleModalConfirmPayment] =
    useState(false);
  const [showModalAppeal, setShowModalAppeal] = useState(false);
  const [reCallMessage, setReCallMessage]: any = useState(false);
  const [beforeAppeal, setBeforeAppeal] = useState(true);

  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);
  const { tradeType, buyerStatus, sellerStatus, tradeStatus } =
    TabOrderDetailState;

  const {
    updateTradeById,
    getListAppealReason,
    getQRCode,
    verifyDigitCode,
    getPaymentById,
  } = tabOrderDetailService;
  const dispatch = useDispatch();
  const setBuyerStatus = useTabOrderDetailSlice().actions;

  const { Panel } = Collapse;
  const { Step } = Steps;
  const { TabPane } = Tabs;

  const date = new Date(trade?.updateTime);
  const date1 = Date.now();
  const stepBuy = [
    {
      title: 'Transfer money to the seller',
      content: 'First-content',
    },
    {
      title: 'Waiting for the seller to unlock the cryptocurrency',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ];

  const stepSell = [
    {
      title: 'Pending Payment',
      content: 'First-content',
    },
    {
      title: 'Release crypto to the buyer',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ];

  const handleChangeTabPayment = value => {
    if (Number(value) !== trade.paymentId) {
      setCurrentTab(Number(value));
    } else setCurrentTab(0);
  };

  const handelTransfer = () => {
    updateTradeById({
      id: trade?.id,
      paymentId: currentTab !== 0 ? currentTab : -1,
      status: 'PAID',
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Success', 'Notified to the seller!');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else openNotification('Error', res.data.rd);
      })
      .catch(() => openNotification('Error', 'Some thing went wrong!'));
  };

  const handelConfirmTransfer = () => {
    setVisibleModalConfirmPayment(true);
  };

  const handelConfirmPayment = () => {
    setVisibleModalVerification(true);
  };

  const handleCopy = value => {
    navigator.clipboard.writeText(value);
  };

  const handelChaneReason = e => {
    if (e.target.value === 0) {
      setInputAnother(true);
    } else setInputAnother(false);
  };

  const handleCancelOrder = () => {
    updateTradeById({
      id: trade.id,
      status: 'CANCEL',
      paymentId: -1,
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Success', 'Canceled this order!');
          setVisibleModalCancel(false);
          localStorage.setItem('timeLimit', JSON.stringify(null));
          dispatch(setBuyerStatus.setSellerStatus('CANCEL'));
        } else {
          openNotification('Error', res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllAppealReason = () => {
    getListAppealReason().then(res => {
      if (res.data.rc === 0) {
        setListAppeal(res.data.rows);
      } else openNotification('Error', res.data.rd);
    });
  };

  const handleCheckedConfirmPayment = value => {
    if (value) {
      setVisibleBtnConfirmPayment(false);
    } else setVisibleBtnConfirmPayment(true);
  };

  const handleChangQRCode = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setQrCode(e.target.value);

      if (e.target.value.length === 6) {
        handleSecurityCode({
          code: e.target.value,
        });
      }
    }
  };

  const getCodeQRSecurity = () => {
    getQRCode().then(res => {
      if (res.status === 200) {
        setQR(res.data);
      }
    });
  };

  const handleSecurityCode = qrCode => {
    setLoadingBtnSubmit(true);
    if (trade?.tradeId) {
      verifyDigitCode({
        ...qrCode,
        tradeId: trade?.tradeId,
      }).then(res => {
        if (res.status === 200 && res.data) {
          updateTradeById({
            id: trade?.id,
            paymentId: -1,
            status: 'CONFIRMED',
          })
            .then(res => {
              if (res.data.rc === 0) {
                openNotification('Success', 'Completed order!');
                dispatch(setBuyerStatus.setTradeStatus('DONE'));
                setVisibleModalVerification(false);
                setVisibleModalConfirmPayment(false);
              } else openNotification('Error', res.data.rd);
            })
            .catch(() => openNotification('Error', 'Some thing went wrong!'));
        } else {
          openNotification('Error', 'Digital Code invalid!');
        }

        setLoadingBtnSubmit(false);
      });
    }
  };

  const findPaymentById = () => {
    if (trade?.paymentId) {
      getPaymentById(trade?.paymentId)
        .then(res => {
          if (res.data.rc === 0) {
            setPaymentSeller([res.data.item]);
          } else console.log(res.data.rd);
        })
        .catch(res => console.log(res));
    }
  };

  const finishCdAppeal = () => {
    setDisableAppeal(false);
  };

  useEffect(() => {
    var socket = new ReconnectingWebSocket(`${baseURLWs}/ws`, [], {
      connectionTimeout: 5000,
    });

    if (trade?.tradeId) {
      socket.onopen = () => {
        console.log(`Websocket connected`);

        socket.send(
          JSON.stringify({
            type: 'SUBSCRIBE',
            tradeId: trade?.tradeId,
          }),
        );

        setInterval(
          () => socket.send(JSON.stringify('Keep socket connection')),
          5000,
        );
      };

      socket.onmessage = message => {
        const res = JSON.parse(message.data);
        if (res?.key) {
          reload();
          setReCallMessage(!reCallMessage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      socket.onclose = () => {
        console.log('WebSocket Closed!');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visibleModalVerification) {
      getCodeQRSecurity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleModalVerification]);

  useEffect(() => {
    findAllAppealReason();
    findPaymentById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line prettier/prettier
  useEffect(() => {
    switch (TabOrderDetailState?.tradeStatus) {
      case 'PROCESSING':
        if (TabOrderDetailState?.tradeType === 'Buy') {
          switch (TabOrderDetailState?.buyerStatus) {
            case 'NOT_PAID':
              setCurrentFirstSteps(0);
              break;
            case 'PAID':
              setCurrentFirstSteps(1);
              break;
            default:
              setCurrentFirstSteps(-1);
              break;
          }
        } else {
          switch (TabOrderDetailState?.sellerStatus) {
            case 'HOLD':
              if (TabOrderDetailState?.buyerStatus === 'NOT_PAID') {
                setCurrentFirstSteps(0);
              }
              if (TabOrderDetailState?.buyerStatus === 'PAID') {
                setCurrentFirstSteps(1);
              }
              break;
            case 'COMFIRM':
              setCurrentFirstSteps(2);
              break;
            default:
              setCurrentFirstSteps(-1);
              break;
          }
        }
        break;
      case 'DONE':
        break;
      case 'CANCEL':
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState]);
  return (
    <Wrapper>
      <Row className="mainContent">
        {trade?.status === 'PROCESSING' && (
          <Col className="orderStep" lg={8}>
            <div className="firstStep">
              <Steps
                className="st1Step"
                size="small"
                current={currentFirstSteps}
              >
                {tradeType === 'Buy' &&
                  stepBuy.map((step, index) => (
                    <Step key={index} description={step.title} />
                  ))}
                {tradeType === 'Sell' &&
                  stepSell.map((step, index) => (
                    <Step key={index} description={step.title} />
                  ))}
              </Steps>
              {visibleNote && tradeType === 'Buy' && (
                <div className="note">
                  <span>
                    <span>
                      You need to leave the Byte Buffer website to make a
                      payment. In the meantime, Byte Buffer will keep the crypto
                      in custody.
                    </span>
                    <br />
                    <span>
                      Upon successful payment tothe seller, go back to the Byte
                      Buffer website and click the "Transferred, notify seller"
                      button.
                    </span>
                  </span>
                  <span
                    className="closeNote"
                    onClick={() => {
                      setVisibleNote(false);
                    }}
                  >
                    X
                  </span>
                </div>
              )}
            </div>
            <div className="secondStep">
              <Steps progressDot current={2} direction="vertical">
                <Step
                  title="Confirm order information"
                  description={
                    <div className="descriptionStep1">
                      <div className="amount">
                        <p>Amount</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.total}
                        </h5>
                      </div>
                      <div className="price">
                        <p>Price</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.order?.price}
                        </h5>
                      </div>
                      <div className="count">
                        <p>Quantity</p>
                        <h5>
                          {trade?.amount?.toFixed(5)}{' '}
                          {trade?.order?.token?.assetName}
                        </h5>
                      </div>
                    </div>
                  }
                />
                <Step
                  title="Transfer funds to the account provided below"
                  description={
                    <div>
                      <Tabs
                        type="card"
                        tabPosition="left"
                        className="paymentTab"
                        defaultActiveKey={trade?.paymentId}
                        onChange={handleChangeTabPayment}
                      >
                        {trade?.order?.orderType === 1
                          ? trade?.order?.payments?.map(payment => {
                              return (
                                <TabPane
                                  key={payment?.id}
                                  tab={
                                    <div>
                                      <span
                                        className="tabIcon"
                                        style={{
                                          color:
                                            payment?.paymentMethod?.colorCode,
                                        }}
                                      >
                                        |{' '}
                                      </span>{' '}
                                      {payment?.paymentMethod?.name}
                                    </div>
                                  }
                                >
                                  <p className="paymentTitle">Name</p>
                                  <span className="paymentDesc">
                                    <span>{payment?.fullName}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.fullName)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">
                                    Bank account number
                                  </p>
                                  <span className="paymentDesc">
                                    <span>{payment?.accountNumber}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.accountNumber)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">Bank name</p>
                                  <span className="paymentDesc">
                                    <span>{payment?.bankName}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.bankName)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">
                                    Account opening branch
                                  </p>
                                  <span className="paymentDesc">
                                    <span>{payment?.bankBranch}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.bankBranch)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                </TabPane>
                              );
                            })
                          : paymentSeller
                              .filter(x => {
                                return x.id === trade?.paymentId;
                              })
                              .map(payment => {
                                return (
                                  <TabPane
                                    key={payment?.id}
                                    tab={
                                      <div>
                                        <span
                                          className="tabIcon"
                                          style={{
                                            color:
                                              payment?.paymentMethod?.colorCode,
                                          }}
                                        >
                                          |{' '}
                                        </span>{' '}
                                        {payment?.paymentMethod?.name}
                                      </div>
                                    }
                                  >
                                    <p className="paymentTitle">Name</p>
                                    <span className="paymentDesc">
                                      <span>{payment?.fullName}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.fullName)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">
                                      Bank account number
                                    </p>
                                    <span className="paymentDesc">
                                      <span>{payment?.accountNumber}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.accountNumber)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">Bank name</p>
                                    <span className="paymentDesc">
                                      <span>{payment?.bankName}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.bankName)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">
                                      Account opening branch
                                    </p>
                                    <span className="paymentDesc">
                                      <span>{payment?.bankBranch}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.bankBranch)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                  </TabPane>
                                );
                              })}
                      </Tabs>
                    </div>
                  }
                />
                {tradeType === 'Buy' && (
                  <Step title='After transferring the money, click the button "Transferred, notify the seller"' />
                )}
                {TabOrderDetailState.buyerStatus === 'PAID' &&
                  tradeType === 'Sell' && (
                    <Step title='After transferring the payment, be sure to click the "Payment received" button.' />
                  )}
              </Steps>
            </div>
            {tradeType === 'Buy' && (
              <div className="btnGroup">
                {buyerStatus === 'PAID' ? (
                  <Button
                    type="primary"
                    disabled={
                      disableAppeal && date1 - date.getTime() < 15 * 60000
                    }
                    onClick={() => setShowModalAppeal(true)}
                    className="btnAppeal"
                  >
                    {disableAppeal && date1 - date.getTime() < 15 * 60000 && (
                      <Countdown
                        value={
                          Date.now() + 15 * 60000 - (date1 - date.getTime())
                        }
                        onFinish={finishCdAppeal}
                      ></Countdown>
                    )}
                    Appeal
                  </Button>
                ) : (
                  <Button
                    className="btnTransferred"
                    type="primary"
                    onClick={() => handelTransfer()}
                  >
                    Transferred, notify the seller
                  </Button>
                )}
                <Button
                  className="btnCancelOrder"
                  onClick={() => setVisibleModalCancel(true)}
                >
                  Cancel order
                </Button>
              </div>
            )}
            {tradeType === 'Sell' && buyerStatus === 'PAID' && (
              <div className="btnGroupConfirm">
                <Button
                  className="btnTransferred"
                  type="primary"
                  onClick={() => handelConfirmTransfer()}
                >
                  Payment received
                </Button>
                <Button
                  className="btnTransaction"
                  disabled={
                    disableAppeal && date1 - date.getTime() < 15 * 60000
                  }
                  onClick={() => setShowModalAppeal(true)}
                >
                  {disableAppeal && date1 - date.getTime() < 15 * 60000 && (
                    <Countdown
                      value={Date.now() + 15 * 60000 - (date1 - date.getTime())}
                      onFinish={finishCdAppeal}
                    ></Countdown>
                  )}
                  Transaction issue, appeal after
                </Button>
              </div>
            )}
          </Col>
        )}
        {trade?.status === 'CANCEL' && (
          <Col className=" cancelOrderContent" lg={8}>
            <h6 className="orderInfoTitle">Order info</h6>
            <div className="descriptionStep1">
              <div className="amount">
                <p>Amount</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.total}
                </h5>
              </div>
              <div className="price">
                <p>Price</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.order?.price}
                </h5>
              </div>
              <div className="count">
                <p>Quantity</p>
                <h5>
                  {trade?.amount?.toFixed(5)} {trade?.order?.token?.assetName}
                </h5>
              </div>
            </div>
            <h6 className="paymentMethodTitle">Payment method</h6>
            <p className="paymentMethodDetail">
              Payment method can't be displayed for this order
            </p>
            <h6 className="haq">Have A Question</h6>
          </Col>
        )}

        {trade?.status === 'DONE' && (
          <Col className=" cancelOrderContent" lg={8}>
            <h6 className="orderInfoTitle">Order info</h6>
            <div className="descriptionStep1">
              <div className="amount">
                <p>Amount</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.total}
                </h5>
              </div>
              <div className="price">
                <p>Price</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.order?.price}
                </h5>
              </div>
              <div className="count">
                <p>Quantity</p>
                <h5>
                  {trade?.amount?.toFixed(5)} {trade?.order?.token?.assetName}
                </h5>
              </div>
            </div>
            <h6 className="paymentMethodTitle">Payment method</h6>
            <p className="paymentMethodDetail">
              {trade?.order?.payments
                ?.filter(payment => payment.id === trade.paymentId)
                .map(payment => {
                  return (
                    <Tag
                      color={payment.paymentMethod.colorCode}
                      className="paymentTag"
                    >
                      {payment?.paymentMethod?.name}
                    </Tag>
                  );
                })}
            </p>
            <h6 className="haq">Have A Question</h6>
          </Col>
        )}

        {tradeStatus === 'APPEAL' && (
          <Col className=" orderStep" lg={8}>
            <div className="secondStep">
              <Steps progressDot current={2} direction="vertical">
                <Step
                  title="Confirm order information"
                  description={
                    <div className="descriptionStep1">
                      <div className="amount">
                        <p>Amount</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.total}
                        </h5>
                      </div>
                      <div className="price">
                        <p>Price</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.order?.price}
                        </h5>
                      </div>
                      <div className="count">
                        <p>Quantity</p>
                        <h5>
                          {trade?.amount?.toFixed(5)}{' '}
                          {trade?.order?.token?.assetName}
                        </h5>
                      </div>
                    </div>
                  }
                />
                <Step
                  title="Transfer funds to the account provided below"
                  description={
                    <div>
                      <Tabs
                        type="card"
                        tabPosition="left"
                        className="paymentTab"
                        defaultActiveKey={trade?.paymentId}
                        onChange={handleChangeTabPayment}
                      >
                        {trade?.order?.orderType === 1
                          ? trade?.order?.payments?.map(payment => {
                              return (
                                <TabPane
                                  key={payment?.id}
                                  tab={
                                    <div>
                                      <span
                                        className="tabIcon"
                                        style={{
                                          color:
                                            payment?.paymentMethod?.colorCode,
                                        }}
                                      >
                                        |{' '}
                                      </span>{' '}
                                      {payment?.paymentMethod?.name}
                                    </div>
                                  }
                                >
                                  <p className="paymentTitle">Name</p>
                                  <span className="paymentDesc">
                                    <span>{payment?.fullName}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.fullName)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">
                                    Bank account number
                                  </p>
                                  <span className="paymentDesc">
                                    <span>{payment?.accountNumber}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.accountNumber)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">Bank name</p>
                                  <span className="paymentDesc">
                                    <span>{payment?.bankName}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.bankName)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                  <p className="paymentTitle">
                                    Account opening branch
                                  </p>
                                  <span className="paymentDesc">
                                    <span>{payment?.bankBranch}</span>
                                    <Tooltip
                                      title="Copied"
                                      trigger="click"
                                      placement="right"
                                    >
                                      <FaCopy
                                        className="copyIcon"
                                        onClick={() =>
                                          handleCopy(payment?.bankBranch)
                                        }
                                      />
                                    </Tooltip>
                                  </span>
                                </TabPane>
                              );
                            })
                          : paymentSeller
                              .filter(x => {
                                return x.id === trade?.paymentId;
                              })
                              .map(payment => {
                                return (
                                  <TabPane
                                    key={payment?.id}
                                    tab={
                                      <div>
                                        <span
                                          className="tabIcon"
                                          style={{
                                            color:
                                              payment?.paymentMethod?.colorCode,
                                          }}
                                        >
                                          |{' '}
                                        </span>{' '}
                                        {payment?.paymentMethod?.name}
                                      </div>
                                    }
                                  >
                                    <p className="paymentTitle">Name</p>
                                    <span className="paymentDesc">
                                      <span>{payment?.fullName}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.fullName)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">
                                      Bank account number
                                    </p>
                                    <span className="paymentDesc">
                                      <span>{payment?.accountNumber}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.accountNumber)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">Bank name</p>
                                    <span className="paymentDesc">
                                      <span>{payment?.bankName}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.bankName)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                    <p className="paymentTitle">
                                      Account opening branch
                                    </p>
                                    <span className="paymentDesc">
                                      <span>{payment?.bankBranch}</span>
                                      <Tooltip
                                        title="Copied"
                                        trigger="click"
                                        placement="right"
                                      >
                                        <FaCopy
                                          className="copyIcon"
                                          onClick={() =>
                                            handleCopy(payment?.bankBranch)
                                          }
                                        />
                                      </Tooltip>
                                    </span>
                                  </TabPane>
                                );
                              })}
                      </Tabs>
                    </div>
                  }
                />
              </Steps>
            </div>
            <AppealBlock trade={trade} cancelOrder={handleCancelOrder} />
          </Col>
        )}
        <Col className="chat" lg={4}>
          <ChatBox email={trade?.partner?.email} data={trade} />
        </Col>
      </Row>
      <div className="faq">
        <h5 className="faq-title">FAQ</h5>
        <Collapse
          defaultActiveKey={['1']}
          expandIcon={() => <HiPlusCircle className="plusIcon" />}
        >
          <Panel header="How do I make a payment?" key="1">
            <p>
              To ensure transactions are secure, some sellers may need you to
              provide additional information to prove your identity, source of
              funds, etc. are credible. Please chat or call the seller to obtain
              the payment method directly.
            </p>
          </Panel>
          <Panel header="Is it safe to make payment to the seller？" key="2">
            <p>
              The advertiser has frozen the digital assets before publishing the
              advertisement. During the transaction, the platform will hold
              custody of the digital assets. You do not need to worry about not
              receiving the purchased crypto
            </p>
          </Panel>
          <Panel
            header="What should I look out for during the payment transfer?"
            key="3"
          >
            <p>
              Please ensure that the payee's payment details are consistent with
              the verified information on the platform. If not, the seller has
              the right not to release the currency. If you have paid the
              seller, please do not cancel the transaction. You may return to
              Binance after payment and click on "Transferred, notify seller".
            </p>
          </Panel>
          <Panel header="What do I do if the payment failed?" key="4">
            <p>
              Please contact the seller to confirm whether the seller supports
              other payment methods.
            </p>
          </Panel>
          <Panel header="What if I do not want to trade anymore?" key="5">
            <p>
              You can select "Cancel order" to cancel the order. If you have
              already make the payment to the seller, please do not cancel the
              transaction.
            </p>
          </Panel>
          <Panel header="Does the seller charge a transaction fee?" key="6">
            <p>
              We recommend that you read the seller's trading terms before
              placing an order. Please chat with the seller. If you choose not
              to pay the fee, you can cancel the order and search for another
              seller.
            </p>
          </Panel>
        </Collapse>
      </div>
      <ModalCancel
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisibleModalCancel(false)}
        show={visibleModalCancel}
      >
        <Modal.Body>
          <div className="tips">
            <h6>
              <RiErrorWarningFill className="warningIcon" /> Tips
            </h6>
            <p>1. If you already paid the seller, don't cancel the order</p>
            <p>
              2. If you cancel your order 3 times in a day, you will lose the
              right to trade for the whole day.
            </p>
          </div>
          <div className="reasonCancel">
            <h6>Why do you want to cancel this order?</h6>
            <Radio.Group onChange={handelChaneReason}>
              {listAppeal.map((appeal: any, index) => {
                if (appeal.reasonType === 'FOR_BUY') {
                  return (
                    <Radio value={appeal.id} key={index}>
                      {appeal.appealReason}
                    </Radio>
                  );
                } else return null;
              })}
              <Radio value={0} key={0}>
                Khác
              </Radio>
            </Radio.Group>
            {inputAnother && <Input />}
          </div>
          <div className="btnModal">
            <Button onClick={() => setVisibleModalCancel(false)}>Cancel</Button>
            <Button type="primary" onClick={() => handleCancelOrder()}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalCancel>
      <ModalConfirmPayment
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisibleModalConfirmPayment(false)}
        show={visibleModalConfirmPayment}
      >
        <Modal.Body>
          <RiErrorWarningFill className="warningIcon" />
          <h5>Confirm release</h5>
          <p>
            ATTENTION! Please be sure to LOG IN THE RECEVING(e.g.Banks/ eWallet)
            ACCOUNT to confirm that the money has arrived in the "Available
            Balance"
          </p>
          <Checkbox
            onChange={e => handleCheckedConfirmPayment(e.target.checked)}
          >
            I confirm that the payment is successful received with correct
            amount and sender information
          </Checkbox>
          <div className="btnModal">
            <Button onClick={() => setVisibleModalConfirmPayment(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              disabled={visibleBtnConfirmPayment}
              onClick={() => handelConfirmPayment()}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalConfirmPayment>
      <ModalVerification
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisibleModalVerification(false)}
        show={visibleModalVerification}
      >
        <Modal.Header closeButton>
          <h5>Security verification</h5>
        </Modal.Header>
        <Modal.Body>
          <p>
            To secure your account, please complete the following verification.
          </p>
          <p>
            You can also use{' '}
            <b>
              <u>ByteBuffer/Google Authenticator</u>
            </b>
          </p>
          <p className="labelQRcode">Your QR code here</p>
          <QRCode value={qr} height="300" width="300" className="qrCode" />
          <Input value={qrCode} maxLength={6} onChange={handleChangQRCode} />
          <span>Enter the 6 digit code</span>
          <p className="linkSecurityUnavailable">
            Security verification unavailable ?
          </p>
          <Button
            htmlType="submit"
            type="primary"
            className="btnSubmit"
            onClick={() =>
              handleSecurityCode({
                code: qrCode,
              })
            }
            disabled={loadingBtnSubmit}
          >
            {loadingBtnSubmit ? <div className="loader"></div> : 'Submit'}
          </Button>
        </Modal.Body>
      </ModalVerification>
      <ModalAppeal
        centered
        onHide={() => setShowModalAppeal(false)}
        show={showModalAppeal}
      >
        <ModalAppeal.Header closeButton>
          {beforeAppeal ? <span>Tips</span> : <span>Appeal</span>}
        </ModalAppeal.Header>
        <ModalAppeal.Body>
          {beforeAppeal ? (
            <div className="beforeAppeal">
              <h6>Before appeal</h6>
              <div className="firstContent">
                <IoMdChatbubbles className="appealIcon" />
                <span>
                  You can upload proof of payment and account info in the
                  chatbox to help both sides to verifi the payment
                </span>
              </div>
              <div className="secondContent">
                <div className="content">
                  <BsHeadset className="appealIcon" />
                  <span>
                    If you can reach the buyer/seller, or reach an agreement
                    with the other user, please file an appeal
                  </span>
                </div>
                <div className="btnAppealModal">
                  <Button type="link" onClick={() => setBeforeAppeal(false)}>
                    Appeal
                  </Button>
                  <Button
                    type="link"
                    onClick={() => setShowModalAppeal(false)}
                    className="btnCancelAppeal"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="appeal">
              <div className="appealRcm">
                <p>
                  1. Reason for appeal and proofs are visible to both parties
                  and CS. Please avoid including any private or sensitive info
                </p>
                <p>
                  2. Baseless appeal request can result in banning of the
                  account
                </p>
              </div>

              <div className="contentAppeal">
                <FormAppeal
                  cancel={() => setShowModalAppeal(false)}
                  type={TabOrderDetailState.tradeType}
                  tradeId={trade?.tradeId}
                />
              </div>
            </div>
          )}
        </ModalAppeal.Body>
      </ModalAppeal>
    </Wrapper>
  );
};

export default ContentOrderDetail;

const Wrapper = styled.div`
  .mainContent {
    position: relative;
  }
  .orderStep {
    padding-top: 30px;

    .firstStep {
      padding-bottom: 20px;
      border-bottom: 2px solid ${({ theme }) => theme.p2pGrayLight};
      margin-bottom: 20px;
      .ant-steps-item-container {
        display: flex;
        flex-direction: column;
      }
      .ant-steps-item-description {
        margin-top: 10px;
      }

      .ant-steps-item-title {
        &::after {
          top: 0;
          transform: translate(20px, -10px);
        }
      }
      .st1Step {
        width: 80%;
      }
      .anticon {
        transform: translateY(-3px);
      }
      .note {
        margin-top: 20px;
        background-color: ${({ theme }) => theme.p2pGrayLight};
        color: ${({ theme }) => theme.graySmokeColor};
        padding: 12px;
        padding-right: 35px;
        text-align: justify;
        border-radius: 5px;
        position: relative;
        padding-left: 25px;

        span {
          line-height: 2;
        }

        .closeNote {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
          color: ${({ theme }) => theme.grayColor};
          cursor: pointer;
          margin-right: 10px;
          margin-top: 3px;
        }
      }
    }

    .secondStep {
      .ant-steps-item-content {
        max-width: 90% !important;
        width: inherit !important;
      }
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.p2pBackground};
        border: 1px solid ${({ theme }) => theme.primary};
      }

      .ant-steps-item-tail {
        &::after {
          background-color: ${({ theme }) => theme.primary};
        }
      }

      .paymentTab {
        border-radius: 3px;
        transition: all 0.25s linear;
        border: 1px solid ${({ theme }) => theme.brightGrayColor};
        .ant-tabs-nav {
          max-width: 40%;

          .ant-tabs-tab-btn {
            div {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .paymentTitle {
          color: ${({ theme }) => theme.darkGrayColor};
          margin-bottom: 5px;
          font-size: 16px;
        }
        .paymentDesc {
          display: inline-block;
          margin-bottom: 15px;
          display: flex;
          align-items: center;

          .copyIcon {
            margin-left: 20px;
            cursor: pointer;
            color: ${({ theme }) => theme.primary};
          }
        }
        .tabIcon {
          font-weight: bold;
          font-size: 18px;
        }
        .ant-tabs-tab {
          border-right: 1px solid transparent !important;
          transition: all 0.25s linear;
          margin: 0;
          border: none;
        }

        .ant-tabs-tab-active {
          transition: all 0.25s linear;
          border-right: 1px solid ${({ theme }) => theme.primary} !important;
        }

        .ant-tabs-content-left {
          padding-top: 15px;
          padding-right: 15px;
          border-left: 1px solid ${({ theme }) => theme.p2pBorder};
          text-align: justify;
          height: 300px;
          overflow: scroll;
          &::-webkit-scrollbar {
            height: 100%;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 0px;
            background-color: ${({ theme }) => theme.primary};
          }
        }
      }
    }

    .btnCancelOrder {
      margin-left: 20px;
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
    }

    .btnGroupConfirm {
      display: flex;
    }

    .btnTransferred {
      font-weight: bold;
      margin-right: 20px;
    }

    .btnTransaction {
      display: flex;
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      .ant-statistic {
        height: 100%;

        &-content {
          height: 100%;
        }
        &-content-value {
          height: 100%;
          font-size: 16px;
          font-weight: bold;
          color: ${({ theme }) => theme.primary};
          transform: translateY(-12px);
          margin-right: 10px;
        }
      }
    }
  }
  .chat {
    margin-top: 30px;
  }

  .faq {
    margin-top: 60px;
    width: 70%;

    &-title {
      margin-bottom: 20px;
    }

    .plusIcon {
      color: ${({ theme }) => theme.primary};
      font-size: 16px;
    }

    .ant-collapse {
      border: none;
    }

    .ant-collapse-item {
      border: none;
    }

    .ant-collapse-content {
      border: none;
    }
  }

  .descriptionStep1 {
    display: flex;
    div {
      margin-right: 70px;

      h5 {
        margin-top: 0px;
      }
      &:first-child h5 {
        color: ${({ theme }) => theme.greenColor};
      }
    }
  }

  .cancelOrderContent {
    padding-top: 45px;
    border-bottom: 2px solid ${({ theme }) => theme.p2pGrayLight};
    padding-bottom: 40px;

    .orderInfoTitle {
      margin-bottom: 20px;
    }

    .paymentMethodTitle {
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .paymentMethodDetail {
      padding: 20px 20px;
      background-color: ${({ theme }) => theme.p2pGrayLight};
      color: ${({ theme }) => theme.graySmokeColor};
      width: 100%;
      border-radius: 5px;

      .paymentTag {
        padding: 5px 10px;
        opacity: 0.9;
      }
    }

    .haq {
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      cursor: pointer;
      margin-top: 50px;
    }
  }

  .btnGroup {
    display: flex;
  }
  .btnAppeal {
    display: flex;

    .ant-statistic {
      height: 100%;

      &-content {
        height: 100%;
      }
      &-content-value {
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        color: ${({ theme }) => theme.primary};
        transform: translateY(-12px);
        margin-right: 10px;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .orderStep,
    .cancelOrderContent {
      /* width: 100%; */
    }
  }

  @media only screen and (max-width: 991px) {
    .faq {
      width: 100%;
    }

    .firstStep {
      .ant-steps {
        width: 100% !important;
      }
    }
  }

  @media only screen and (max-width: 575px) {
    .firstStep {
      .ant-steps-item-content {
        transform: translate(30px, -70%);
      }
    }

    .btnGroupConfirm {
      flex-direction: column;

      button {
        margin: 10px 0 !important;
        width: 100%;

        display: flex;
        justify-content: center;
      }
    }
    .descriptionStep1 {
      & > div {
        margin-right: 10px;
      }
    }

    .ant-steps-item-content {
      width: 80% !important;
    }

    .ant-tabs-nav {
      .ant-tabs-tab-btn {
        div {
          width: 80px;
        }
      }
    }

    .ant-tabs-tabpane {
      padding-left: 8px !important;
    }

    .paymentTitle {
      text-align: left;
    }

    .btnGroup {
      flex-direction: column;
      button {
        margin: 10px 0 !important;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const ModalCancel = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .tips {
    background-color: ${({ theme }) => theme.primaryBlur};
    padding: 15px;
    padding-left: 30px;
    border-radius: 5px;
    h6 {
      margin-left: -20px;
    }

    .warningIcon {
      color: ${({ theme }) => theme.primary};
      font-size: 18px;
    }

    .tips p {
      margin: 0;
    }
  }

  .reasonCancel {
    margin-top: 30px;

    .ant-radio-group {
      display: flex;
      flex-direction: column;
    }

    .ant-radio-wrapper {
      padding: 5px 0;
    }

    .ant-input {
      margin-top: 10px;
      &:focus {
        box-shadow: none;
      }
    }
  }

  .btnModal {
    display: block;
    margin: 0 auto;
    width: 40%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;

const ModalConfirmPayment = styled(Modal)`
  .modal-content {
    width: 90%;
    margin: 0 auto;
  }
  text-align: center;
  .modal-body {
    padding: 20px 20px;
  }

  .warningIcon {
    display: block;
    margin: 0 auto;
    color: ${({ theme }) => theme.primary};
    font-size: 100px;
    padding: 0;
    border-radius: 50%;
    z-index: 1;
    padding: 3px;
    border: 1px solid ${({ theme }) => theme.primary};
    margin-bottom: 30px;
  }

  p {
    color: ${({ theme }) => theme.grayColor};
  }

  .ant-checkbox-wrapper {
    margin-left: 22px;
    text-align: left;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .ant-btn {
    margin: 0 10px;
  }
`;

const ModalVerification = styled(Modal)`
  margin: 0 auto;
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    border: none;
    h5 {
      margin: 0;
    }
    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding-top: 5px;
    p {
      margin: 2px 0;
    }

    .labelQRcode {
      margin-top: 20px;
      font-weight: bold;
    }

    .qrCode {
      display: block;
      margin: 0 auto;
      border: 1px solid ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 5px;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .ant-input {
      width: 100%;
      height: 50px;
      font-size: 30px;

      &:focus {
        box-shadow: none;
      }
    }

    .ant-row {
      margin-bottom: 0;
    }

    .linkSecurityUnavailable {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
      margin-top: 20px;
    }

    .btnSubmit {
      width: 100%;
      margin-top: 20px;
      height: 40px;
      font-weight: bold;
    }
  }

  //loading
  .loader,
  .loader:before,
  .loader:after {
    background: ${({ theme }) => theme.p2pBackground};
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 6px;
    height: 3px;
  }
  .loader {
    color: ${({ theme }) => theme.p2pBackground};
    text-indent: -9999em;
    margin: 0 auto;
    position: relative;
    font-size: 9px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    margin-top: 8px;
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
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
`;

const ModalAppeal = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    span {
      font-size: 20px;
    }

    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding: 0;
    .appealIcon {
      font-size: 50px;
      color: ${({ theme }) => theme.primary};
    }

    .beforeAppeal {
      padding: 16px;
      .firstContent {
        display: flex;
        align-items: center;
        padding: 12px 10px;
        border: 1px solid ${({ theme }) => theme.brightGrayColor};
        border-radius: 5px;

        .appealIcon {
          flex: 1;
          margin-right: 10px;
        }

        span {
          flex: 7;
        }
      }

      .secondContent {
        padding: 12px 10px;
        border: 1px solid ${({ theme }) => theme.brightGrayColor};
        border-radius: 5px;
        margin-top: 20px;
        .content {
          display: flex;
          align-items: center;

          .appealIcon {
            flex: 1;
            margin-right: 10px;
          }

          span {
            flex: 7;
          }
        }

        .btnAppealModal {
          width: 100%;
          text-align: right;

          .btnCancelAppeal {
            color: inherit;
          }
        }
      }
    }

    .appeal {
      .appealRcm {
        padding: 16px 20px 0.1px 20px;
        background-color: ${({ theme }) => theme.primaryBlur};
        color: ${({ theme }) => theme.grayColor};
        p {
          margin-bottom: 16px;
        }
      }

      .contentAppeal {
        padding: 16px 20px;
      }
    }
  }
`;
