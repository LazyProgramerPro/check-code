import { Button, Form, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { postAdP2PServices } from 'services/postAdP2PService';
import styled from 'styled-components';
import { usePostAdP2PSlice } from '../slice';
import { selectPostAdP2P } from '../slice/selectors';
import { DataPostAdP2PState, PostAdP2PState } from '../slice/types';
import CardPaymentMethod from './CardPaymentMethod';
import ModalSelectPaymentMethod from './ModalSelectPaymentMethod';
import SwitchStep from './SwitchStep';
const { Option } = Select;

function StepTotalAndPayment() {
  const { actions } = usePostAdP2PSlice();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const PostAdP2PState: PostAdP2PState = useSelector(selectPostAdP2P);
  const TokenName = PostAdP2PState.data.tokenName;
  const FiatName = PostAdP2PState.data.fiatName;

  const [total, setTotal] = useState<number>();

  const [paymentTimes, setPaymentTimes] = useState<any[]>([]);

  const [modalSelectPaymentMethod, setModalSelectPaymentMethod] =
    useState(false);
  const [paymentMethodIDSelected, setPaymentMethodIDSelected] = useState<any[]>(
    [],
  );
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<any[]>([]);
  const [isEmptyPaymentMethods, setIsEmptyPaymentMethods] = useState(false);

  const handleSelectPayment = (paymentID: any, payment: any) => {
    setPaymentMethodIDSelected([...paymentMethodIDSelected, paymentID]);
    setPaymentMethodSelected([...paymentMethodSelected, payment]);
    setIsEmptyPaymentMethods(false);
  };

  const handleRemovePaymentMethod = (id: string) => {
    const newPMIDs = paymentMethodIDSelected.filter(p => p !== id);
    const newPDs = paymentMethodSelected.filter(p => p.id !== id);

    setPaymentMethodIDSelected(newPMIDs);
    setPaymentMethodSelected(newPDs);
  };

  const handleOpenModal = () => {
    setModalSelectPaymentMethod(true);
  };

  const handleCloseModal = () => {
    setModalSelectPaymentMethod(false);
  };

  const handleGetAllPaymentTime = () => {
    postAdP2PServices
      .getAllPaymentTimeP2PService()
      .then(res => {
        if (res.data.rc !== 0) {
          return;
        }

        setPaymentTimes(res.data.rows);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleChangeAmount = (e: any) => {
    if (PostAdP2PState.data.price) {
      setTotal(PostAdP2PState.data.price * e);
    }
  };

  const handleNextStep = () => {
    form
      .validateFields()
      .then(res => {
        if (paymentMethodIDSelected.length === 0) {
          setIsEmptyPaymentMethods(true);
          return;
        }

        const paymentTime = paymentTimes.find(
          time => res.paymentTimeId === time.id,
        );

        const param: DataPostAdP2PState = {
          amount: res.amount,
          orderLowerBound: parseInt(res.orderLowerBound),
          orderUpperBound: parseInt(res.orderUpperBound),
          paymentTimeId: res.paymentTimeId,
          paymentTime: paymentTime,
          total: total,
          paymentIds: paymentMethodIDSelected,
          paymentMethodSelected: paymentMethodSelected,
        };
        dispatch(actions.setDataPostAdP2P(param));
        dispatch(actions.setCurrentStep(3));
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  };

  useEffect(() => {
    handleGetAllPaymentTime();
  }, []);

  return (
    <Wrapper>
      <Form form={form}>
        <div className="stepTAP--label">Total Amount</div>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: 'Enter trading amount',
            },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject();
                }

                if (
                  (TokenName === 'USDT' ||
                    TokenName === 'BUSD' ||
                    TokenName === 'DAI') &&
                  value < 100
                ) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 100'),
                  );
                }

                if (TokenName === 'BTC ' && value < 0.0001) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 0.0001'),
                  );
                }

                if (TokenName === 'BNB  ' && value < 0.01) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 0.01'),
                  );
                }

                if (TokenName === 'ETH  ' && value < 0.001) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 0.001 '),
                  );
                }

                if (
                  (TokenName === 'ADA' || TokenName === 'SLP ') &&
                  value < 50
                ) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 50'),
                  );
                }

                if (TokenName === 'SHIB' && value < 3000) {
                  return Promise.reject(
                    new Error('Total amount should not be less than 3000 '),
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
          extra={
            form.getFieldWarning('amount') && (
              <ExtraTotal>
                <div className="left">
                  <span>Available: 0 {PostAdP2PState.data.tokenName}</span>
                  <Button type="link">All</Button>
                </div>
                <div className="right">
                  ≈ {total} {PostAdP2PState.data.fiatName}
                </div>
              </ExtraTotal>
            )
          }
        >
          <InputNumber
            className="stepTAP--input stepTAP--input-total"
            addonAfter={<>{PostAdP2PState.data.tokenName}</>}
            type="number"
            onChange={handleChangeAmount}
          />
        </Form.Item>

        <div className="stepTAP--label">Order Limit</div>
        <div className="stepTAP--orderLimit">
          <Form.Item
            name="orderLowerBound"
            rules={[
              { required: true, message: 'Please enter min order limit' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject();
                  }

                  if (getFieldValue('orderUpperBound') < value) {
                    return Promise.reject(
                      new Error(
                        'Min order limit should not exceed the max order limit',
                      ),
                    );
                  }

                  if (FiatName === 'USDT ' && value < 2) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 2'),
                    );
                  }

                  if (FiatName === 'PHP ' && value < 70) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 70'),
                    );
                  }

                  if (
                    (FiatName === 'HKD' ||
                      FiatName === 'AUD' ||
                      FiatName === 'EUR') &&
                    value < 10
                  ) {
                    return Promise.reject(
                      new Error('Total amount should not be less than 10'),
                    );
                  }

                  if (FiatName === 'RUB ' && value < 500) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 500'),
                    );
                  }

                  if (FiatName === 'GBP ' && value < 1) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 1'),
                    );
                  }

                  if (FiatName === 'JPY ' && value < 150) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 150'),
                    );
                  }

                  if (FiatName === 'RON ' && value < 5) {
                    return Promise.reject(
                      new Error('Min limit should not be less than 5'),
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber
              className="stepTAP--input stepTAP--input-order"
              addonAfter={<>{PostAdP2PState.data.fiatName}</>}
              type="number"
            />
          </Form.Item>

          <AiOutlineMinus className="mt-2" />

          <Form.Item
            name="orderUpperBound"
            initialValue={10}
            rules={[
              { required: false },
              ({ getFieldValue, setFields }) => ({
                validator(_, value) {
                  if (getFieldValue('orderLowerBound') < value) {
                    setFields([
                      {
                        name: 'orderLowerBound',
                        errors: undefined,
                      },
                    ]);
                    return Promise.resolve();
                  }

                  if (getFieldValue('orderLowerBound') < value) {
                    setFields([
                      {
                        name: 'orderLowerBound',
                        errors: [
                          'Min order limit should not exceed the max order limit',
                        ],
                      },
                    ]);
                    return Promise.resolve();
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber
              className="stepTAP--input stepTAP--input-order"
              addonAfter={<>{PostAdP2PState.data.fiatName}</>}
              type="number"
            />
          </Form.Item>
        </div>

        <div className="stepTAP--dash"></div>

        <div className="stepTAP--label">Payment Method</div>
        <div>Select up to 5 methods</div>
        {paymentMethodSelected.map((e, i) => (
          <CardPaymentMethod
            mode="display"
            key={i}
            data={e}
            onRemove={handleRemovePaymentMethod}
          />
        ))}
        <Button
          type="link"
          className="stepTAP--btnAdd"
          onClick={handleOpenModal}
        >
          <AiOutlinePlus /> Add
        </Button>
        <div className="stepTAP-error-message">
          {isEmptyPaymentMethods && 'Please select at least 1 payment method'}
        </div>

        <div className="stepTAP--label">Payment Time Limit</div>
        <Form.Item
          name="paymentTimeId"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Select className="stepTAP--timeLimit">
            {paymentTimes.map((p, i) => (
              <Option key={i} value={p.id}>
                {p.timeLimit}m
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <ModalSelectPaymentMethod
        visible={modalSelectPaymentMethod}
        handleCancel={handleCloseModal}
        handleSelect={handleSelectPayment}
        paymentMethodSelected={paymentMethodIDSelected}
      />
      <SwitchStep next={handleNextStep} post={() => {}} />
    </Wrapper>
  );
}

export default StepTotalAndPayment;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pBackground};
  min-height: 400px;
  padding: 30px;

  .stepTAP {
    &--label {
      color: ${({ theme }) => theme.p2pGray};
      padding-bottom: 4px;
    }

    &--input {
      &-total {
        width: 100%;
        max-width: 620px;
      }

      &-order {
        width: 100%;
        /* max-width: 200px; */
      }
    }

    &--orderLimit {
      max-width: 620px;
      display: flex;
      justify-content: space-between;

      .ant-form-item {
        width: 48%;
      }

      .ant-form-item-explain-error {
        /* width: 200px; */
        font-size: 12px;
      }
    }

    &--dash {
      border-top: 1px dashed ${({ theme }) => theme.p2pBorder};
      margin-bottom: 30px;
    }

    &--btnAdd {
      height: 33px;
      width: 104px;
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
    }

    &--timeLimit {
      width: 150px;
    }

    &-error-message {
      font-size: 12px;
      color: #ff4d4f;
      height: 40px;
    }
  }
`;

const ExtraTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 620px;
  height: 18px;

  font-size: 12px;
`;
