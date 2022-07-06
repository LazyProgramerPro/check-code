import { List, Tabs, Tag, Typography } from 'antd';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';
import { tabP2PUserCenterServices } from 'services/tabP2PUserCenterServices';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { MdError } from 'react-icons/md';
import openNotification from 'app/components/NotificationAntd';

const ContentP2PUserCenter = () => {
  const { TabPane } = Tabs;
  const { getUserPaymentByToken, getAllPaymentMethod, deletePaymentMethod } =
    tabP2PUserCenterServices;
  const [showModalAddPM, setShowModalAddPM] = useState(false);
  const [listPaymentMethod, setListPaymentMethod] = useState<any>([]);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [listUserPayments, setListUserPayments] = useState<any>([]);
  const [deleteId, setDeleteId] = useState(0);

  const findAllUserPayments = () => {
    getUserPaymentByToken()
      .then(res => {
        if (res.data.rc === 0) {
          setListUserPayments(res.data.rows);
        } else console.log(res);
      })
      .catch(res => console.log(res));
  };

  const findAllPM = () => {
    getAllPaymentMethod()
      .then(res => {
        if (res.data.rc === 0) {
          setListPaymentMethod(res.data.rows);
        } else console.log(res);
      })
      .catch(res => console.log(res));
  };

  const handelDelete = () => {
    if (deleteId) {
      deletePaymentMethod(deleteId)
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Deleted this payment method');
            findAllUserPayments();
            setShowModalDelete(false);
            setDeleteId(0);
          } else openNotification('Error', res.data.rd);
        })
        .catch(() => openNotification('Error', 'Something went wrong!'));
    }
  };

  useEffect(() => {
    findAllUserPayments();
    findAllPM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="P2P Payment Method"
            key="1"
            className="tabPaymentMethod"
            id="tabPaymentMethod"
          >
            <h6 className="title">P2P Payment Methods</h6>
            <Row className="desc">
              <Col xxl={9} md={7} sm={12}>
                <p>
                  P2P payment methods: When you sell cryptocurrencies, the
                  payment method added will be displayed to buyer as options to
                  accept payment, please ensure that the account owner’s name is
                  consistent with your verified name on Binance. You can add up
                  to 20 payment methods.
                </p>
              </Col>

              <Col xxl={3} md={5} sm={12}>
                <Button
                  className="btnAddPM"
                  onClick={() => setShowModalAddPM(true)}
                >
                  <BiPlus className="plusIcon" /> Add a payment method
                </Button>
              </Col>
            </Row>

            <List
              className="listUserPayment"
              itemLayout="horizontal"
              pagination={{
                pageSize: 3,
              }}
              dataSource={listUserPayments}
              renderItem={(item: any, index: any) => (
                <List.Item>
                  <div className="headerItem">
                    <Tag
                      key={index}
                      color={item?.paymentMethod?.colorCode}
                      className="tagPaymentMethod"
                    >
                      {item?.paymentMethod?.name}
                    </Tag>
                    <div className="action">
                      <Link to={`/payment/Edit/${item?.id}`}>Edit</Link>
                      <span
                        onClick={() => {
                          setShowModalDelete(true);
                          setDeleteId(item?.id);
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>

                  <Row className="contentItem">
                    {item?.paymentMethod?.name === 'Internet Banking' ? (
                      <>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Name: <p className="PMdesc">{item?.fullName}</p>
                        </Col>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Bank account number:{' '}
                          <p className="PMdesc">{item?.accountNumber}</p>
                        </Col>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Bank name: <p className="PMdesc">{item?.bankName}</p>
                        </Col>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Account opening branch:{' '}
                          <p className="PMdesc">{item?.note}</p>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Name: <p className="PMdesc">{item?.fullName}</p>
                        </Col>
                        <Col className="infoPM" xxl={3} md={6} sm={6} xs={12}>
                          Mobile phone:{' '}
                          <p className="PMdesc">{item?.mobilePhone}</p>
                        </Col>
                      </>
                    )}
                  </Row>
                </List.Item>
              )}
            ></List>
          </TabPane>
          <TabPane tab="Feedback" key="2" className="tabPaymentMethod">
            <h6 className="title">Feedback</h6>
            <h3>0.00%</h3>
            <p>0 reviews</p>
            <Tabs defaultActiveKey="1" className="tabReviews">
              <TabPane tab="All" key="1">
                <List dataSource={[]} />
              </TabPane>
              <TabPane tab="Positive" key="2">
                <List dataSource={[]} />
              </TabPane>
              <TabPane tab="Nagative" key="3">
                <List dataSource={[]} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
        <ModalAddPayemnt
          centered
          show={showModalAddPM}
          onHide={() => setShowModalAddPM(false)}
        >
          <Modal.Header closeButton>Select payment method</Modal.Header>
          <Modal.Body>
            <h6>Recommand payment method</h6>
            <Tag className="rcmTag">
              <Link
                to={`/payment/Add/${
                  listPaymentMethod?.find(pm => pm.name === 'Internet Banking')
                    ?.name
                }`}
              >
                <img
                  src={
                    listPaymentMethod?.find(
                      pm => pm.name === 'Internet Banking',
                    )?.icon
                  }
                  alt="#"
                />{' '}
                {
                  listPaymentMethod?.find(pm => pm.name === 'Internet Banking')
                    ?.name
                }
              </Link>
            </Tag>

            <h6>All payment method</h6>
            <div className="allMT">
              {listPaymentMethod?.map((pm: any, index: any) => (
                <Link
                  to={`/payment/Add/${pm.name}`}
                  className="pmTagContain"
                  key={index}
                >
                  <Tag>
                    <img src={pm?.icon} alt="#" /> {pm.name}
                  </Tag>
                </Link>
              ))}
            </div>
          </Modal.Body>
        </ModalAddPayemnt>
      </div>
      <ModalDelete
        show={showModalDelete}
        onHide={() => {
          setShowModalDelete(false);
          setDeleteId(0);
        }}
        centered
      >
        <GrClose
          className="closeIcon"
          onClick={() => {
            setShowModalDelete(false);
            setDeleteId(0);
          }}
        />
        <Modal.Body>
          <MdError className="warningIcon" />
          <Typography.Title level={4} className="modelDeleteTitle">
            Are you sure you want to delete this payment method ?
          </Typography.Title>
          <div className="btnModal">
            <Button
              variant="light"
              className="btnCancel"
              onClick={() => {
                setShowModalDelete(false);
                setDeleteId(0);
              }}
            >
              Cancel
            </Button>
            <Button className="btnExit" onClick={() => handelDelete()}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalDelete>
    </Wrapper>
  );
};

export default ContentP2PUserCenter;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.whiteSmokeColor};

  .ant-tabs-nav {
    padding-top: 20px !important;
    font-weight: bold;

    .ant-tabs-tab-btn {
      font-size: 18px;
    }
  }
  .tabPaymentMethod {
    margin: 20px 0;
    background-color: ${({ theme }) => theme.p2pBackground};
    padding: 20px;
    border-radius: 5px;

    .title {
      margin-top: 20px;
      margin-bottom: 30px;
      font-weight: bold;
    }

    .desc {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      button {
        /* margin-left: 100px; */
        height: 45px;
        width: 100%;
        align-items: right;
        background-color: ${({ theme }) => theme.whiteSmokeColor};
        color: ${({ theme }) => theme.brightBlackColor};
        font-size: 15px;
        border: none;
        transition: all 0.25s linear;

        &:focus {
          box-shadow: none;
        }
        &:hover {
          opacity: 0.9;
        }

        .plusIcon {
          font-size: 20px;
          transform: translateY(-2px);
        }
      }

      p {
        color: ${({ theme }) => theme.grayColor};
      }
    }

    .listUserPayment {
      margin-top: 50px;

      .ant-list-item {
        padding: 0;
        border: 1px solid ${({ theme }) => theme.brightGrayColor} !important;
        border-radius: 5px;
        margin-bottom: 30px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: all 0.25s linear;

        &:hover {
          box-shadow: 0px 2px 5px 2px ${({ theme }) => theme.brightGrayColor};
        }

        .headerItem {
          background-color: ${({ theme }) => theme.whiteSmokeColor};
          padding: 15px 20px;

          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .contentItem {
          padding: 25px 20px 15px;
          width: 100%;

          .infoPM {
            margin-bottom: 0;
            color: ${({ theme }) => theme.brightGrayColor};

            .PMdesc {
              color: ${({ theme }) => theme.p2pText};
            }
          }
        }
        .action {
          font-weight: bold;
          a {
            color: inherit;
            text-decoration: none;
          }
          span {
            margin-left: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .tabReviews {
      .ant-tabs-nav {
        padding: 0 !important;
      }

      .ant-tabs-nav-wrap {
        background-color: ${({ theme }) => theme.whiteSmokeColor};
        padding: 0 20px;
      }
      .ant-tabs-tab-btn {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
`;

const ModalAddPayemnt = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .modal-dialog {
    max-width: 100vw !important;
  }
  .modal-content {
    width: 400px;
    max-width: 96%;
    display: block;
    margin: 0 auto;
  }
  .modal-header {
    font-weight: bold;
    .btn-close {
      &:focus {
        box-shadow: none;
      }

      transform: translateY(-2px);
    }
  }

  .modal-body {
    padding: 20px;

    a {
      text-decoration: none;
    }

    h6 {
      margin: 0;
    }

    .allMT {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .pmTagContain {
      width: 50%;
      margin-bottom: 10px;
    }

    .rcmTag {
      margin: 20px 0 30px;
    }

    .ant-tag {
      padding: 3px 15px;
      cursor: pointer;
      transition: all 0.25s linear;

      &:hover {
        opacity: 0.6;
      }

      img {
        width: 20px;
        border-radius: 2px;
        margin-right: 10px;
        margin-bottom: 1px;
      }
    }
  }
`;

const ModalDelete = styled(Modal)`
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

  .modelDeleteTitle {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
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
    margin-top: 10px;
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
