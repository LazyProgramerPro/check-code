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
import { validateClientID, validateUrl } from 'src/constants/common';

const mapStateToProps = (rootState: RootState) => ({
  showState: rootState.apiEndpointConfiguration.showState,
  getState: rootState.apiEndpointConfiguration.getState,
  updateState: rootState.apiEndpointConfiguration.updateState,
});

const conn = connect(mapStateToProps, { showSecurityForm, changeProductionSecurity, changeSandboxSecurity });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const SandboxSecurityConfigModal = (props: IProps) => {
  const { getFieldDecorator, resetFields } = props.form;

  const [typeSecurity, setTypeSecurity] = useState<string>(ESecurityType.NONE);

  const [spanCol, setSpanCol] = useState(12);
  const [spanWidth, setSpanWidth] = useState(45);

  useEffect(() => {
    setTypeSecurity(props.updateState?.data?.sandboxSecurity?.grantType || ESecurityType.NONE);
    if (props.updateState?.data?.sandboxSecurity?.grantType === ESecurityType.NONE) {
      setSpanCol(24);
      setSpanWidth(45);
    } else {
      setSpanCol(12);
      setSpanWidth(90);
    }
  }, [props.showState.sandboxSecurityShow, props.updateState]);

  const handleTypeChange = (value: string) => {
    setTypeSecurity(value);
    if (value == ESecurityType.NONE) {
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
        props.changeSandboxSecurity(param);
        NotificationSuccess('Th??nh c??ng', 'C???p nh???t Endpoint th??nh c??ng');
        props.showSecurityForm(false, EEnvironmentType.TEST);
      }
    });
  };

  const onClickCancelBtn = (e: any) => {
    props.showSecurityForm(false, EEnvironmentType.TEST);
    resetFields();
  };

  //Validate
  const validUrl = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateUrl(text);
    if (!isValid) {
      return callback('URL kh??ng ph?? h???p');
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
      return callback('ClientID kh??ng ph?? h???p');
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
      return callback('Client Secret kh??ng ph?? h???p');
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
      return callback('Password kh??ng ph?? h???p');
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
      maskClosable={false}
      title="C???u h??nh b???o m???t Endpoint OAuth 2.0"
      visible={props.showState.sandboxSecurityShow}
      centered={true}
      width="500px"
      onCancel={() => {
        resetFields();
        props.showSecurityForm(false, EEnvironmentType.TEST);
      }}
      footer={''}
    >
      <Form>
        <Row gutter={8}>
          {typeSecurity === ESecurityType.NONE ? (
            <Col span={24}>
              <Form.Item label="Lo???i">
                {getFieldDecorator('type', {
                  initialValue: props.showState.securityData?.grantType || ESecurityType.NONE,
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                })(
                  <Select showSearch optionFilterProp="children" onChange={handleTypeChange} allowClear={true}>
                    <Select.Option value={ESecurityType.NONE}>Kh??ng</Select.Option>
                    <Select.Option value={ESecurityType.CLIENT_CREDENTIAL}>Client Credentials</Select.Option>
                    <Select.Option value={ESecurityType.PASSWORD}>Resource Owner Password</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          ) : (
            <div>
              <Col span={12}>
                <Form.Item label="Lo???i">
                  {getFieldDecorator('type', {
                    initialValue: props.showState.securityData?.grantType || ESecurityType.NONE,
                    rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  })(
                    <Select showSearch optionFilterProp="children" onChange={handleTypeChange} allowClear={true}>
                      <Select.Option value={ESecurityType.NONE}>Kh??ng</Select.Option>
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
                    rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validUrl }],
                    validateTrigger: 'onBlur',
                  })(<Input placeholder="Nh???p token URL" maxLength={1000} onPaste={pasteURL} />)}
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
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validId }],
                  validateTrigger: 'onBlur',
                })(<Input placeholder="Nh???p clientId" maxLength={255} onPaste={pasteId} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Client Secret">
                {getFieldDecorator('clientSecret', {
                  initialValue: props.showState.securityData?.clientSecret || '',
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validSecret }],
                  validateTrigger: 'onBlur',
                })(
                  <Input.Password
                    autoComplete="new-password"
                    placeholder="Nh???p client secret"
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
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateUsername }],
                  validateTrigger: 'onBlur',
                })(<Input placeholder="Nh???p username" maxLength={255} onPaste={pasteUsername} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: props.showState.securityData?.password || '',
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validatePassword }],
                })(
                  <Password
                    placeholder="Nh???p password"
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
            H???y
          </Button>
          <Button type="primary" htmlType="submit" onClick={onClickSubmitBtn}>
            L??u
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default conn(Form.create<IProps>()(SandboxSecurityConfigModal));
