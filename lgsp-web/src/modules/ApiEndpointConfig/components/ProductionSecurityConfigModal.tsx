import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import { OAuthConfigurationEntity } from '../redux/models';
import { EEnvironmentType, ESecurityType } from '../../GroupApiEndpoint/models';
import { showSecurityForm } from '../redux/actions/show_configuration_form';
import Password from 'antd/es/input/Password';
import { changeProductionSecurity, changeSandboxSecurity } from '../redux/actions/update_endpoint_configuration';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { validateUrl, validateNameConnect, validateClientID } from 'src/constants/common';
const mapStateToProps = (rootState: RootState) => ({
  showState: rootState.apiEndpointConfiguration.showState,
  getState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
});

const conn = connect(mapStateToProps, { showSecurityForm, changeProductionSecurity, changeSandboxSecurity });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const ProductionSecurityConfigModal = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const [typeSecurity, setTypeSecurity] = useState<string>(ESecurityType.NONE);

  const [spanCol, setSpanCol] = useState(12);
  const [spanWidth, setSpanWidth] = useState(45);

  useEffect(() => {
    setTypeSecurity(props.updateState?.data?.productionSecurity?.grantType || ESecurityType.NONE);
    if (props.updateState?.data?.productionSecurity?.grantType === ESecurityType.NONE) {
      setSpanCol(24);
      setSpanWidth(45);
    } else {
      setSpanCol(12);
      setSpanWidth(90);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showState.productionSecurityShow]);

  const handleTypeChange = (value: string) => {
    setTypeSecurity(value);
    if (value === ESecurityType.NONE) {
      setSpanCol(24);
      setSpanWidth(45);
    } else {
      setSpanCol(12);
      setSpanWidth(90);
    }
  };

  const onClickSubmitBtn = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: OAuthConfigurationEntity;
        const type = values.type;
        if (type === ESecurityType.CLIENT_CREDENTIAL) {
          param = {
            grantType: type,
            tokenUrl: values.token,
            clientId: values.clientId,
            clientSecret: values.clientSecret,
          };
        } else if (type === ESecurityType.PASSWORD) {
          param = {
            grantType: type,
            tokenUrl: values.token,
            clientId: values.clientId,
            clientSecret: values.clientSecret,
            username: values.username,
            password: values.password,
          };
        } else {
          param = {
            grantType: type,
          };
        }
        props.changeProductionSecurity(param);
        NotificationSuccess('Thành công', 'Cập nhật Endpoint thành công');
        props.showSecurityForm(false, EEnvironmentType.PROD);
      }
    });
  };

  const onClickCancelBtn = (e: any) => {
    props.showSecurityForm(false, EEnvironmentType.PROD);
    resetFields();
  };

  //Validate
  const validUrl = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL không phù hợp');
    } else {
      props.form.setFields({
        token: {
          value: text.trim(),
        },
      });
    }
    return callback();
  };

  const pasteURL = () => {
    const valueURL = props.form.getFieldValue('token');
    props.form.setFields({
      token: {
        value: valueURL.trim(),
      },
    });
  };

  const validId = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateClientID(text);
    if (!isValid) {
      return callback('ClientID không phù hợp');
    } else {
      props.form.setFields({
        clientId: {
          value: text.trim(),
        },
      });
    }
    return callback();
  };

  const pasteId = () => {
    const valueURL = props.form.getFieldValue('clientId');
    props.form.setFields({
      clientId: {
        value: valueURL.trim(),
      },
    });
  };

  const validSecret = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateClientID(text);
    if (!isValid) {
      return callback('Client Secret không phù hợp');
    } else {
      props.form.setFields({
        clientSecret: {
          value: text.trim(),
        },
      });
    }
    return callback();
  };

  const pasteSecret = () => {
    const valueURL = props.form.getFieldValue('clientSecret');
    props.form.setFields({
      clientSecret: {
        value: valueURL.trim(),
      },
    });
  };

  const validateUsername = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    } else {
      props.form.setFields({
        username: {
          value: text.trim(),
        },
      });
      return true;
    }
  };

  const pasteUsername = () => {
    const valueUsername = props.form.getFieldValue('username');
    props.form.setFields({
      username: {
        value: valueUsername.trim() + ' ',
      },
    });
  };

  const validatePassword = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }

    const isValid: boolean = validateClientID(text);
    if (!isValid) {
      return callback('Password không phù hợp');
    } else {
      props.form.setFields({
        clientSecret: {
          value: text.trim(),
        },
      });
    }
    return callback();
  };

  const pastePassword = () => {
    const valuePassword = props.form.getFieldValue('password');
    props.form.setFields({
      password: {
        value: valuePassword.trim(),
      },
    });
  };

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cấu hình bảo mật Endpoint OAuth 2.0"
      visible={props.showState.productionSecurityShow}
      centered={true}
      width="500px"
      onCancel={() => {
        resetFields();
        props.showSecurityForm(false, EEnvironmentType.PROD);
      }}
      footer={''}
    >
      <Form>
        <Row gutter={8}>
          {typeSecurity === ESecurityType.NONE ? (
            <Col span={24}>
              <Form.Item label="Loại">
                {getFieldDecorator('type', {
                  initialValue: props.showState.securityData?.grantType || ESecurityType.NONE,
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                })(
                  <Select showSearch optionFilterProp="children" onChange={handleTypeChange} allowClear={true}>
                    <Select.Option value={ESecurityType.NONE}>Không</Select.Option>
                    <Select.Option value={ESecurityType.CLIENT_CREDENTIAL}>Client Credentials</Select.Option>
                    <Select.Option value={ESecurityType.PASSWORD}>Resource Owner Password</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          ) : (
            <div>
              <Col span={12}>
                <Form.Item label="Loại">
                  {getFieldDecorator('type', {
                    initialValue: props.showState.securityData?.grantType || ESecurityType.NONE,
                    rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
                  })(
                    <Select showSearch optionFilterProp="children" onChange={handleTypeChange} allowClear={true}>
                      <Select.Option value={ESecurityType.NONE}>Không</Select.Option>
                      <Select.Option value={ESecurityType.CLIENT_CREDENTIAL}>Client Credentials</Select.Option>
                      <Select.Option value={ESecurityType.PASSWORD}>Resource Owner Password</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Token URL">
                  {getFieldDecorator('token', {
                    initialValue: props.showState.securityData?.tokenUrl || '',
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validUrl }],
                  })(<Input placeholder="Nhập token URL" maxLength={1000} onPaste={pasteURL} />)}
                </Form.Item>
              </Col>
            </div>
          )}
        </Row>

        {typeSecurity === ESecurityType.NONE ? null : (
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="ClientID">
                {getFieldDecorator('clientId', {
                  initialValue: props.showState.securityData?.clientId || '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validId }],
                })(<Input placeholder="Nhập clientId" maxLength={255} onPaste={pasteId} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Client Secret">
                {getFieldDecorator('clientSecret', {
                  initialValue: props.showState.securityData?.clientSecret || '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validSecret }],
                })(
                  <Input.Password
                    autoComplete="new-password"
                    placeholder="Nhập client secret"
                    maxLength={255}
                    onPaste={pasteSecret}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        )}
        {typeSecurity === ESecurityType.PASSWORD ? (
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  initialValue: props.showState.securityData?.username || '',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateUsername }],
                  validateTrigger: 'onBlur',
                })(<Input placeholder="Nhập username" maxLength={255} onPaste={pasteUsername} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: props.showState.securityData?.password || '',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePassword }],
                  validateTrigger: 'onBlur',
                })(
                  <Password
                    placeholder="Nhập password"
                    visibilityToggle={false}
                    maxLength={255}
                    onPaste={pastePassword}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button className="mr-3 " onClick={onClickCancelBtn}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" onClick={onClickSubmitBtn}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default conn(Form.create<IProps>()(ProductionSecurityConfigModal));
