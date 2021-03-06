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
          NotificationError('Th???t b???i', 'M???t kh???u x??c nh???n kh??ng h???p l???');
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
                'Th??nh c??ng',
                'B???n ???? ????ng k?? th??nh c??ng d???ch v??? chia s??? d??? li???u c???a B??? K??? Ho???ch v?? ?????u T??. Ch??ng t??i s??? li??n h??? v???i b???n s???m nh???t c?? th???.',
              );
            } else {
              let msg = 'T???o m???i t??i kho???n k???t n???i kh??ng th??nh c??ng';
              if (data) {
                msg = data.message;
              }
              NotificationError('Th???t b???i', msg);
            }
          })
          .catch(e => {
            console.log('e: ', e);
            NotificationError('Th???t b???i', 'T???o m???i t??i kho???n k???t n???i kh??ng th??nh c??ng ' + e.message);
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
      return callback('T??n t??i kho???n kh??ng h???p l???');
    }
    checkExistUsernameNoAuth(value).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n t??i kho???n ???? t???n t???i');
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
        return callback('????n v??? tri???n khai kh??ng h???p l???');
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
        return callback('H??? v?? t??n ng?????i d??ng kh??ng h???p l???');
      }
      if (/[0-9:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-]/.test(value)) {
        callback('H??? v?? t??n ng?????i d??ng kh??ng h???p l???');
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
          'M???t kh???u ph???i c?? t???i thi???u 8 k?? t??? bao g???m m???t ch??? c??i vi???t hoa, m???t k?? t??? ?????c bi???t v?? c??c k?? t??? ch??? v?? s???.',
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
        return callback('M???t kh???u v?? X??c nh???n m???t kh???u kh??ng tr??ng nhau. Vui l??ng ki???m tra l???i');
      }
    }
  };

  const validateEmailInput = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback();
    }
    const isValid: boolean = validateEmail(value);
    if (!isValid) {
      return callback('Email kh??ng h???p l???');
    }
    checkExistEmailNoAuth(value).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n email ???? t???n t???i');
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
        return callback('S??? ??i???n tho???i kh??ng h???p l???');
      }
      if (!isValid) {
        return callback('S??? ??i???n tho???i kh??ng h???p l???');
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
        <p className="register-title ">????ng k?? t??i kho???n</p>
        <Form {...formItemLayout}>
          <div className="register-container">
            <div>
              <p>
                T??n t??i kho???n <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '????y l?? tr?????ng b???t bu???c nh???p', whitespace: false },
                    { validator: validateUsername },
                  ],
                })(<Input placeholder="T??n t??i kho???n" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p>
                M???t kh???u <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    {
                      validator: validatePassword,
                    },
                  ],
                })(<Input type="password" placeholder="M???t kh???u" autoComplete="new-password" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p>
                Nh???p l???i m???t kh???u <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('re_password', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateRePassword },
                  ],
                })(<Input type="password" placeholder="Nh???p l???i m???t kh???u" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p className="username">
                {' '}
                H??? v?? t??n <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('full_name', {
                  initialValue: valueUserName,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateName },
                  ],
                })(<Input type="text" placeholder="H??? v?? t??n" maxLength={255} onPaste={pasteFullName} />)}
              </Form.Item>
            </div>
            <div>
              <p className="phone">
                {' '}
                S??? ??i???n tho???i <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validatePhone },
                  ],
                })(<Input placeholder="S??? ??i???n tho???i" />)}
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
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateEmailInput },
                  ],
                })(<Input type="text" placeholder="Email" maxLength={255} />)}
              </Form.Item>
            </div>
            <div>
              <p className="position">Ch???c v???</p>
              <Form.Item>
                {getFieldDecorator('position', {
                  initialValue: valuePosition,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validatePosition }],
                })(<Input type="text" placeholder="Ch???c v???" maxLength={255} onPaste={pastePosition} />)}
              </Form.Item>
            </div>
            <div>
              <p className="department">Ph??ng ban</p>
              <Form.Item>
                {getFieldDecorator('department', {
                  initialValue: valueDepartment,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateDepartment }],
                })(<Input type="text" placeholder="Ph??ng ban" maxLength={255} onPaste={pasteDepartment} />)}
              </Form.Item>
            </div>
            <div>
              <p className="deployment-unit">
                {' '}
                ????n v??? tri???n khai <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('organization', {
                  initialValue: valueOrganization,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                    { validator: validateUnit },
                  ],
                })(<Input type="text" placeholder="????n v??? tri???n khai" maxLength={255} onPaste={pasteOrganization} />)}
              </Form.Item>
            </div>
            <div>
              <p className="address">?????a ch???</p>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: valueAddress,
                  validateTrigger: 'onBlur',
                  rules: [{ validator: validateAddress }],
                })(<Input type="text" placeholder="?????a ch???" maxLength={255} onPaste={pasteAddress} />)}
              </Form.Item>
            </div>
            <div>
              <p className="under">
                {' '}
                Tr???c thu???c <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('under', {
                  initialValue: 'Trong B??? KH&??T',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="Trong B??? KH&??T">Trong B??? KH&??T</Option>
                    <Option value="Ngo??i B??? KH&??T">Ngo??i B??? KH&??T</Option>
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div>
              <p className="role">
                {' '}
                Vai tr?? tr??n h??? th???ng <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item>
                {getFieldDecorator('role', {
                  initialValue: 'consumer',
                  rules: [
                    {
                      required: true,
                      message: '????y l?? tr?????ng b???t bu???c nh???p',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    <Option value="provider">Nh?? cung c???p d???ch v??? chia s???</Option>
                    <Option value="consumer">Ng?????i s??? d???ng d???ch v??? chia s???</Option>
                  </Select>,
                )}
              </Form.Item>
            </div>
          </div>

          <div style={{ textAlign: 'end' }}>
            <Button htmlType="submit" onClick={onBtnRegisterClicked} className="submit">
              ????ng k??
            </Button>
          </div>
        </Form>
        {loading && <Loading />}
      </div>
    </View>
  );
};

export default Form.create<IProps>()(Register);
