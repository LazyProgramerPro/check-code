import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import 'src/assets/styles/page/register.scss';
import Loading from 'src/components/Loading';
import { FormComponentProps } from 'antd/lib/form';
import { POST } from '../../services';
import { NotificationError, NotificationSuccess } from '../../components/Notification/Notification';
import styled from 'styled-components';
import {
  checkExistEmail,
  checkExistEmailNoAuth,
  checkExistUsername,
  checkExistUsernameNoAuth,
} from '../User/redux/service/apis';
import { validateEmail, validateNormalString, validatePhoneNumber } from 'src/constants/common';
import Footer from 'src/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}
const { Option } = Select;

const View = styled.div``;
interface RegisterParams {
  username: string;
  password: string;
  re_password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  position: string;
  department: string;
  organization: string;
  address: string;
  under: string;
  role: string;
}

interface IProps extends FormComponentProps, LayoutProps {}

const Register = (props: IProps) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };
  const { children } = props;
  const { getFieldDecorator, resetFields } = props.form;
  const [loading, setLoading] = useState<boolean>(false);
  const [currPassword, setCurrPassword] = useState('');
  const [valueUserName, setValueUserName] = useState('');
  const [valuePosition, setValuePosition] = useState('');
  const [valueDepartment, setValueDepartment] = useState('');
  const [valueOrganization, setValueOrganization] = useState('');
  const [valueAddress, setValueAddress] = useState('');
  const [params, setParams] = useState<RegisterParams>({
    username: '',
    password: '',
    re_password: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    position: '',
    department: '',
    organization: '',
    address: '',
    under: '',
    role: '',
  });

  const onBtnRegisterClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password != values.re_password) {
          NotificationError('Thất bại', 'Mật khẩu xác nhận không hợp lệ');
          return;
        }
        let params: RegisterParams = {
          username: values.username,
          password: values.password,
          re_password: values.re_password,
          fullName: values.full_name,
          phoneNumber: values.phone,
          email: values.email,
          position: values.position,
          department: values.department,
          organization: values.organization,
          address: values.address,
          under: values.under,
          role: values.role,
        };
        setLoading(true);
        let success = false;
        POST('account-svc/account/public/create-account', params)
          .then(data => {
            console.log('dt: ' + JSON.stringify(data));
            if (data && data.code === 0) {
              success = true;
              NotificationSuccess(
                'Thành công',
                'Bạn đã đăng ký thành công dịch vụ chia sẻ dữ liệu của Bộ Kế Hoạch và Đầu Tư. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
              );
            } else {
              let msg = 'Tạo mới tài khoản kết nối không thành công';
              if (data) {
                msg = data.message;
              }
              NotificationError('Thất bại', msg);
            }
          })
          .catch(e => {
            console.log('e: ', e);
            NotificationError('Thất bại', 'Tạo mới tài khoản kết nối không thành công ' + e.message);
          })
          .finally(() => {
            if (success) {
              resetFields();
            }
            setLoading(false);
          });
      }
    });
  };

  const validateUsername = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      return callback();
    }
    const isValid: boolean = validateNormalString(value);

    if (!isValid) {
      return callback('Tên tài khoản không hợp lệ');
    }
    checkExistUsernameNoAuth(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Tên tài khoản đã tồn tại');
      }
      return callback();
    });
  };

  const validatePosition = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      const checkPosition = value.trim();
      props.form.setFields({
        position: {
          value: checkPosition,
        },
      });
      return callback();
    }
  };

  const validateDepartment = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      const checkDepartment = value.trim();
      props.form.setFields({
        department: {
          value: checkDepartment,
        },
      });
      return callback();
    }
  };

  const validateUnit = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Đơn vị triển khai không hợp lệ');
      }

      const checkOrganization = value.trim();
      props.form.setFields({
        organization: {
          value: checkOrganization,
        },
      });
      return callback();
    }
  };
  const validateAddress = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      const checkAddress = value.trim();
      props.form.setFields({
        address: {
          value: checkAddress,
        },
      });
      return callback();
    }
  };

  const validateName = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === undefined || value === '') {
      return callback();
    } else {
      if (value.trim().length === 0) {
        return callback('Họ và tên người dùng không hợp lệ');
      }
      if (/[0-9:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-]/.test(value)) {
        callback('Họ và tên người dùng không hợp lệ');
      } else {
        const checkValue = value.trim();
        props.form.setFields({
          full_name: {
            value: checkValue,
          },
        });
        return callback();
      }
    }
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback();
    } else {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d:\[\]\\;".,|/+={}~<>`?!@'#$%^&*()_-]{8,}$/.test(
          value,
        )
      ) {
        setCurrPassword(value);
        callback();
      } else {
        callback(
          'Mật khẩu phải có tối thiểu 8 ký tự bao gồm một chữ cái viết hoa, một ký tự đặc biệt và các ký tự chữ và số.',
        );
      }
    }
  };

  const validateRePassword = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      return callback();
    } else {
      if (value == currPassword) {
        callback();
      } else {
        return callback('Mật khẩu và Xác nhận mật khẩu không trùng nhau. Vui lòng kiểm tra lại');
      }
    }
  };

  const validateEmailInput = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback();
    }
    const isValid: boolean = validateEmail(value);
    if (!isValid) {
      return callback('Email không hợp lệ');
    }
    checkExistEmailNoAuth(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Tên email đã tồn tại');
      }
      return callback();
    });
  };

  const validatePhone = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      return callback();
    } else {
      const isValid = validatePhoneNumber(value);
      if (value.length > 10) {
        return callback('Số điện thoại không hợp lệ');
      }
      if (!isValid) {
        return callback('Số điện thoại không hợp lệ');
      }

      return callback();
    }
  };
  const restrict = (event: any) => {
    const regex = new RegExp('^[0-9]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
    const form = props.form;
    const checkLength = form.getFieldValue('phone');
    if (checkLength.length > 9) {
      event.preventDefault();
      return false;
    }
    return true;
  };
  const pasteFullName = () => {
    props.form.setFields({
      full_name: {
        value: props.form.getFieldValue('full_name').trim() + ' ',
      },
    });
  };

  const pastePosition = () => {
    props.form.setFields({
      position: {
        value: props.form.getFieldValue('position').trim() + ' ',
      },
    });
  };

  const pasteDepartment = () => {
    props.form.setFields({
      department: {
        value: props.form.getFieldValue('department').trim() + ' ',
      },
    });
  };

  const pasteOrganization = () => {
    props.form.setFields({
      organization: {
        value: props.form.getFieldValue('organization').trim() + ' ',
      },
    });
  };

  const pasteAddress = () => {
    props.form.setFields({
      address: {
        value: props.form.getFieldValue('address').trim() + ' ',
      },
    });
  };
  return (
    <View>
      <div className="register-wrapper">
        <p className="register-title ">Đăng ký tài khoản</p>
        <Form {...formItemLayout}>
          <div className="register-container">
            <div>
              <p>
                Tên tài khoản <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: 'Đây là trường bắt buộc nhập', whitespace: false },
                    { validator: validateUsername },
                  ],
                })(<Input placeholder="Tên tài khoản" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p>
                Mật khẩu <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    {
                      validator: validatePassword,
                    },
                  ],
                })(<Input type="password" placeholder="Mật khẩu" autoComplete="new-password" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p>
                Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('re_password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateRePassword },
                  ],
                })(<Input type="password" placeholder="Nhập lại mật khẩu" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p className="username">
                {' '}
                Họ và tên <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('full_name', {
                  initialValue: valueUserName,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateName },
                  ],
                })(<Input type="text" placeholder="Họ và tên" maxLength={255} onPaste={pasteFullName} />)}
              </Form.Item>
            </div>
            <div>
              <p className="phone">
                {' '}
                Số điện thoại <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validatePhone },
                  ],
                })(<Input placeholder="Số điện thoại" />)}
              </Form.Item>
            </div>
            <div>
              <p className="email">
                {' '}
                Email <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateEmailInput },
                  ],
                })(<Input type="text" placeholder="Email" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p className="position">Chức vụ</p>
              <Form.Item>
                {getFieldDecorator('position', {
                  initialValue: valuePosition,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validatePosition }],
                })(<Input type="text" placeholder="Chức vụ" maxLength={255} onPaste={pastePosition} />)}
              </Form.Item>
            </div>
            <div>
              <p className="department">Phòng ban</p>
              <Form.Item>
                {getFieldDecorator('department', {
                  initialValue: valueDepartment,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateDepartment }],
                })(<Input type="text" placeholder="Phòng ban" maxLength={255} onPaste={pasteDepartment} />)}
              </Form.Item>
            </div>
            <div>
              <p className="deployment-unit">
                {' '}
                Đơn vị triển khai <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('organization', {
                  initialValue: valueOrganization,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                    { validator: validateUnit },
                  ],
                })(<Input type="text" placeholder="Đơn vị triển khai" maxLength={255} onPaste={pasteOrganization} />)}
              </Form.Item>
            </div>
            <div>
              <p className="address">Địa chỉ</p>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: valueAddress,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateAddress }],
                })(<Input type="text" placeholder="Địa chỉ" maxLength={255} onPaste={pasteAddress} />)}
              </Form.Item>
            </div>
            <div>
              <p className="under">
                {' '}
                Trực thuộc <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('under', {
                  initialValue: 'Trong Bộ KH&ĐT',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="Trong Bộ KH&ĐT">Trong Bộ KH&ĐT</Option>
                    <Option value="Ngoài Bộ KH&ĐT">Ngoài Bộ KH&ĐT</Option>
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div>
              <p className="role">
                {' '}
                Vai trò trên hệ thống <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('role', {
                  initialValue: 'consumer',
                  rules: [
                    {
                      required: true,
                      message: 'Đây là trường bắt buộc nhập',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="provider">Nhà cung cấp dịch vụ chia sẻ</Option>
                    <Option value="consumer">Người sử dụng dịch vụ chia sẻ</Option>
                  </Select>,
                )}
              </Form.Item>
            </div>
          </div>

          <div style={{ textAlign: 'end' }}>
            <Button htmlType="submit" onClick={onBtnRegisterClicked} className="submit">
              Đăng ký
            </Button>
          </div>
        </Form>
        {loading && <Loading />}
      </div>
    </View>
  );
};

export default Form.create<IProps>()(Register);
