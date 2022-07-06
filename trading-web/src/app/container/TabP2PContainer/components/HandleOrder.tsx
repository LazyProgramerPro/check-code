import { Descriptions, InputNumber, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { tabOrderDetailService } from 'services/orderDetailService';
import { useNavigate } from 'react-router-dom';
import openNotification from 'app/components/NotificationAntd';
import { darkTheme } from 'theme/theme';
import { tabP2PService } from 'services/tabP2PServices';
import { GrFormClose } from 'react-icons/gr';
import { RiErrorWarningFill } from 'react-icons/ri';
import { BiPlus } from 'react-icons/bi';

const HandleOrder = (props: any) => {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);

  const navigate = useNavigate();
  const { getUserPayments, getUserWallet } = tabP2PService;

  //BUY
  const [validateStateBuy, setValidateStateBuy] = useState(false);
  const [pricePayBuy, setPricePayBuy] = useState<number>();
  const [receiveBuy, setReceiveBuy] = useState<number>();

  //SELL
  const [validateStateSell, setValidateStateSell] = useState(false);
  const [cryptoSell, setCryptoSell] = useState<number>();
  const [receivePriceSell, setReceivePriceSell] = useState<number>();
  const [sellerPayments, setSellerPayments] = useState([]);
  const [walletUser, setWalletUser] = useState(0);
  const [showModalWarning, setShowModalWarning] = useState(false);
  const [paymentSeller, setPaymentSeller] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { createTrade } = tabOrderDetailService;
  const { record, index, hanldeCloseOrder, timeLimit, available, type } = props;
  const options = sellerPayments.map((payment: any) => {
    return {
      key: payment?.id,
      value: payment,
      label: (
        <div className="selectPaymentContent">
          <Tag
            className="paymentMethodTag"
            color={payment?.paymentMethod.colorCode}
          >
            {payment?.paymentMethod.name}
          </Tag>
          <span>{payment?.fullName}</span>
        </div>
      ),
    };
  });

  const maxPrice = available * record.price;

  let fiatName = TabP2PState.searchParam.fiat;
  let crypto = TabP2PState.searchParam.crypto;

  const handleChangeReceiveBuy = value => {
    if (value >= 0) {
      setReceiveBuy(Number(value));
      setPricePayBuy(Number(Math.floor(value * record?.price * 100) / 100));
    }

    if (value < record?.orderLowerBound / record?.price || value > available) {
      setValidateStateBuy(true);
    } else {
      setValidateStateBuy(false);
    }
  };

  const handleChangePayBuy = value => {
    if (value >= 0) {
      setPricePayBuy(Number(value));
      setReceiveBuy(Number(Math.floor((value / record?.price) * 100) / 100));
    }

    if (value < record?.orderLowerBound || value > record?.price * available) {
      setValidateStateBuy(true);
    } else {
      setValidateStateBuy(false);
    }
  };

  const handleBuy = () => {
    if (receiveBuy && pricePayBuy) {
      setLoading(true);
      let newValue = {
        amount: Number(receiveBuy),
        orderId: record.id,
        paymentId: record.payments[0]?.id,
        price: record.price,
        total: Number(pricePayBuy),
      };
      console.log(newValue);
      createTrade(newValue)
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Created your order');
            setTimeout(() => {
              setLoading(false);
              localStorage.setItem('timeLimit', JSON.stringify(null));
              navigate(`/order/orderDetail/${res.data?.item?.id}`);
            }, 2000);
          } else {
            setLoading(false);
            openNotification('Error', res.data.rd);
          }
        })
        .catch(res => {
          setLoading(false);
          console.log('Error', res);
        });
    } else setValidateStateBuy(true);
  };

  const handelChooseAll = () => {
    setPricePayBuy(record?.orderUpperBound);
    setReceiveBuy(record?.orderUpperBound / record?.price);
    setValidateStateBuy(false);
  };

  //SELL
  const handleSell = () => {
    if (
      cryptoSell &&
      receivePriceSell &&
      paymentSeller.value?.id &&
      walletUser >= record.orderLowerBound / record.price &&
      record?.payments
        ?.map(payment => payment?.paymentMethod?.id)
        .includes(paymentSeller?.value?.paymentMethod?.id)
    ) {
      setLoading(true);
      let newValue = {
        amount: Number(cryptoSell),
        fiatId: record.fiatId,
        orderId: record.id,
        paymentId: paymentSeller.value?.id,
        price: record.price,
        tokenId: record.tokenId,
        total: Number(receivePriceSell),
      };
      console.log(222, newValue);
      createTrade(newValue)
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Created your order');

            setTimeout(() => {
              setLoading(false);
              localStorage.setItem('timeLimit', JSON.stringify(null));
              navigate(`/order/orderDetail/${res.data?.item?.id}`);
            }, 2000);
          } else {
            setLoading(false);
            openNotification('Error', res.data.rd);
          }
        })
        .catch(res => {
          console.log(res);
          setLoading(false);
        });
    } else if (
      !record?.payments
        ?.map(payment => payment?.paymentMethod?.id)
        .includes(paymentSeller?.value?.paymentMethod?.id)
    ) {
      openNotification(
        'Error',
        "Your payment method does not match the buyer's. Please create a new payment method or change an existing payment method!",
      );
    } else if (walletUser > available) {
      setCryptoSell(available);
      setReceivePriceSell(available * record.price);
    } else {
      setValidateStateSell(true);
      setShowModalWarning(true);
    }
  };

  const handleChangeCryptoSell = value => {
    setCryptoSell(Number(value?.toFixed(2)));
    setReceivePriceSell(
      Number(Math.floor(value?.toFixed(2) * record?.price * 100) / 100),
    );

    if (
      Number(value?.toFixed(2)) < record?.orderLowerBound / record?.price ||
      Number(value?.toFixed(2)) > available
    ) {
      setValidateStateSell(true);
    } else setValidateStateSell(false);
  };

  const changePaymentSeller = value => {
    console.log(value);
    setPaymentSeller(value);
  };

  const handleChangeRecieve = value => {
    setCryptoSell(
      Number(Math.floor((value?.toFixed(2) / record?.price) * 100) / 100),
    );
    setReceivePriceSell(Number(value?.toFixed(2)));
    if (
      Number(value?.toFixed(2)) < record?.orderLowerBound ||
      Number(value?.toFixed(2)) > record?.price * available
    ) {
      setValidateStateSell(true);
    } else setValidateStateSell(false);
  };

  const handelChooseAllSeller = () => {
    if (walletUser > available) {
      setCryptoSell(record?.orderUpperBound / record?.price);
      setReceivePriceSell(record?.orderUpperBound);
    } else setCryptoSell(walletUser);
    if (walletUser < record.orderLowerBound / record.price) {
      setValidateStateSell(true);
    } else setValidateStateSell(false);
  };

  const findAllUserPayments = () => {
    getUserPayments().then(res => {
      if (res.data.rc === 0) {
        setSellerPayments(res.data.rows);
        setPaymentSeller({
          key: res.data.rows[0]?.id,
          value: res.data.rows[0],
          label: (
            <div className="selectPaymentContent">
              <Tag
                className="paymentMethodTag"
                color={res.data.rows[0]?.paymentMethod.colorCode}
              >
                {res.data.rows[0]?.paymentMethod.name}
              </Tag>
              <span>{res.data.rows[0]?.fullName}</span>
            </div>
          ),
        });
      }
    });
  };

  const findWalletP2P = () => {
    getUserWallet()
      .then(res => {
        if (res.data.rc === 0) {
          let tokenId = record.token?.id;
          setWalletUser(
            res.data.rows?.find(coin => coin?.tokenId === tokenId).total,
          );
        }
      })
      .catch(res => console.log(res));
  };

  useEffect(() => {
    if (type === 'Sell') {
      findAllUserPayments();
      findWalletP2P();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColHandleOrder>
      <div className="orderInfo">
        <ColOrderAdvertisers>
          <div className="row1">
            <div className="firstCharacter">
              {record.account.email.charAt(0).toUpperCase()}
            </div>
            <div className="advertisers">{record.account.email}</div>
          </div>

          <div className="row2">
            {''}
            <span>{record.account.orderIn30Day} Orders</span>
            <span className="numberOrderComplete">
              {record.account.rateComplete.toFixed(2)} % completed
            </span>
          </div>
        </ColOrderAdvertisers>
        <div className="orderDescription">
          <Row>
            <Col lg={6} className="colOrderDesc">
              Price:{' '}
              <span className="orderPrice">
                {record?.fiat?.symbol} {record?.price}
              </span>
            </Col>
            <Col lg={6} className="colOrderDesc">
              Available:{' '}
              <span className="orderDescriptionSpan">
                {record.available} <span>{TabP2PState.searchParam.crypto}</span>
              </span>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="colOrderDesc">
              Payment time limit:{' '}
              <span className="orderDescriptionSpan">
                {timeLimit > 60 ? (
                  <span>
                    {Math.floor(timeLimit / 60)} hours {timeLimit % 60} minutes
                  </span>
                ) : (
                  <span>{timeLimit % 60} minutes</span>
                )}
              </span>
            </Col>
            <Col lg={6} className="colOrderDesc">
              {`${type}er's payment method: `}
              <span className="orderDescriptionSpan">
                <div className="colPayments">
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
                </div>
              </span>
            </Col>
          </Row>
          <div className="termsAndCondition">
            <h6>Terms and condition</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum
              molestiae quasi voluptate minus eos illo possimus? Temporibus
              voluptatem sit dolorem eligendi mollitia magni fugit. Odit eum
              esse necessitatibus neque?
            </p>
          </div>
        </div>
      </div>
      {type === 'Buy' && (
        <div className="formOrderBuy">
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I want to pay
            </label>
            <InputNumber
              onChange={handleChangePayBuy}
              value={pricePayBuy}
              autoComplete="off"
              min={0}
              className="form-control bargain"
              placeholder={`${record.orderLowerBound.toFixed(
                2,
              )} - ${record.orderUpperBound.toFixed(2)}`}
              style={{ borderColor: validateStateBuy ? 'red' : '' }}
            />
            {validateStateBuy && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
            <div className="apponAfter">
              <button
                className="btnChooseAll"
                onClick={() => handelChooseAll()}
              >
                All
              </button>
              <span className="fiatNameInput">{fiatName}</span>
            </div>
          </div>

          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label">
              I will receive
            </label>
            <InputNumber
              style={{
                borderColor: validateStateBuy ? darkTheme.redColor : '',
              }}
              id="disabledTextInput"
              className="form-control bargain"
              placeholder="0.00"
              min={0}
              value={receiveBuy}
              onChange={handleChangeReceiveBuy}
            />
            <div className="apponAfter">
              <span className="fiatNameInput">{crypto}</span>
            </div>
          </div>

          <div className="btn-control">
            <Button
              className="btn btn-secondary btn-lg btn-cancel"
              onClick={() => {
                hanldeCloseOrder(prev => prev.filter(order => order !== index));
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-lg btn-primary btn-buy"
              onClick={() => {
                handleBuy();
              }}
              disabled={validateStateBuy || loading}
            >
              {loading ? <div className="loader"></div> : `Buy ${crypto}`}
            </Button>
          </div>
          <div className="desc">
            <span className="underDot">T+1:</span>
            <span>
              {' '}
              T+1 withdrawal limit will be imposed on the purchased asset to
              enhance fund safety.
            </span>
            <span>
              {' '}
              <span>Learn more {'>'}</span>
            </span>
          </div>
        </div>
      )}

      {/* {SELL} */}
      {type === 'Sell' && (
        <div className="formOrderSell">
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label">
              I want to sell
            </label>
            <InputNumber
              style={{
                borderColor: validateStateSell ? darkTheme.redColor : '',
              }}
              id="disabledTextInput"
              className="form-control bargain"
              placeholder="0.00"
              min={0}
              value={cryptoSell}
              onChange={handleChangeCryptoSell}
            />
            <div className="apponAfter">
              <button
                className="btnChooseAll"
                onClick={() => handelChooseAllSeller()}
              >
                All
              </button>
              <span className="fiatNameInput">{crypto}</span>
            </div>
            {validateStateSell && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
          </div>

          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I will receive
            </label>
            <InputNumber
              onChange={handleChangeRecieve}
              value={receivePriceSell}
              autoComplete="off"
              min={0}
              className="form-control bargain"
              placeholder={`${record?.orderLowerBound.toFixed(
                2,
              )} - ${record?.orderUpperBound.toFixed(2)}`}
              style={{
                borderColor: validateStateSell ? darkTheme.redColor : '',
              }}
            />
            <div className="apponAfter">
              <span className="fiatNameInput">{fiatName}</span>
            </div>
          </div>
          <p className="paymentTitle">Payments method</p>
          {sellerPayments?.length !== 0 ? (
            <Select
              className="selectPaymentSell basic-single"
              options={options}
              value={paymentSeller}
              onChange={changePaymentSeller}
            />
          ) : (
            <Button className="btnAddPaymentMethod">
              <BiPlus className="plusIcon" />
              <span>Add payment method</span>
            </Button>
          )}
          <div className="btn-control">
            <Button
              className="btn btn-secondary btn-lg btn-cancel"
              onClick={() => {
                hanldeCloseOrder(prev => prev.filter(order => order !== index));
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-lg btn-primary btn-sell"
              onClick={() => {
                handleSell();
              }}
              disabled={validateStateSell || loading}
            >
              {loading ? <div className="loader"></div> : `Sell ${crypto}`}
            </Button>
          </div>
          <ModalWarning
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setShowModalWarning(false)}
            show={showModalWarning}
          >
            <Modal.Body>
              <div className="border">
                <RiErrorWarningFill className="wariningIcon" />
              </div>
              <p>Not enough balance, please transfer money first.</p>
              <GrFormClose
                className="iconClose"
                onClick={() => setShowModalWarning(false)}
              />
              <Button className="moneyTrans">Go to money transfer</Button>
            </Modal.Body>
          </ModalWarning>
        </div>
      )}
    </ColHandleOrder>
  );
};

export default HandleOrder;

const ColHandleOrder = styled.div`
  min-height: 350px;
  display: flex;

  .colPayments {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    img {
      width: 30px;
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
      color: ${({ theme }) => theme.redColor};
    }
  }
  .orderDescription {
    margin-left: 25px;
    margin-top: 10px;
    padding-right: 20px;

    .colOrderDesc {
      margin-bottom: 5px;
    }
    .paymentTag {
      margin-bottom: 2px;
      padding-right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 25px;
        padding: 2px;
        margin-left: 2px;
      }
    }
    .orderPrice {
      color: ${({ theme }) => theme.redColor};
    }

    .orderDescriptionSpan {
      font-weight: bold;
    }

    .termsAndCondition {
      margin-top: 20px;
    }
  }
  .orderInfo {
    flex: 6;
    border-right: 1px solid ${({ theme }) => theme.brightGrayColor};
    overflow: scroll;
    ::-webkit-scrollbar {
      height: 100%;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: ${({ theme }) => theme.brightGrayColor};
    }
  }
  .formOrderSell {
    padding-left: 20px;
    flex: 4;

    .labelText {
      width: 100%;
    }

    .inputBuy {
      position: relative !important;
      margin-bottom: 30px !important;
    }

    .validateMessage {
      position: absolute;
      bottom: -100;
      color: ${({ theme }) => theme.redColor};
    }
    .selectPaymentSell {
      margin-top: -10px;
      border: none;

      .css-1pahdxg-control {
        border: 1px solid ${({ theme }) => theme.primary};
        box-shadow: none;
      }
      .css-4ljt47-MenuList {
        height: 200px;
        &::-webkit-scrollbar-thumb {
          background-color: ${({ theme }) => theme.primary};
          border-radius: 0;
          scroll-behavior: smooth;
        }
      }
      .selectPaymentContent {
      }
      .paymentMethodTag {
        border-radius: 3px;
        opacity: 0.9;
      }
    }

    .apponAfter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(10%);
      transition: all 0.25s linear;
      margin-right: 10px;
      color: ${({ theme }) => theme.brightGrayColor};

      .btnChooseAll {
        margin-right: 15px;
        border: none;
        color: ${({ theme }) => theme.primary} !important;
        background-color: ${({ theme }) => theme.p2pBackground};
        border-radius: 5px;
        transition: all 0.25s linear;
        margin-bottom: 2px;

        &:hover {
          background-color: ${({ theme }) => theme.brightGrayColor};
        }
      }
    }

    .ant-input-number-handler-wrap {
      display: none;
    }

    .bargain {
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100% !important;
      height: 40px;
      box-shadow: none;
      padding: 4px 10px;

      input {
        padding: 0;
      }
      &:hover {
        border: 1px solid ${({ theme }) => theme.primary};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
        box-shadow: none;
      }
    }

    .paymentTitle {
      margin-top: 0;
      margin-bottom: 10px;
    }
    .ant-select {
      width: 100% !important;

      .ant-select-selector {
        border-radius: 5px !important;
        height: 40px;
        padding-top: 3px;
      }
    }

    .btn-control {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      button {
        padding-left: 0;
        padding-right: 0;
      }

      .btn {
        height: 40px;
        font-size: 16px;
        padding-bottom: 20px;
      }
      .btn-cancel {
        flex: 3;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.grayColor};
        border-color: ${({ theme }) => theme.grayColor};
        transition: all 0.25s linear;

        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }

      .btn-sell {
        flex: 7;
        background-color: ${({ theme }) => theme.redColor};
        border: ${({ theme }) => theme.redColor};
        transition: all 0.25s linear;
        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }
    }

    .btnAddPaymentMethod {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
      border-color: ${({ theme }) => theme.brightGrayColor};
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      &:focus {
        box-shadow: none;
      }

      &:hover {
        border-color: ${({ theme }) => theme.primary};
      }

      .plusIcon {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }
  .formOrderBuy {
    padding-left: 20px;
    flex: 4;

    .ant-input-number-handler-wrap {
      display: none;
    }

    .bargain {
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100%;
      height: 40px;
      box-shadow: none;
      padding: 4px 10px;

      input {
        padding: 0;
      }

      &:hover {
        border: 1px solid ${({ theme }) => theme.primary};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
        box-shadow: none;
      }
    }

    .btn-control {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;

      button {
        padding-left: 0;
        padding-right: 0;
      }

      .btn {
        height: 40px;
        font-size: 16px;
        padding-bottom: 20px;
      }
      .btn-cancel {
        flex: 3;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.grayColor};
        border-color: ${({ theme }) => theme.grayColor};
        transition: all 0.25s linear;

        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }

      .btn-buy {
        flex: 7;
        background-color: ${({ theme }) => theme.greenColor};
        border: ${({ theme }) => theme.greenColor};
        transition: all 0.25s linear;
        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }
    }

    .labelText {
      width: 100%;
    }

    .inputBuy {
      position: relative !important;
      margin-bottom: 35px !important;
    }
    .validateMessage {
      position: absolute;
      bottom: -100;
      color: ${({ theme }) => theme.redColor};
    }

    .apponAfter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(10%);
      transition: all 0.25s linear;
      margin-right: 10px;
      color: ${({ theme }) => theme.brightGrayColor};

      .btnChooseAll {
        margin-right: 15px;
        border: none;
        color: ${({ theme }) => theme.primary} !important;
        background-color: ${({ theme }) => theme.p2pBackground};
        border-radius: 5px;
        transition: all 0.25s linear;
        margin-bottom: 2px;

        &:hover {
          background-color: ${({ theme }) => theme.brightGrayColor};
        }
      }
    }

    .desc {
      margin-top: 20px;
      text-align: center;

      .underDot {
        font-weight: bold;
        border-bottom: 2px dotted black;
      }

      span:last-child {
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
      }
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
    font-size: 11px;
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

  @media only screen and (max-width: 767px) {
    .formOrderSell {
      padding-left: 8px;
    }
    .formOrderBuy {
      padding-left: 8px;
    }

    .orderDescription {
      padding-right: 8px;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    .orderInfo {
      height: 1000px;
      border-right: 0;

      .firstCharacter {
        display: none;
      }
      .advertisers {
        font-weight: bold;
      }
    }

    .orderDescription {
      margin-left: 8px;
    }
  }
`;

const ColOrderAdvertisers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

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
      border-left: 1px solid ${({ theme }) => theme.brightGrayColor};
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column !important;
  }

  @media only screen and (max-width: 600px) {
    .row2 {
      margin-left: 9px;
    }
  }
`;

const ModalWarning = styled(Modal)`
  .modal-content {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
  }

  .modal-body {
    color: ${({ theme }) => theme.p2pText};
    position: relative;

    .iconClose {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 30px;
      cursor: pointer;
      opacity: 0.3;
    }
    .border {
      margin-bottom: 20px;
      margin-top: 10px;
      display: inline-block;
      border-radius: 50%;
      padding: 5px;
    }
    .wariningIcon {
      color: ${({ theme }) => theme.primary};
      font-size: 70px;
      padding: 0;
      position: relative;
    }
    .moneyTrans {
      width: 100%;
      background-color: ${({ theme }) => theme.primary};
      border: none;
      transition: all 0.25s linear;
      margin-top: 10px;

      &:focus {
        box-shadow: none;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
