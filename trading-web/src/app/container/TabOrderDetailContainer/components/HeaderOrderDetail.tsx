import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTabOrderDetail } from '../slice/selectors';
import { TabOrderDetailState } from '../slice/types';
import { useEffect, useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const HeaderOrderDetail = ({ trade, reload }) => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const date = new Date(trade?.createTime);
  const date1 = Date.now();
  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);

  useEffect(() => {
    switch (TabOrderDetailState.tradeStatus) {
      case 'PROCESSING':
        if (TabOrderDetailState?.tradeType === 'Buy') {
          if (TabOrderDetailState.buyerStatus === 'NOT_PAID') {
            setTitle(
              `Buy ${trade?.order?.token?.assetName} from ${trade?.partner?.email}`,
            );
            setSubTitle(
              'The order is created, please wait for system confirmation.',
            );
          }
          if (TabOrderDetailState.buyerStatus === 'PAID') {
            setTitle(
              `Buy ${trade?.order?.token?.assetName} from ${trade?.partner?.email}`,
            );
            setSubTitle("Pending seller's release crypto");
          }
        } else {
          if (TabOrderDetailState.buyerStatus === 'NOT_PAID') {
            setTitle(
              `Sell ${trade?.order?.token?.assetName} to ${trade?.partner?.email}`,
            );
            setSubTitle("Pending buyer's payment. Time remaining");
          }
          if (TabOrderDetailState.buyerStatus === 'PAID') {
            setTitle(
              `Sell ${trade?.order?.token?.assetName} to ${trade?.partner?.email}`,
            );
            setSubTitle(
              'Please confirm that you have received payment from buyer',
            );
          }
        }

        break;
      case 'DONE':
        if (TabOrderDetailState?.tradeType === 'Buy') {
          setTitle('Order completed');
          setSubTitle(
            `Successfully bought ${trade?.amount} ${trade?.order?.token?.assetName}`,
          );
        } else {
          setTitle('Order completed');
          setSubTitle(
            `Successfully sold ${trade?.amount} ${trade?.order?.token?.assetName}`,
          );
        }
        break;
      case 'CANCEL':
        if (TabOrderDetailState?.tradeType === 'Buy') {
          setTitle('Cancelled this order');
          setSubTitle('You cancelled this order');
        } else {
          setTitle('This order has been cancelled');
          setSubTitle('Buyer cancelled this order');
        }
        break;
      case 'APPEAL':
        setTitle('Appeal');
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState]);
  return (
    <Wrapper>
      <div className="container">
        <div className="sellInfo">
          <h4>
            {title}{' '}
            {TabOrderDetailState.tradeStatus === 'DONE' && (
              <BsFillCheckCircleFill className="successIcon" />
            )}
          </h4>
          <div className="countdown">
            <span>{subTitle}</span>
            {TabOrderDetailState.buyerStatus === 'NOT_PAID' &&
              TabOrderDetailState.tradeStatus === 'PROCESSING' && (
                <Countdown
                  value={
                    Date.now() +
                    trade?.order?.paymentTime?.timeLimit * 60000 -
                    (date1 - date.getTime())
                  }
                  className="countdownTimer"
                ></Countdown>
              )}

            <span className="bg"></span>
          </div>
        </div>
        <div className="orderInfo">
          <p>
            <span className="clgray">Order number</span>: {trade?.orderNumber}
          </p>
          <p>
            <span className="clgray">Create at</span>:{' '}
            {date && (
              <span>
                {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} -{' '}
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </span>
            )}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderOrderDetail;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pGrayLight};
  padding-top: 20px;
  padding-bottom: 10px;
  .successIcon {
    color: ${({ theme }) => theme.greenColor};
    margin-left: 10px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .countdown {
      display: flex;
      align-items: center;
      position: relative;

      .countdownTimer {
        font-size: 40px !important;
        font-weight: bold;
        margin-left: 20px;
        letter-spacing: 10px;
        padding-bottom: 5px;
        position: relative;
        z-index: 1;
      }

      .ant-statistic-content {
        position: relative;
        &::before {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          left: 0;
          top: 0;
          transform: translate(-14%, -3%);
          border-radius: 5px;
        }

        &::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          right: 0;
          top: 0;
          transform: translate(-4%, -3%);
          border-radius: 5px;
          margin-right: 0px;
        }
      }
      .ant-statistic-content-value {
        position: relative;

        &::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          top: 0;
          border-radius: 5px;
          left: 50%;
          transform: translate(-59%, -3%);
        }
      }
    }

    .orderInfo {
      text-align: right;

      .clgray {
        color: ${({ theme }) => theme.grayColor};
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .container {
      flex-direction: column;
      align-items: flex-start;

      .orderInfo {
        text-align: left;
        margin-top: 20px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    .countdown {
      flex-direction: column;
      align-items: flex-start !important;
    }

    .countdownTimer {
      margin-left: 10px !important;
      margin-top: 10px !important;
    }
  }
`;
