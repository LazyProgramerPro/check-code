import { Button, Col, Collapse, Form, Icon, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { paramsCreatePermission } from 'src/modules/Permissions/redux/service/models';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { Data, DataDetailParams, UpdateLDAPParams } from '../redux/models';
import { updateData } from '../redux/service/api';
import { detailData } from '../redux/actions/detail_data';
import { validateUrl, validateNameConnect, validateNormalString, validateUrlLDAP } from 'src/constants/common';
import { ConnectLDAPParams } from 'src/modules/ConfigurationLDAPCreate/redux/service/models';
import { connectLDAP } from 'src/modules/ConfigurationLDAPCreate/redux/service/apis';
const mapState = (rootState: RootState) => ({
  auth: rootState.auth.auth,
  detailState: rootState.dataLDAP.detailState,
});
const connector = connect(mapState, { detailData });
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function ConfigurationLDAPUpdate(props: IProps) {
  const initData: Data = {
    connectionName: '1',
    connectionPassword: '',
    connectionUrl: '',
    description: '',
    domainName: '',
    id: '',
    userListFilter: '',
    userSearchBase: '',
    userSearchFilter: '',
    usernameAttribute: '',
  };

  const [paramsUpdate, setParamsUpdate] = useState<Data>(initData);
  const { detailState, detailData } = props;
  const { getFieldDecorator } = props.form;
  const { Panel } = Collapse;
  const [loading, setLoading] = useState(false);
  const param: any = useParams();
  const history = useHistory();
  const [id] = useState<string>(param.id);
  const formItemLayout = {
    labelCol: { lg: { span: 24 }, xl: { span: 13 } },
    wrapperCol: { lg: { span: 24 }, xl: { span: 11 } },
  };

  useEffect(() => {
    let data: DataDetailParams = {
      id: id,
    };
    detailData(data);
  }, [detailData, id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const params: UpdateLDAPParams = {
          connectionName: values.connectionName,
          connectionPassword: values.connectionPassword,
          connectionUrl: values.connectionUrl,
          description: values.description,
          id: id,
          domainName: values.domainName,
          userListFilter: values.userListFilter,
          userSearchBase: values.userSearchBase,
          userSearchFilter: values.userSearchFilter,
          usernameAttribute: values.usernameAttribute,
        };
        updateData(params)
          .then(rs => {
            setLoading(false);

            if (rs.code === 0) {
              NotificationSuccess('Th??nh c??ng', 'K???t n???i th??ng tin LDAP th??nh c??ng ');
              history.push('/configuration-ldap');
              return;
            }

            NotificationError('Th???t b???i', rs.message);
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Th???t b???i', err.message);
          });
      }
    });
  };

  const handleConnect = (e: any) => {
    e.preventDefault();
    props.form.validateFields(
      [
        'connectionName',
        'connectionPassword',
        'connectionUrl',
        'userListFilter',
        'userSearchBase',
        'userSearchFilter',
        'usernameAttribute',
      ],
      (err, values) => {
        if (!err) {
          setLoading(true);
          const params: ConnectLDAPParams = {
            connectionName: values.connectionName,
            connectionPassword: values.connectionPassword,
            connectionUrl: values.connectionUrl,
            userListFilter: values.userListFilter,
            userSearchBase: values.userSearchBase,
            userSearchFilter: values.userSearchFilter,
            usernameAttribute: values.usernameAttribute,
          };
          connectLDAP(params)
            .then(rs => {
              setLoading(false);
              if (rs.code === 0) {
                NotificationSuccess('Th??nh c??ng', 'K???t n???i th??ng tin LDAP th??nh c??ng ');
              } else {
                NotificationError('Th???t b???i', rs.message);
              }
            })
            .catch(err => {
              setLoading(false);
              NotificationError('Th???t b???i', err.message);
            });
        }
      },
    );
  };

  const validateConnect = (rule: any, text: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('connectionName');
    if (name.length === 0) {
      return callback();
    }
    props.form.setFields({
      connectionName: {
        value: text.trim(),
      },
    });
    return callback();
  };

  const handleCancel = () => {
    history.goBack();
  };

  const validUrl = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0) {
      return callback();
    }
    const isValid: boolean = validateUrlLDAP(text);
    if (!isValid) {
      return callback('URL kh??ng ph?? h???p');
    }
    props.form.setFields({
      connectionUrl: {
        value: text.trim(),
      },
    });
    return callback();
  };

  const validateDescription = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('M?? t??? kh??ng ph?? h???p');
      }
      props.form.setFields({
        description: {
          value: value.trim(),
        },
      });
      return callback();
    }
  };

  const validateType = (rule: any, value: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('usernameAttribute');
    if (name.length === 0) {
      return callback();
    }

    return callback();
  };

  const validateFilter = (rule: any, value: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('userSearchFilter');
    if (name.length === 0) {
      return callback();
    }

    props.form.setFields({
      userSearchFilter: {
        value: value.trim(),
      },
    });
    return callback();
  };

  const validateListFilter = (rule: any, value: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('userListFilter');
    if (name.length === 0) {
      return callback();
    }

    props.form.setFields({
      userListFilter: {
        value: value.trim(),
      },
    });
    return callback();
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      return callback();
    }
    return callback();
  };

  const validateNameLabel = (rule: any, value: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('userSearchBase');
    if (name.length === 0) {
      return callback();
    }
    props.form.setFields({
      userSearchBase: {
        value: value.trim(),
      },
    });
    return callback();
  };

  const pasteDescription = () => {
    const valueDescription = props.form.getFieldValue('description');
    props.form.setFields({
      description: {
        value: valueDescription.trim() + ' ',
      },
    });
  };

  const pasteName = () => {
    props.form.setFields({
      connectionName: {
        value: props.form.getFieldValue('connectionName').trim() + ' ',
      },
    });
  };

  const pasteUser = () => {
    props.form.setFields({
      userSearchBase: {
        value: props.form.getFieldValue('userSearchBase').trim() + ' ',
      },
    });
  };

  const pasteUserSearch = () => {
    props.form.setFields({
      userSearchFilter: {
        value: props.form.getFieldValue('userSearchFilter').trim() + ' ',
      },
    });
  };

  const pasteUserList = () => {
    props.form.setFields({
      userListFilter: {
        value: props.form.getFieldValue('userListFilter').trim() + ' ',
      },
    });
  };
  return (
    <Wrapper>
      <div className="header">Th??ng tin chi ti???t c???u h??nh LDAP</div>
      <div className="content">
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Collapse defaultActiveKey={['1']} className="collapse">
            <Panel header="Th??ng tin chung" key="1">
              <Form.Item label="T??n" className="maxWidthLabel">
                {getFieldDecorator('domainName', {
                  rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                  initialValue: detailState.item?.domainName,
                })(<Input disabled={true} maxLength={255} />)}
              </Form.Item>

              <Form.Item label="M?? t???" className="maxWidthLabel">
                {getFieldDecorator('description', {
                  rules: [
                    { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                    { validator: validateDescription },
                  ],
                  initialValue: detailState.item?.description,
                  validateTrigger: 'onBlur',
                })(<TextArea maxLength={5000} onPaste={pasteDescription} />)}
              </Form.Item>
            </Panel>
          </Collapse>

          <Collapse defaultActiveKey={['1']} className="collapse">
            <Panel header="Thu???c t??nh" key="1">
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="???????ng d???n URL">
                    {getFieldDecorator('connectionUrl', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        // { validator: validUrl }
                      ],
                      initialValue: detailState.item?.connectionUrl,
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={1000} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  ???????ng d???n URL ????? k???t n???i t???i LDAP
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="T??n t??i kho???n li??n k???t">
                    {getFieldDecorator('connectionName', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateConnect },
                      ],
                      initialValue: detailState.item?.connectionName,
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteName} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  T??n t??i kho???n qu???n tr??? vi??n c???a h??? th???ng LDAP
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="M???t kh???u c???a t??i kho???n li??n k???t">
                    {getFieldDecorator('connectionPassword', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validatePassword },
                      ],
                      initialValue: detailState.item?.connectionPassword,
                      validateTrigger: 'onBlur',
                    })(<Input.Password autoComplete="new-password" maxLength={255} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  M???t kh???u c???a t??i kho???n qu???n tr??? vi??n
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="T??n b???ng ch???a th??ng tin ng?????i d??ng">
                    {getFieldDecorator('userSearchBase', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateNameLabel },
                      ],
                      initialValue: detailState.item?.userSearchBase,
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteUser} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  B???ng ch???a th??ng tin ng?????i d??ng s??? d???ng ????? tim ki???m
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Thu???c t??nh ng?????i d??ng">
                    {getFieldDecorator('usernameAttribute', {
                      rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateType }],
                      initialValue: detailState.item?.usernameAttribute,
                    })(<Input maxLength={255} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Thu???c t??nh ???????c s??? d???ng ????? t??m ki???m ch??nh x??c ng?????i d??ng. Ng?????i d??ng c?? th??? ???????c x??c th???c b???ng ?????a ch???
                  email, uid, v.v. c???a h???
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Ti??u ch?? t??m ki???m th??ng tin ng?????i d??ng">
                    {getFieldDecorator('userSearchFilter', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateFilter },
                      ],
                      initialValue: detailState.item?.userSearchFilter,
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteUserSearch} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  L???c ti??u ch?? ????? t??m ki???m m???t m???c nh???p ng?????i d??ng c??? th???
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Ti??u ch?? t??m ki???m th??ng tin to??n b??? danh s??ch ng?????i d??ng trong LDAP">
                    {getFieldDecorator('userListFilter', {
                      rules: [
                        { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' },
                        { validator: validateListFilter },
                      ],
                      initialValue: detailState.item?.userListFilter,
                      validateTrigger: 'onBlur',
                    })(<Input maxLength={255} onPaste={pasteUserList} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Ti??u ch?? l???c ????? li???t k?? t???t c??? c??c m???c nh???p LDAP c???a ng?????i d??ng
                </Col>
              </Row>
            </Panel>
          </Collapse>

          <div className="containerButton">
            <Button type="default" className="mr-3" onClick={handleCancel}>
              H???y
            </Button>
            <Button className="mr-3" type="primary" htmlType="submit" onClick={handleSubmit}>
              L??u
            </Button>
            <Button type="danger" onClick={handleConnect}>
              Ki???m tra k???t n???i
            </Button>
          </div>
        </Form>
      </div>
      {loading && <Loading />}
    </Wrapper>
  );
}

export default connector(Form.create<IProps>()(ConfigurationLDAPUpdate));

const Wrapper = styled.div`
  padding: 10px 15px;

  .header {
    height: 52px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .content {
    /* padding: 10px 15px; */
    /* background-color: #fff; */

    .iconDescription {
      color: #ff9100;
      margin-right: 5px;
    }

    .containerButton {
      display: flex;
      justify-content: flex-end;
    }

    .collapse {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin-bottom: 20px;
    }

    .ant-collapse-header {
      background: #ff6060;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }

  .maxWidthLabel {
    .ant-form-item-label {
      max-width: 165px;
    }
  }
`;
