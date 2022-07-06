import { Form, Input, Typography } from 'antd';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RiErrorWarningFill } from 'react-icons/ri';
import { tabP2PService } from 'services/tabP2PServices';
import { useEffect, useState } from 'react';
import { tabPaymentServices } from 'services/tabPaymentServices';
import openNotification from 'app/components/NotificationAntd';
import { GrClose } from 'react-icons/gr';
import { MdError } from 'react-icons/md';
import { useForm } from 'antd/lib/form/Form';
const PaymentP2PContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { addPayment, getPaymentById, updatePayment } = tabPaymentServices;

  const [paymentMethod, setPaymentMethod] = useState<any>({});
  const [pmEdit, setPmEdit] = useState<any>();
  const [showModalExit, setShowModalExit] = useState(false);

  const { getListPayments } = tabP2PService;

  const handleAddPM = value => {
    if (params?.pm === 'Internet Banking') {
      addPayment({
        accountNumber: value?.accountNumber,
        bankName: value?.bankName,
        fullName: value?.fullName,
        note: value?.note || 'Unknow!',
        bankBranch: 'Unknow!',
        email: 'Unknow!',
        mobilePhone: 'Unknow!',
        paymentMethodId: paymentMethod?.id,
        recommendedTransferRemarks: 'Unknow!',
      })
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Added new payment method');
            navigate('/p2pUserCenter');
          } else {
            openNotification('Error', res.data.rd);
          }
        })
        .catch(() => openNotification('Error', 'Something went wrong!'));
    } else {
      addPayment({
        accountNumber: 'Unknow!',
        bankName: 'Unknow!',
        fullName: value?.fullName,
        note: value?.note || 'Unknow!',
        bankBranch: 'Unknow!',
        email: value?.email,
        mobilePhone: value?.mobilePhone,
        paymentMethodId: paymentMethod?.id,
        recommendedTransferRemarks: 'Unknow!',
      })
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Added new payment method');
            navigate('/p2pUserCenter');
          } else {
            openNotification('Error', res.data.rd);
          }
        })
        .catch(() => openNotification('Error', 'Something went wrong!'));
    }
  };

  const [form] = useForm();
  const handleCancel = () => {
    setShowModalExit(true);
  };

  const getPaymentMethod = () => {
    getListPayments().then(res => {
      if (res.data.rc === 0) {
        setPaymentMethod(res.data.rows.find(pm => pm.name === params?.pm));
      }
    });
  };

  const getPaymentMethodById = () => {
    getPaymentById(params?.pm).then(res => {
      if (res.data.rc === 0) {
        setPmEdit(res.data.item);
      }
    });
  };

  const handleEdit = value => {
    if (pmEdit?.paymentMethod?.name === 'Internet Banking') {
      updatePayment(params?.pm, {
        accountNumber: value?.accountNumber,
        bankName: value?.bankName,
        fullName: value?.fullName,
        note: value?.note || 'Unknow!',
        bankBranch: 'Unknow!',
        email: 'Unknow!',
        mobilePhone: 'Unknow!',
        paymentMethodId: pmEdit?.paymentMethod?.id,
        recommendedTransferRemarks: 'Unknow!',
      })
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Edited this payment method');
            navigate('/p2pUserCenter');
          } else {
            openNotification('Error', res.data.rd);
          }
        })
        .catch(() => openNotification('Error', 'Something went wrong!'));
    } else {
      updatePayment(params?.pm, {
        accountNumber: 'Unknow!',
        bankName: 'Unknow!',
        fullName: value?.fullName,
        note: value?.note || 'Unknow!',
        bankBranch: 'Unknow!',
        email: value?.email,
        mobilePhone: value?.mobilePhone,
        paymentMethodId: pmEdit?.paymentMethod?.id,
        recommendedTransferRemarks: 'Unknow!',
      })
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Edited this payment method');
            navigate('/p2pUserCenter');
          } else {
            openNotification('Error', res.data.rd);
          }
        })
        .catch(() => openNotification('Error', 'Something went wrong!'));
    }
  };

  useEffect(() => {
    if (params?.action === 'Edit') {
      getPaymentMethodById();
    } else {
      getPaymentMethod();
      getPaymentMethodById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pmEdit]);

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey={''} />
      <div className="container title">
        <Typography.Title level={3} className="title">
          {params?.action} payment method
        </Typography.Title>
      </div>
      <div className="backgroundContent">
        <Row className="bgFormAddPM">
          <Col className="formAddPM" xxl={4} md={6} sm={10}>
            {params?.action === 'Edit' ? (
              <Typography.Title level={4}>
                {pmEdit?.paymentMethod?.name}
              </Typography.Title>
            ) : (
              <Typography.Title level={4}>{params?.pm}</Typography.Title>
            )}
            <Form
              onFinish={params?.action === 'Add' ? handleAddPM : handleEdit}
              form={form}
            >
              <Form.Item
                label="Name"
                labelAlign="left"
                name="fullName"
                initialValue={params?.action === 'Edit' ? pmEdit?.fullName : ''}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ]}
                requiredMark={'optional'}
              >
                <Input placeholder="Please enter your name" />
              </Form.Item>

              {params?.action === 'Add' && params?.pm === 'Internet Banking' && (
                <>
                  <Form.Item
                    label="Bank account number"
                    labelAlign="left"
                    name="accountNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your bank account number',
                      },
                    ]}
                    requiredMark={'optional'}
                  >
                    <Input placeholder="Please enter your bank account number" />
                  </Form.Item>

                  <Form.Item
                    label="Bank name"
                    labelAlign="left"
                    name="bankName"
                    rules={[
                      {
                        required: true,
                        message: 'Enter the name of your bank',
                      },
                    ]}
                    requiredMark={'optional'}
                  >
                    <Input placeholder="Enter the name of your bank" />
                  </Form.Item>

                  <Form.Item
                    label="Account opening branch (Optional)"
                    labelAlign="left"
                    name="note"
                  >
                    <Input placeholder="Enter your bank infomation" />
                  </Form.Item>
                </>
              )}
              {params?.action === 'Edit' &&
                pmEdit?.paymentMethod?.name === 'Internet Banking' && (
                  <>
                    <Form.Item
                      label="Bank account number"
                      labelAlign="left"
                      name="accountNumber"
                      initialValue={pmEdit?.accountNumber}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your bank account number',
                        },
                      ]}
                      requiredMark={'optional'}
                    >
                      <Input placeholder="Please enter your bank account number" />
                    </Form.Item>

                    <Form.Item
                      label="Bank name"
                      labelAlign="left"
                      name="bankName"
                      initialValue={pmEdit?.bankName}
                      rules={[
                        {
                          required: true,
                          message: 'Enter the name of your bank',
                        },
                      ]}
                      requiredMark={'optional'}
                    >
                      <Input placeholder="Enter the name of your bank" />
                    </Form.Item>

                    <Form.Item
                      label="Account opening branch (Optional)"
                      labelAlign="left"
                      name="note"
                      initialValue={pmEdit?.note}
                    >
                      <Input placeholder="Enter your bank infomation" />
                    </Form.Item>
                  </>
                )}

              {params?.action === 'Add' && params?.pm !== 'Internet Banking' && (
                <>
                  <Form.Item
                    label="Phone number"
                    labelAlign="left"
                    name="mobilePhone"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your phone number',
                      },
                    ]}
                    requiredMark={'optional'}
                  >
                    <Input placeholder="Please enter your phone number" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    labelAlign="left"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email',
                      },
                    ]}
                    requiredMark={'optional'}
                  >
                    <Input placeholder="Please enter your email" />
                  </Form.Item>
                </>
              )}

              {params?.action === 'Edit' &&
                pmEdit?.paymentMethod?.name !== 'Internet Banking' && (
                  <>
                    <Form.Item
                      label="Phone number"
                      labelAlign="left"
                      name="mobilePhone"
                      initialValue={pmEdit?.mobilePhone}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your phone number',
                        },
                      ]}
                      requiredMark={'optional'}
                    >
                      <Input placeholder="Please enter your phone number" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      labelAlign="left"
                      initialValue={pmEdit?.email}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your email',
                        },
                      ]}
                      requiredMark={'optional'}
                    >
                      <Input placeholder="Please enter your email" />
                    </Form.Item>
                  </>
                )}

              <div className="warning">
                <p className="warning__title">
                  <RiErrorWarningFill className="warning__icon" />
                  Warning !
                </p>
                <p className="warning__content">
                  Please make sure you add your bank card number for instant
                  payments. Do not include details of other banks or payment
                  methods. You must add the payment details of the selected
                  bank.
                </p>
                <p></p>
              </div>
              <div className="tips">
                <Typography.Title level={5}>Tips</Typography.Title>
                <Typography>
                  Tips: When you sell your cryptocurrency, the added payment
                  method will be shown to the buyer during the transaction. To
                  accept cash transfer, please make sure the information is
                  correct.
                </Typography>
              </div>
              <div className="btnForm">
                <Button
                  className="btnCancel"
                  onClick={handleCancel}
                  variant="light"
                >
                  Cancel
                </Button>
                <Button type="submit" className="btnAdd">
                  {params?.action}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <ModalExit
        show={showModalExit}
        onHide={() => setShowModalExit(false)}
        centered
      >
        <GrClose
          className="closeIcon"
          onClick={() => setShowModalExit(false)}
        />
        <Modal.Body>
          <MdError className="warningIcon" />
          <Typography.Title level={4}>Confirm Exit ?</Typography.Title>
          <Typography className="subTitle">
            Your changes will not be saved
          </Typography>
          <div className="btnModal">
            <Button
              variant="light"
              className="btnCancel"
              onClick={() => setShowModalExit(false)}
            >
              Cancel
            </Button>
            <Button
              className="btnExit"
              onClick={() => navigate('/p2pUserCenter')}
            >
              Exit
            </Button>
          </div>
        </Modal.Body>
      </ModalExit>
    </Wrapper>
  );
};

