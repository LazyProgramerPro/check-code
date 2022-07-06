import { Button, Col, Collapse, Form, Icon, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationSuccess } from 'src/components/Notification/Notification';
import { NotificationError } from 'src/components/Notification/Notification';
import { validateNameConnect, validateNormalString, validateUrl, validateUrlLDAP } from 'src/constants/common';
import styled from 'styled-components';
import { connectLDAP, createLDAP, validateNameCreate } from './redux/service/apis';
import { ConnectLDAPParams, CreateLDAPParams } from './redux/service/models';

interface IProps extends FormComponentProps {}

function ConfigurationLDAPCreate(props: IProps) {
  const { getFieldDecorator, resetFields } = props.form;
  const { Panel } = Collapse;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const formItemLayout = {
    labelCol: { lg: { span: 24 }, xl: { span: 13 } },
    wrapperCol: { lg: { span: 24 }, xl: { span: 11 } },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const params: CreateLDAPParams = {
          connectionName: values.connectionName,
          connectionPassword: values.connectionPassword,
          connectionUrl: values.connectionUrl,
          description: values.description,
          domainName: values.domainName,
          userListFilter: values.userListFilter,
          userSearchBase: values.userSearchBase,
          userSearchFilter: values.userSearchFilter,
          usernameAttribute: values.usernameAttribute,
        };
        createLDAP(params)
          .then(rs => {
            setLoading(false);
            if (rs.code === 0) {
              NotificationSuccess('Thành công', 'Kết nối thông tin LDAP thành công ');
              history.push('/configuration-ldap');
            } else {
              NotificationError('Thất bại', rs.message);
            }
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Thất bại', err.message);
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
          console.log('test', values.usernameAttribute);
          connectLDAP(params)
            .then(rs => {
              setLoading(false);
              if (rs.code === 0) {
                NotificationSuccess('Thành công', 'Kết nối thông tin LDAP thành công ');
              } else {
                NotificationError('Thất bại', rs.message);
              }
            })
            .catch(err => {
              setLoading(false);
              NotificationError('Thất bại', err.message);
            });
        }
      },
    );
  };

  const validateName = (rule: any, text: any, callback: any) => {
    const form = props.form;
    const name = form.getFieldValue('domainName');
    if (name.length === 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(text);
    if (!isValid) {
      return callback('Tên cấu hình LDAP không hợp lệ');
    }
    validateNameCreate(name).then(rs => {
      if (rs.code !== 0) {
        return callback('Thông tin LDAP đã tồn tại');
      } else {
        return callback();
      }
    });
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
      return callback('URL không phù hợp');
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
        return callback('Mô tả không phù hợp');
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
    props.form.setFields({
      usernameAttribute: {
        value: value.trim(),
      },
    });
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

  const pasteAttribute = () => {
    props.form.setFields({
      userSearchFilter: {
        value: props.form.getFieldValue('usernameAttribute').trim() + ' ',
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
      <div className="header">Tạo mới cấu hình LDAP</div>
      <div className="content">
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Collapse defaultActiveKey={['1']} className="collapse">
            <Panel header="Thông tin chung" key="1">
              <Form.Item label="Tên" className="maxWidthLabel">
                {getFieldDecorator('domainName', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
                })(<Input maxLength={255} />)}
              </Form.Item>

              <Form.Item label="Mô tả" className="maxWidthLabel">
                {getFieldDecorator('description', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: 'Đây là trường bắt buộc nhập' },
                    { validator: validateDescription },
                  ],
                })(<TextArea maxLength={5000} onPaste={pasteDescription} />)}
              </Form.Item>
            </Panel>
          </Collapse>

          <Collapse defaultActiveKey={['1']} className="collapse">
            <Panel header="Thuộc tính" key="1">
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Đường dẫn URL">
                    {getFieldDecorator('connectionUrl', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        // { validator: validUrl }
                      ],
                    })(<Input maxLength={1000} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Đường dẫn URL để kết nối tới LDAP
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Tên tài khoản liên kết">
                    {getFieldDecorator('connectionName', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        { validator: validateConnect },
                      ],
                    })(<Input maxLength={255} onPaste={pasteName} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Tên tài khoản quản trị viên của hệ thống LDAP
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Mật khẩu của tài khoản liên kết">
                    {getFieldDecorator('connectionPassword', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        { validator: validatePassword },
                      ],
                    })(<Input.Password maxLength={255} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Mật khẩu của tài khoản quản trị viên
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Tên bảng chứa thông tin người dùng">
                    {getFieldDecorator('userSearchBase', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        { validator: validateNameLabel },
                      ],
                    })(<Input maxLength={255} onPaste={pasteUser} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Bảng chứa thông tin người dùng sử dụng để tim kiếm
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Thuộc tính người dùng">
                    {getFieldDecorator('usernameAttribute', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateType }],
                    })(<Input maxLength={255} onPaste={pasteAttribute} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Thuộc tính được sử dụng để tìm kiếm chính xác người dùng. Người dùng có thể được xác thực bằng địa chỉ
                  email, uid, v.v. của họ
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Tiêu chí tìm kiếm thông tin người dùng">
                    {getFieldDecorator('userSearchFilter', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        { validator: validateFilter },
                      ],
                    })(<Input maxLength={255} onPaste={pasteUserSearch} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Lọc tiêu chí để tìm kiếm một mục nhập người dùng cụ thể
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col lg={16}>
                  <Form.Item label="Tiêu chí tìm kiếm thông tin toàn bộ danh sách người dùng trong LDAP">
                    {getFieldDecorator('userListFilter', {
                      initialValue: '',
                      validateTrigger: 'onBlur',
                      rules: [
                        { required: true, message: 'Đây là trường bắt buộc nhập' },
                        { validator: validateListFilter },
                      ],
                    })(<Input maxLength={255} onPaste={pasteUserList} />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Icon type="question-circle" className="iconDescription" />
                  Tiêu chí lọc để liệt kê tất cả các mục nhập LDAP của người dùng
                </Col>
              </Row>
            </Panel>
          </Collapse>

          <div className="containerButton">
            <Button type="default" className="mr-3" onClick={handleCancel}>
              Hủy
            </Button>
            <Button className="mr-3" type="primary" htmlType="submit" onClick={handleSubmit}>
              Lưu
            </Button>
            <Button type="danger" onClick={handleConnect}>
              Kiểm tra kết nối
            </Button>
          </div>
        </Form>
      </div>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
}
export default Form.create<IProps>()(ConfigurationLDAPCreate);
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
