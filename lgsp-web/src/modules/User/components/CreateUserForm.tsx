import { AutoComplete, Button, Form, Input, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Under, UserRole } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
// import { getAllOrganization } from '../../DataPublic/redux/service/apis';
import { createUser, showCreateUserForm } from '../redux/action/create_user';
import { CreateUserParams } from '../redux/models';
import { checkExistEmail, checkExistUsername } from '../redux/service/apis';
import { validateEmail, validatePhoneNumber } from '../../../constants/common';

const mapStateToProps = (rootState: RootState) => ({
  createState: rootState.user.createState,
  authState: rootState.auth.auth,
});

const conn = connect(mapStateToProps, { createUser, showCreateUserForm });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

function CreateUserForm(props: IProps) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const { getFieldDecorator, resetFields } = props.form;

  const [organizationData, setOrganizationData] = useState<string[]>([]);
  const [valueName, setValueName] = useState('');
  const [valuePosition, setValuePosition] = useState('');
  const [valueDepartment, setValueDepartment] = useState('');
  const [valueOrganization, setValueOrganization] = useState('');
  const [valueAddress, setValueAddress] = useState('');
  // const [dateValue, setDateValue] = useState('');

  const validateUsername = (rule: any, value: any, callback: any) => {
    if (value.length === 0 || value === '') {
      callback();
    } else {
      if (/^(?=.{3,}$)[a-z0-9]+$/i.test(value)) {
        checkExistUsername(value).then(rs => {
          if (rs.code == 0) {
            callback();
          } else {
            callback('Tên tài khoản đã tồn tại');
          }
        });
      } else {
        callback('Tên tài khoản không hợp lệ');
      }
    }
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
    if (value.length === 0 || value === '') {
      callback();
    } else {
      if (value.trim().length === 0) {
        callback('Họ và tên người dùng không hợp lệ');
      }
      if (/[0-9:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-]/.test(value)) {
        callback('Họ và tên người dùng không hợp lệ');
      } else {
        const checkValue = value.trim();
        props.form.setFields({
          name: {
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
        callback();
      } else {
        callback(
          'Mật khẩu phải có tối thiểu 8 ký tự bao gồm một chữ cái viết hoa, một ký tự đặc biệt và các ký tự chữ và số.',
        );
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
    checkExistEmail(value).then(rs => {
      if (rs.code !== 0) {
        return callback('Tên email đã tồn tại');
      }
      return callback();
    });
  };

  const validatePhone = (rule: any, value: any, callback: any) => {
    console.log('value', value.length);
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

  // useEffect(() => {
  //   let data: string[] = [];
  //   getAllOrganization().then(rs => {
  //     if (rs.code != 0) {
  //       return;
  //     }
  //     data = rs.rows.map(item => item.name);
  //     setOrganizationData(data);
  //   });
  // }, []);

  const onCreateUserClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let param: CreateUserParams = {
          username: values.username,
          password: values.password,
          fullName: values.name.trim(),
          phoneNumber: values.phone,
          email: values.email,
          position: values.position.trim(),
          department: values.department.trim(),
          organization: values.organization.trim(),
          address: values.address.trim(),
          under: values.under,
          role: values.role,
        };

        props.createUser(param);
      }
    });
  };

  const onBtnCancelClicked = () => {
    // resetFields();
    props.showCreateUserForm(false);
  };

  // const onChangeDate = (date: any, dateString: string) => {
  //   setDateValue(dateString);
  // };

  const restrict = (event: any) => {
    const regex = new RegExp('^[0-9]+$');
    console.log(event.charCode);
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
  //onPaste
  const pasteName = () => {
    props.form.setFields({
      name: {
        value: props.form.getFieldValue('name').trim() + ' ',
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
    <Modal
      zIndex={2}
      maskClosable={false}
      title={'Tạo mới người dùng'}
      visible={props.createState.show}
      centered={true}
      width="550px"
      onCancel={() => {
        // resetFields();
        props.showCreateUserForm(false);
      }}
      afterClose={() => {
        resetFields();
      }}
      footer={''}
    >
      <Form {...formItemLayout} autoComplete="off">
        <Form.Item label="Tên tài khoản" className="group-area">
          {getFieldDecorator('username', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateUsername }],
          })(<Input placeholder="Nhập tên tài khoản" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="Mật khẩu" className="group-area">
          {getFieldDecorator('password', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePassword }],
          })(<Input.Password autoComplete="new-password" placeholder="Nhập mật khẩu" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="Họ và tên" className="group-area">
          {getFieldDecorator('name', {
            initialValue: valueName,
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
          })(<Input placeholder="Nhập họ và tên" maxLength={255} onPaste={pasteName} />)}
        </Form.Item>
        <Form.Item label="Số điện thoại" className="group-area">
          {getFieldDecorator('phone', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePhone }],
          })(<Input placeholder="Nhập số điện thoại" />)}
        </Form.Item>
        <Form.Item label="Email" className="group-area">
          {getFieldDecorator('email', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateEmailInput }],
          })(<Input placeholder="Nhập email" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="Chức vụ" className="group-area">
          {getFieldDecorator('position', {
            initialValue: valuePosition,
            validateTrigger: 'onBlur',
            rules: [{ validator: validatePosition }],
          })(<Input placeholder="Nhập chức vụ" maxLength={255} onPaste={pastePosition} />)}
        </Form.Item>
        <Form.Item label="Phòng ban" className="group-area">
          {getFieldDecorator('department', {
            initialValue: valueDepartment,
            validateTrigger: 'onBlur',
            rules: [{ validator: validateDepartment }],
          })(<Input placeholder="Nhập phòng ban" maxLength={255} onPaste={pasteDepartment} />)}
        </Form.Item>
        <Form.Item label="Đơn vị triển khai" className="group-area">
          {getFieldDecorator('organization', {
            initialValue: valueOrganization,
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateUnit }],
          })(<Input placeholder="Nhập đơn vị triển khai" maxLength={255} onPaste={pasteOrganization} />)}
        </Form.Item>
        <Form.Item label="Địa chỉ" className="group-area">
          {getFieldDecorator('address', {
            initialValue: valueAddress,
            validateTrigger: 'onBlur',
            rules: [{ validator: validateAddress }],
          })(<Input placeholder="Nhập địa chỉ đơn vị" maxLength={255} onPaste={pasteAddress} />)}
        </Form.Item>
        <Form.Item label="Trực thuộc" className="group-area">
          {getFieldDecorator('under', {
            initialValue: Under.INTERNAL,
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
              <Select.Option value={Under.INTERNAL}>Trong bộ KH&ĐT</Select.Option>
              <Select.Option value={Under.EXTERNAL}>Ngoài bộ KH&ĐT</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Vai trò trên hệ thống" className="group-area">
          {getFieldDecorator('role', {
            initialValue: UserRole.PROVIDER,
            rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
          })(
            <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
              <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
              <Select.Option value={UserRole.PROVIDER}>Nhà cung cấp dịch vụ chia sẻ</Select.Option>
              <Select.Option value={UserRole.CONSUMER}>Người sử dụng dịch vụ chia sẻ</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <div style={{ marginBottom: '45px' }}>
          <Button
            // className="mr-3 "
            htmlType="submit"
            type="primary"
            onClick={onCreateUserClicked}
            style={{ float: 'right' }}
          >
            Tạo mới
          </Button>
          <Button type="default" className="mr-3" onClick={onBtnCancelClicked} style={{ float: 'right' }}>
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default conn(Form.create<IProps>()(CreateUserForm));