export default PaymentP2PContainer;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pBackground};

  .title {
    text-transform: initial;
    padding: 10px 15px;
    margin-bottom: 0;
  }

  .backgroundContent {
    padding: 15px 30px;
    background-color: ${({ theme }) => theme.whiteSmokeColor};

    .bgFormAddPM {
      border-radius: 5px;
      margin: 0 auto;
      background-color: ${({ theme }) => theme.p2pBackground};
      padding: 35px 0;
    }

    .formAddPM {
      margin: 0 auto;
    }
    .ant-form {
      margin-top: 10px;

      .ant-row {
        display: flex;
        flex-direction: column;

        .ant-form-item-explain-error {
          font-size: 13px;
        }

        .ant-input {
          border: none;
          border-bottom: 1px solid ${({ theme }) => theme.whiteSmokeColor};
          padding-left: 0;
          padding-right: 0;
          border-radius: 0;

          &:focus {
            box-shadow: none;
            border-color: ${({ theme }) => theme.primary};
          }
          :-webkit-autofill {
            box-shadow: 0 0 0 30px white inset !important;
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }
        }

        label {
          color: ${({ theme }) => theme.brightGrayColor};
          margin-bottom: 4px;
          /* margin-top: 10px; */

          &::after {
            display: none;
          }
        }
      }

      .tips {
        padding-top: 30px;
      }

      .warning {
        background-color: ${({ theme }) => theme.primaryBlur};
        border-radius: 5px;
        padding: 10px 10px 1px 40px;

        &__title {
          position: relative;
          font-weight: bold;
          margin-bottom: 5px;
        }

        &__icon {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-150%, 4px);
          color: ${({ theme }) => theme.primary};
        }
      }
      .btnForm {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .btn {
          width: 49%;
          transition: all 0.25s linear;
          &:focus {
            box-shadow: none;
          }

          &:hover {
            opacity: 0.8;
          }
        }

        .btnAdd {
          background-color: ${({ theme }) => theme.primary};
          border: none;
        }

        .btnCancel {
          border: 1px solid ${({ theme }) => theme.whiteSmokeColor};
        }
      }
    }
  }
`;

const ModalExit = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};
  text-align: center;

  .closeIcon {
    display: block;
    margin-left: auto;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    opacity: 0.5;
  }

  .warningIcon {
    font-size: 90px;
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .subTitle {
    color: ${({ theme }) => theme.brightGrayColor};
    margin-bottom: 20px;
  }

  .btnModal {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 48%;
    transition: all 0.25s linear;
    &:focus {
      box-shadow: none;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .btnExit {
    background-color: ${({ theme }) => theme.primary};
    border: none;
  }
`;
