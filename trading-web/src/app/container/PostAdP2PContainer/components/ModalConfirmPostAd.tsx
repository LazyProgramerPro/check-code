import { Button, Modal, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePostAdP2PSlice } from '../slice';
import openNotification from 'app/components/NotificationAntd';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

function ModalConfirmPostAd(props: Props) {
  const { visible, onCancel } = props;
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();
  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);

    const email = await postAdP2PServices
      .getProfileUser()
      .then(res => {
        if (res.data.rc !== 0) {
          return null;
        }

        return res.data.email;
      })
      .catch(err => {
        setLoading(false);
        return null;
      });

    const param: DataPostAdP2PState = {
      accountEmail: email,
      orderType: PostAdP2PState.data.orderType,
      tokenId: PostAdP2PState.data.tokenId,
      fiatId: PostAdP2PState.data.fiatId,
      priceType: PostAdP2PState.data.priceType,
      price: PostAdP2PState.data.price,
      amount: PostAdP2PState.data.amount,
      orderLowerBound: PostAdP2PState.data.orderLowerBound,
      orderUpperBound: PostAdP2PState.data.orderUpperBound,
      paymentTimeId: PostAdP2PState.data.paymentTimeId,
      total: PostAdP2PState.data.total,
      paymentIds: PostAdP2PState.data.paymentIds,
      remarks: PostAdP2PState.data.remarks,
      autoReply: PostAdP2PState.data.autoReply,
      kycRequired: PostAdP2PState.data.kycRequired,
      registeredRequired: PostAdP2PState.data.registeredRequired,
      registeredAfterNDays: PostAdP2PState.data.registeredAfterNDays
        ? PostAdP2PState.data.registeredAfterNDays
        : 0,
      holdingBTCRequired: PostAdP2PState.data.holdingBTCRequired,
      holdingBTCAmount: PostAdP2PState.data.holdingBTCAmount
        ? PostAdP2PState.data.holdingBTCAmount
        : 0,
      status: PostAdP2PState.data.status,

      floatingPercent: 0,
    };

    console.log('💙TuanHQ💖 ~> handlePost ~> param', param);

    postAdP2PServices
      .postCreateOrderAdP2PService(param)
      .then(res => {
        if (res.data.rc === 0) {
          navigate('/trade-p2p/p2p/?action=buy&crypto=&fiat=USD&payment=');
          dispatch(actions.setCurrentStep(1));
        } else openNotification('Error', res.data.rd);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Confirm to Post"
      visible={visible}
      onCancel={onCancel}
      footer={false}
      maskClosable={false}
    >
      <Wrapper>
        <Row className="mb-4">
          <Col lg={8}>
            <div className="confirmPostAds-label">Type</div>
            <div className="confirmPostAds-value confirmPostAds-value__type">
              {PostAdP2PState.data.orderType === 1 ? 'SELL' : 'BUY'}
            </div>
          </Col>
          <Col lg={8}>
            <div className="confirmPostAds-label">Asset</div>
            <div className="confirmPostAds-value">
              {PostAdP2PState.data.tokenName}
            </div>
          </Col>
          <Col lg={8}>
            <div className="confirmPostAds-label">Currency</div>
            <div className="confirmPostAds-value">
              {PostAdP2PState.data.fiatName}
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={8}>
            <div className="confirmPostAds-label">Price Type</div>
            <div className="confirmPostAds-value ">
              {PostAdP2PState.data.priceType === 0 ? 'Fixed' : 'Floating'}
            </div>
          </Col>
          <Col lg={8}></Col>
          <Col lg={8}>
            <div className="confirmPostAds-label">Fixed</div>
            <div className="confirmPostAds-value">
              {PostAdP2PState.data.price} {PostAdP2PState.data.fiatName}
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={8}>
            <div className="confirmPostAds-label">Order Limit</div>
            <div className="confirmPostAds-value ">
              {PostAdP2PState.data.orderLowerBound}{' '}
              {PostAdP2PState.data.fiatName}-{' '}
              {PostAdP2PState.data.orderUpperBound}{' '}
              {PostAdP2PState.data.fiatName}
            </div>
          </Col>
          <Col lg={8}>
            <div className="confirmPostAds-label">Total Trading Amount</div>
            <div className="confirmPostAds-value">
              {PostAdP2PState.data.total} {PostAdP2PState.data.fiatName}
            </div>
          </Col>
          <Col lg={8}>
            <div className="confirmPostAds-label">
              Reserved Fee <InfoCircleOutlined className="mx-2" />
            </div>
            <div className="confirmPostAds-value">0.35</div>
          </Col>
        </Row>

        <div className="confirmPostAds-line"></div>

        <div className="confirmPostAds-label">Counterparty Conditions</div>
        {PostAdP2PState.data.kycRequired === 1 && (
          <div className="confirmPostAds-value">Completed KYC</div>
        )}

        {PostAdP2PState.data.registeredRequired === 1 && (
          <div className="confirmPostAds-value">
            Registered {PostAdP2PState.data.registeredAfterNDays} day(s) ago
          </div>
        )}

        {PostAdP2PState.data.holdingBTCRequired === 1 && (
          <div className="confirmPostAds-value">
            Holdings more than {PostAdP2PState.data.holdingBTCAmount} BTC
          </div>
        )}

        <div className="confirmPostAds-line mt-3"></div>

        <Row className="mb-4">
          <Col lg={12}>
            <div className="confirmPostAds-label">Payment Method</div>
            <div className="confirmPostAds-value ">
              {PostAdP2PState.data.paymentMethodSelected?.map((p, i) => (
                <div key={i}>
                  {p.bankBranch} {p.fullName}
                </div>
              ))}
            </div>
          </Col>
          <Col lg={12}>
            <div className="confirmPostAds-label">Payment Time Limit</div>
            <div className="confirmPostAds-value">
              {PostAdP2PState.data.paymentTime?.timeLimit} m
            </div>
          </Col>
        </Row>

        <div className="confirmPostAds-containerBtn">
          <Button
            className="confirmPostAds-btn"
            type="default"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="confirmPostAds-btn"
            type="primary"
            onClick={handlePost}
            loading={loading}
          >
            Post
          </Button>
        </div>
      </Wrapper>
    </Modal>
  );
}

export default ModalConfirmPostAd;

const Wrapper = styled.div`
  .confirmPostAds {
    &-label {
      color: #707a8a;

      display: flex;
      align-items: center;
    }

    &-value {
      &__type {
        color: #f6465d;
      }
    }

    &-line {
      height: 1px;
      background-color: #eaecef;
      margin-bottom: 18px;
    }

    &-containerBtn {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-btn {
      width: 48%;
    }
  }
`;
