import { Checkbox, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';
import { RadioStyled } from '../style';
import ModalConfirmPostAd from './ModalConfirmPostAd';
import SwitchStep from './SwitchStep';

const { TextArea } = Input;

function StepRemarksAndResponse() {
  const [form] = Form.useForm();
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();

  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);

  const [registeredAfterNDays, setRegisteredAfterNDays] = useState<number>();
  const [holdingBTCAmount, setHoldingBTCAmount] = useState<number>();

  const [showModalConfirmPost, setShowModalConfirmPost] = useState(false);

  const handleChangeRegisteredAfterNDays = (e: any) => {
    setRegisteredAfterNDays(e.target.value);
  };

  const handleChangeHoldingBTCAmount = (e: any) => {
    setHoldingBTCAmount(e.target.value);
  };

  const handleCloseModalConfirmPost = () => {
    setShowModalConfirmPost(false);
  };

  const handlePost = () => {
    const param: DataPostAdP2PState = {
      remarks: form.getFieldValue('remarks') || '',
      autoReply: form.getFieldValue('autoReply') || '',
      kycRequired: form.getFieldValue('kycRequired') === true ? 1 : 0,
      registeredRequired:
        form.getFieldValue('registeredRequired') === true ? 1 : 0,
      registeredAfterNDays: registeredAfterNDays,
      holdingBTCRequired:
        form.getFieldValue('holdingBTCRequired') === true ? 1 : 0,
      holdingBTCAmount: holdingBTCAmount,
      status: form.getFieldValue('status'),
    };

    dispatch(actions.setDataPostAdP2P(param));
    setShowModalConfirmPost(true);
  };

  return (
    <Wrapper>
      <Form form={form}>
        <div className="stepRAR--label">Remarks (Optional)</div>
        <Form.Item name="remarks">
          <TextArea
            rows={4}
            maxLength={1000}
            showCount
            placeholder="Please do not include any crypto-related words, such as crypto, P2P, C2C, BTC, USDT, ETH, etc,..."
          />
        </Form.Item>

        <div className="stepRAR--label">Auto Reply (Optional)</div>
        <Form.Item name="autoReply">
          <TextArea
            rows={4}
            maxLength={1000}
            showCount
            placeholder="Auto reply message will be sent to the counter party once the order is created"
          />
        </Form.Item>

        <div className="stepRAR--dash"></div>

        <div className="stepRAR--label">Counterparty Conditions</div>

        <Form.Item
          name="kycRequired"
          className="stepRAR--checkbox"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox disabled={PostAdP2PState.data.orderType === 1}>
            Completed KYC
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="registeredRequired"
          className="stepRAR--checkbox"
          valuePropName="checked"
        >
          <Checkbox>
            <div className="stepRAR--titleChecked">
              Registered
              <Input
                type={'number'}
                className="stepRAR--inputChecked"
                onChange={handleChangeRegisteredAfterNDays}
                value={registeredAfterNDays}
              ></Input>
              day(s) ago
            </div>
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="holdingBTCRequired"
          className="stepRAR--checkbox"
          valuePropName="checked"
        >
          <Checkbox>
            <div className="stepRAR--titleChecked">
              Holdings more than
              <Input
                type={'number'}
                className="stepRAR--inputChecked"
                onChange={handleChangeHoldingBTCAmount}
                value={holdingBTCAmount}
              ></Input>
              BTC
            </div>
          </Checkbox>
        </Form.Item>

        <div className="stepRAR--label mt-4">Status</div>
        <Form.Item name="status" initialValue={'ONLINE'}>
          <Radio.Group>
            <RadioStyled value="ONLINE">Online right now</RadioStyled>
            <RadioStyled value="OFFLINE">Offline, manually later</RadioStyled>
          </Radio.Group>
        </Form.Item>
      </Form>

      <SwitchStep next={() => {}} post={handlePost} />

      <ModalConfirmPostAd
        visible={showModalConfirmPost}
        onCancel={handleCloseModalConfirmPost}
      />
    </Wrapper>
  );
}

export default StepRemarksAndResponse;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pBackground};
  min-height: 400px;
  padding: 30px;

  .stepRAR {
    &--label {
      color: ${({ theme }) => theme.p2pGray};
      padding-bottom: 4px;
    }

    &--dash {
      border-top: 1px dashed ${({ theme }) => theme.p2pBorder};
      margin-top: 35px;
      margin-bottom: 30px;
    }

    &--checkbox {
      margin-bottom: 0px;
    }

    &--inputChecked {
      width: 70px;
      margin: 0px 4px;
    }

    &--titleChecked {
      display: flex;
      align-items: center;
    }
  }
`;
