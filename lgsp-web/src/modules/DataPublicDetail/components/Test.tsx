import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Modal, InputNumber, Icon } from 'antd';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getTest } from '../redux/actions/get_test';
import { getSandbox } from '../redux/actions/get_sandbox';
import { FormComponentProps } from 'antd/lib/form';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { showUpdateTest, updateTest } from '../redux/actions/update_test';
import { GetTestParams, UpdateTestParam } from '../redux/models';
import TextArea from 'antd/lib/input/TextArea';
import { Typography } from 'antd';
const ViewTest = styled.div`
  .infor {
    .ant-col-md-8 {
      margin-left: 48px;
    }
    .btn {
      margin-top: 20px;
      margin-bottom: 18px;
    }
    .btn1 {
      margin-top: 20px;
      margin-bottom: 18px;
      margin-left: 23px;
    }
  }
  .ant-form-item label {
    color: rgba(0, 0, 0, 0.65);
  }
  .ant-form .ant-form-item-label {
    margin-bottom: 5px;
    margin-top: -12px;
  }
  .ant-row {
    border-bottom: none;
    border-right: none;
    display: flex;
    flex-direction: column;
  }
  .ant-form {
    margin-top: 23px;
  }
  .styleInput {
    height: 40px;
    display: flex;
    align-items: center;
    width: 365px;
  }
`;
const ButtonIcon = styled.div`
  border: none;
  margin-right: -16px;
  margin-top: 12px;
  :hover {
    .anticon {
      color: #1890ff;
    }
  }
`;
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  getTestState: rootState.dataPublicDetail.getTestState,
  getSandboxState: rootState.dataPublicDetail.getSandboxState,
  updateState: rootState.dataPublicDetail.updateTestState,
});
const connector = connect(mapState, { getTest, getSandbox, showUpdateTest, updateTest });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function Test(props: IProps) {
  const { getTestState, getTest, getSandboxState, getSandbox, updateState, showUpdateTest, updateTest } = props;
  const params: any = useParams();
  const [apiId] = useState<string>(params.id);
  useEffect(() => {
    let params: GetTestParams = {
      ...getTestState.params,
      apiId: apiId,
    };
    getTest(params);
  }, []);

  const [visible, setVisible] = useState(false);
  const { getFieldDecorator, resetFields } = props.form;
  const show = () => {
    getSandbox(params);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  const [visibleshow, setVisibleShow] = useState(false);
  const showdialog = () => {
    setVisibleShow(true);
  };
  const closedialog = () => {
    setVisibleShow(false);
  };
  const onUpdateTest = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateTestParam = {
          applicationTokenExpiryTime: values.applicationTokenExpiryTime,
          expiryTime: values.expiryTime,
          refreshTime: values.refreshTime,
          userAccessTokenExpiryTime: values.userAccessTokenExpiryTime,
        };
        updateTest(updateParam);
        getTest(params);
      }
    });
  };

  return (
    <ViewTest>
      <h3 className={'ContentTab'}>Đăng ký dùng dịch vụ chia sẻ</h3>
      <Row style={{ borderBottom: 'none' }}>
        <div className={'infor'}>
          <Col xs={24} md={8}>
            <p className={'title'}>Consumer Key</p>
            <Input value={`${getTestState.item?.consumerKey}`} maxLength={255} />
          </Col>
          <Col xs={24} md={8}>
            <p className={'title'}>Consumer Secret</p>
            <Input.Password
              placeholder="input password"
              value={`${getTestState.item?.consumerSecret}`}
              maxLength={255}
            />
          </Col>
        </div>
      </Row>
      <Row style={{ borderBottom: 'none' }}>
        <div className={'infor'} style={{ marginLeft: '50px' }}>
          <Col xs={24} md={5}>
            <Button className="btn" onClick={show}>
              Tạo mã truy cập dịch vụ
            </Button>
            <Modal
              title="Tạo mã truy cập dịch vụ"
              visible={visible}
              footer={null}
              onCancel={close}
              maskClosable={false}
            >
              <p style={{ color: '#232323', marginBottom: '5px' }}>Mã truy cập</p>
              {/* <Input value={`${getSandboxState?.item}`} /> */}
              <Row style={{ display: 'flex' }}>
                <TextArea value={`${getSandboxState.item?.accessToken}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getSandboxState.item?.accessToken || '');
                    }}
                  />
                </ButtonIcon>
              </Row>
              <p style={{ color: '#232323', marginTop: '10px' }}>
                Mã truy cập sẽ có hết hạn trong {getSandboxState?.item?.validityTime} giây
              </p>
              <Button onClick={close} style={{ marginLeft: '437px' }}>
                Đóng
              </Button>
            </Modal>
          </Col>
          <Col xs={24} md={5}>
            <Button className="btn1" onClick={showdialog}>
              CURL tạo mã truy cập dịch vụ
            </Button>
            <Modal
              title="Lấy CURL để tạo mã truy cập dịch vụ"
              visible={visibleshow}
              footer={null}
              onCancel={closedialog}
              maskClosable={false}
            >
              <p style={{ color: '#232323', marginBottom: '5px' }}>Câu lệnh cURL dùng cho “Password Grant Type”</p>
              <Row style={{ display: 'flex' }}>
                <TextArea value={`${getTestState.item?.password_grant_type}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getTestState.item?.password_grant_type || '');
                    }}
                  />
                </ButtonIcon>
              </Row>

              <p style={{ color: '#232323', marginTop: '10px', marginBottom: '5px' }}>
                Câu lệnh cURL dùng cho “Client Credentials grant type”
              </p>
              <Row style={{ display: 'flex' }}>
                <TextArea value={`${getTestState.item?.client_credential}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getTestState.item?.client_credential || '');
                    }}
                  />
                </ButtonIcon>
              </Row>

              <Button onClick={closedialog} style={{ marginLeft: '437px', marginTop: '10px' }}>
                Đóng
              </Button>
            </Modal>
          </Col>
        </div>
      </Row>
      <h3 className={'ContentTab'}>Thông số cấu hình</h3>
      <div className={'parameter'}>
        <Form layout="vertical">
          <Form.Item label="Thời gian truy cập dịch vụ chia sẻ">
            {getFieldDecorator('applicationTokenExpiryTime', {
              initialValue: getTestState.item?.applicationTokenExpiryTime,
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
              ],
            })(
              <InputNumber
                className="styleInput"
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />,
            )}
          </Form.Item>

          <Form.Item label="Thời gian hết hạn User Access Token">
            {getFieldDecorator('userAccessTokenExpiryTime', {
              initialValue: getTestState.item?.userAccessTokenExpiryTime,
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
              ],
            })(
              <InputNumber
                className="styleInput"
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />,
            )}
          </Form.Item>

          <Form.Item label="Thời gian hết hạn Refresh Token">
            {getFieldDecorator('refreshTime', {
              initialValue: getTestState.item?.refreshTime,
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
              ],
            })(
              <InputNumber
                className="styleInput"
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />,
            )}
          </Form.Item>

          <Form.Item label="Thời gian hết hạn Id Token">
            {getFieldDecorator('expiryTime', {
              initialValue: getTestState.item?.expiryTime,
              rules: [
                {
                  required: true,
                  message: 'Đây là trường bắt buộc nhập',
                },
              ],
            })(
              <InputNumber
                className="styleInput"
                min={1}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />,
            )}
          </Form.Item>
        </Form>

        <Button htmlType="submit" type="primary" className={'styleButton'} onClick={onUpdateTest}>
          Lưu
        </Button>
      </div>
      {props.updateState.loading || props.getSandboxState.loading || props.getTestState.loading ? <Loading /> : null}
    </ViewTest>
  );
}

export default connector(Form.create<IProps>()(Test));
