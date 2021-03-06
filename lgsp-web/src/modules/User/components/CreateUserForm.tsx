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
            callback('T??n t??i kho???n ???? t???n t???i');
          }
        });
      } else {
        callback('T??n t??i kho???n kh??ng h???p l???');
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
    if (value.length === 0 || value === '') {
      callback();
    } else {
      if (value.trim().length === 0) {
        callback('H??? v?? t??n ng?????i d??ng kh??ng h???p l???');
      }
      if (/[0-9:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-]/.test(value)) {
        callback('H??? v?? t??n ng?????i d??ng kh??ng h???p l???');
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
          'M???t kh???u ph???i c?? t???i thi???u 8 k?? t??? bao g???m m???t ch??? c??i vi???t hoa, m???t k?? t??? ?????c bi???t v?? c??c k?? t??? ch??? v?? s???.',
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
      return callback('Email kh??ng h???p l???');
    }
    checkExistEmail(value).then(rs => {
      if (rs.code !== 0) {
        return callback('T??n email ???? t???n t???i');
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
        return callback('S??? ??i???n tho???i kh??ng h???p l???');
      }
      if (!isValid) {
        return callback('S??? ??i???n tho???i kh??ng h???p l???');
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
      title={'T???o m???i ng?????i d??ng'}
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
        <Form.Item label="T??n t??i kho???n" className="group-area">
          {getFieldDecorator('username', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateUsername }],
          })(<Input placeholder="Nh???p t??n t??i kho???n" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="M???t kh???u" className="group-area">
          {getFieldDecorator('password', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validatePassword }],
          })(<Input.Password autoComplete="new-password" placeholder="Nh???p m???t kh???u" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="H??? v?? t??n" className="group-area">
          {getFieldDecorator('name', {
            initialValue: valueName,
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateName }],
          })(<Input placeholder="Nh???p h??? v?? t??n" maxLength={255} onPaste={pasteName} />)}
        </Form.Item>
        <Form.Item label="S??? ??i???n tho???i" className="group-area">
          {getFieldDecorator('phone', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validatePhone }],
          })(<Input placeholder="Nh???p s??? ??i???n tho???i" />)}
        </Form.Item>
        <Form.Item label="Email" className="group-area">
          {getFieldDecorator('email', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateEmailInput }],
          })(<Input placeholder="Nh???p email" maxLength={255} />)}
        </Form.Item>
        <Form.Item label="Ch???c v???" className="group-area">
          {getFieldDecorator('position', {
            initialValue: valuePosition,
            validateTrigger: 'onBlur',
            rules: [{ validator: validatePosition }],
          })(<Input placeholder="Nh???p ch???c v???" maxLength={255} onPaste={pastePosition} />)}
        </Form.Item>
        <Form.Item label="Ph??ng ban" className="group-area">
          {getFieldDecorator('department', {
            initialValue: valueDepartment,
            validateTrigger: 'onBlur',
            rules: [{ validator: validateDepartment }],
          })(<Input placeholder="Nh???p ph??ng ban" maxLength={255} onPaste={pasteDepartment} />)}
        </Form.Item>
        <Form.Item label="????n v??? tri???n khai" className="group-area">
          {getFieldDecorator('organization', {
            initialValue: valueOrganization,
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateUnit }],
          })(<Input placeholder="Nh???p ????n v??? tri???n khai" maxLength={255} onPaste={pasteOrganization} />)}
        </Form.Item>
        <Form.Item label="?????a ch???" className="group-area">
          {getFieldDecorator('address', {
            initialValue: valueAddress,
            validateTrigger: 'onBlur',
            rules: [{ validator: validateAddress }],
          })(<Input placeholder="Nh???p ?????a ch??? ????n v???" maxLength={255} onPaste={pasteAddress} />)}
        </Form.Item>
        <Form.Item label="Tr???c thu???c" className="group-area">
          {getFieldDecorator('under', {
            initialValue: Under.INTERNAL,
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
          })(
            <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
              <Select.Option value={Under.INTERNAL}>Trong b??? KH&??T</Select.Option>
              <Select.Option value={Under.EXTERNAL}>Ngo??i b??? KH&??T</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Vai tr?? tr??n h??? th???ng" className="group-area">
          {getFieldDecorator('role', {
            initialValue: UserRole.PROVIDER,
            rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
          })(
            <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
              <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
              <Select.Option value={UserRole.PROVIDER}>Nh?? cung c???p d???ch v??? chia s???</Select.Option>
              <Select.Option value={UserRole.CONSUMER}>Ng?????i s??? d???ng d???ch v??? chia s???</Select.Option>
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
            T???o m???i
          </Button>
          <Button type="default" className="mr-3" onClick={onBtnCancelClicked} style={{ float: 'right' }}>
            H???y
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default conn(Form.create<IProps>()(CreateUserForm));
