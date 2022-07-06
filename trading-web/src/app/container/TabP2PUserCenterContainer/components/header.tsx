import { Tag, Typography } from 'antd';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import styled from 'styled-components';
import { darkTheme } from 'theme/theme';

const HeaderP2PUserCenter = () => {
  const [showP2pEstimatedValue, setShowP2pEstimatedValue] = useState(false);

  const user = {
    name: 'User',
    verified: true,
    allowReceiveEmail: true,
    allowReceiveSms: true,
    allowReceiveKyc: false,
    p2pEstimatedValue: {
      token: 'BTC',
      value: 0,
      fiat: 'USD',
      price: 40.0,
    },
  };

  const { Title } = Typography;

  return (
    <Wrapper className="container">
      <Row className="header">
        <Col xxl={10} xl={10} md={9} sm={12}>
          <Row className="userInfo">
            <Col className="userName" xxl={8} md={6} sm={12}>
              <Title level={5}>
                <span className="avatar">{user.name?.charAt(0)}</span>
                <span>
                  {user.name} <FiEdit className="editIcon" />
                </span>
                <Tag color={darkTheme.primary}>
                  {user.verified ? 'Verified User' : 'Not Verifited User'}
                </Tag>
              </Title>
              <div className="checkedUser">
                <span>
                  Email{' '}
                  {user.allowReceiveEmail ? (
                    <AiFillCheckCircle className="checkedIcon" />
                  ) : (
                    <AiFillCloseCircle className="notCheckedIcon" />
                  )}
                </span>
                <span>
                  SMS{' '}
                  {user.allowReceiveSms ? (
                    <AiFillCheckCircle className="checkedIcon" />
                  ) : (
                    <AiFillCloseCircle className="notCheckedIcon" />
                  )}
                </span>
                <span>
                  KYC{' '}
                  {user.allowReceiveKyc ? (
                    <AiFillCheckCircle className="checkedIcon" />
                  ) : (
                    <AiFillCloseCircle className="notCheckedIcon" />
                  )}
                </span>
              </div>
            </Col>
            <Col className="p2pEstimatedValue" xxl={4} md={6} sm={12}>
              <span>
                P2P Estimated Value ({user.p2pEstimatedValue?.token}){' '}
                {showP2pEstimatedValue ? (
                  <AiOutlineEye
                    className="eyeIcon"
                    onClick={() => setShowP2pEstimatedValue(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="eyeIcon"
                    onClick={() => setShowP2pEstimatedValue(true)}
                  />
                )}
              </span>
              <p>
                <span className="cryptoNumber">
                  {showP2pEstimatedValue
                    ? user.p2pEstimatedValue?.value?.toFixed(8)
                    : '*********  '}
                </span>
                <span>
                  {showP2pEstimatedValue && (
                    <span> {user.p2pEstimatedValue?.token} ≈ </span>
                  )}
                  <span>
                    {showP2pEstimatedValue
                      ? (
                          user.p2pEstimatedValue?.value *
                          user.p2pEstimatedValue?.price
                        ).toFixed(8)
                      : '*********'}
                  </span>

                  {showP2pEstimatedValue && (
                    <span>{' ' + user.p2pEstimatedValue.fiat}</span>
                  )}
                </span>
              </p>
            </Col>
          </Row>
        </Col>
        <Col xxl={2} xl={2} md={3} sm={12}>
          <Button className="btnMerchant">Become merchant</Button>
        </Col>
      </Row>
      <Row className="content">
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">30d Trades</p>
          <p className="value">
            0 <span className="unit">Time(s)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">30d Completion Rate</p>
          <p className="value">
            0 <span className="unit">%</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Avg. Release Time</p>
          <p className="value">
            0 <span className="unit">Minute(s)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Avg. Pay Time</p>
          <p className="value">
            0 <span className="unit">Minute(s)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Positive Feedback</p>
          <p className="value">
            0 <span className="unit">% (0)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Positive</p>
          <p className="value">0 </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Negative</p>
          <p className="value">0 </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Registered</p>
          <p className="value">
            0 <span className="unit">Day(s)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">First Trade</p>
          <p className="value">
            0 <span className="unit">Day(s)</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">All Trades</p>
          <p className="value">
            0 <span className="unit">Time(s)</span>
            <p className="subUnit">(Buy 0 | Sell 0)</p>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Approx. 30d Volume</p>
          <p className="value">
            0 <span className="unit">BTC</span>
          </p>
        </Col>
        <Col xxl={3} lg={4} md={6} sm={6} xs={12}>
          <p className="title">Approx. Total Volume</p>
          <p className="value">
            0 <span className="unit">BTC</span>
            <p className="subUnit">(Buy 0.00000000 | Sell 0.00000000)</p>
          </p>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HeaderP2PUserCenter;

const Wrapper = styled.div`
  padding: 30px 10px;

  .header {
    border-bottom: 2px solid ${({ theme }) => theme.whiteSmokeColor};
    padding-bottom: 20px;

    .userInfo {
      .userName {
        .avatar {
          background-color: ${({ theme }) => theme.primary};
          padding: 2px 6px;
          border-radius: 50%;
          color: ${({ theme }) => theme.p2pTextLight};
          margin-right: 7px;
        }

        .editIcon {
          transform: translateY(-2px);
          cursor: pointer;
          margin-right: 10px;
        }

        .checkedUser {
          max-width: 250px;
          transform: translateX(30px);
          color: ${({ theme }) => theme.darkGrayColor};

          .checkedIcon {
            margin-right: 10px;
            color: ${({ theme }) => theme.greenColor};
          }

          .notCheckedIcon {
            margin-right: 10px;
            color: ${({ theme }) => theme.redColor};
          }
        }
      }
      .p2pEstimatedValue {
        max-width: 80%;
        color: ${({ theme }) => theme.darkGrayColor};
        text-align: right;

        .cryptoNumber {
          font-weight: bold;
          color: ${({ theme }) => theme.p2pText};

          font-size: 18px;
        }

        .eyeIcon {
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
        }

        @media only screen and (max-width: 767px) {
          text-align: left;
          margin-left: 29px;
          margin-top: 20px;
        }
      }
    }

    .btnMerchant {
      background-color: ${({ theme }) => theme.primary};
      border: none;
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100%;
      height: 40px;

      &:focus {
        box-shadow: none;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .content {
    color: ${({ theme }) => theme.darkGrayColor};
    padding-top: 30px;
    .title {
      margin-bottom: 5px;
      color: ${({ theme }) => theme.brightGrayColor};
    }

    .value {
      color: ${({ theme }) => theme.p2pText};
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      .unit {
        color: ${({ theme }) => theme.darkGrayColor};
        font-size: 14px;
        font-weight: 300;
      }
    }

    .subUnit {
      font-size: 14px;
      color: ${({ theme }) => theme.darkGrayColor};
      font-size: 11px;
      font-weight: 300;
    }
  }
`;
