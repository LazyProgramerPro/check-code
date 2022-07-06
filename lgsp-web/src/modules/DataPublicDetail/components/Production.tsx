import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, Col, Icon, Input, Row, Modal, Form, InputNumber } from 'antd';
import { RootState } from 'src/redux/store';
import { connect, ConnectedProps } from 'react-redux';
import { getProduction } from '../redux/actions/get_production';
import { getToken } from '../redux/actions/get_token';
import { useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { showUpdateProduction, updateProduction } from '../redux/actions/update_production';
import { GetProductionParams, UpdateProductionParam } from '../redux/models';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const ViewProduction = styled.div`
  width: 100%;
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
  getProductionState: rootState.dataPublicDetail.getProductionState,
  getTokenState: rootState.dataPublicDetail.getTokenState,
  updateState: rootState.dataPublicDetail.updateProductionState,
});
const connector = connect(mapState, { getProduction, getToken, showUpdateProduction, updateProduction });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}
function Production(props: IProps) {
  const { getProductionState, getProduction, getTokenState, getToken, updateState, updateProduction } = props;

  const params: any = useParams();
  const [apiId] = useState<string>(params.id);
  useEffect(() => {
    let params: GetProductionParams = {
      ...getProductionState.params,
      apiId: apiId,
    };
    getProduction(params);
  }, []);

  // useEffect(() => {
  //   getToken(params);
  // }, []);

  const { getFieldDecorator, resetFields } = props.form;

  const [visible, setVisible] = useState(false);

  const show = () => {
    getToken(params);
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

  const onUpdateProduction = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const updateParam: UpdateProductionParam = {
          applicationTokenExpiryTime: values.applicationTokenExpiryTime,
          expiryTime: values.expiryTime,
          refreshTime: values.refreshTime,
          userAccessTokenExpiryTime: values.userAccessTokenExpiryTime,
        };
        updateProduction(updateParam);
        getProduction(params);
      }
    });
  };

  useEffect(() => {
    getProduction(params);
  }, []);

  return (
    <ViewProduction>
      <h3 className={'ContentTab'}>Đăng ký dùng dịch vụ chia sẻ</h3>
      <Row style={{ borderBottom: 'none' }}>
        <div className={'infor'}>
          <Col xs={24} md={8}>
            <p className={'title'}>Consumer Key</p>
            <Input value={`${getProductionState.item?.consumerKey}`} maxLength={255} />
          </Col>
          <Col xs={24} md={8}>
            <p className={'title'}>Consumer Secret</p>
            <Input.Password
              placeholder="input password"
              value={`${getProductionState.item?.consumerSecret}`}
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
              <Row style={{ display: 'flex' }}>
                <TextArea value={`${getTokenState.item?.accessToken}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getTokenState.item?.accessToken || '');
                    }}
                  />
                </ButtonIcon>
              </Row>

              <p style={{ color: '#232323', marginTop: '10px' }}>
                Mã truy cập sẽ có hết hạn trong {getTokenState.item?.validityTime} giây
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
                <TextArea value={`${getProductionState.item?.password_grant_type}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getProductionState.item?.password_grant_type || '');
                    }}
                  />
                </ButtonIcon>
              </Row>

              <p style={{ color: '#232323', marginTop: '10px', marginBottom: '5px' }}>
                Câu lệnh cURL dùng cho “Client Credentials grant type”
              </p>
              <Row style={{ display: 'flex' }}>
                <TextArea value={`${getProductionState.item?.client_credential}`} />
                <ButtonIcon>
                  <Icon
                    type="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(getProductionState.item?.client_credential || '');
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
              initialValue: getProductionState.item?.applicationTokenExpiryTime,
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
              initialValue: getProductionState.item?.userAccessTokenExpiryTime,
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
              initialValue: getProductionState.item?.refreshTime,
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
              initialValue: getProductionState.item?.expiryTime,
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

        <Button htmlType="submit" type="primary" className={'styleButton'} onClick={onUpdateProduction}>
          Lưu
        </Button>
      </div>

      {props.updateState.loading || getTokenState.loading || props.getProductionState.loading ? <Loading /> : null}
    </ViewProduction>
  );
}

export default connector(Form.create<IProps>()(Production));
