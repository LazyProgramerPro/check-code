import { AutoComplete, Button, Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { Under, UserRole } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
import { getAllOrganization } from '../../DataPublic/redux/service/apis';
import { UpdateUserParam, UserEntity } from '../redux/models';
import { checkExistEmail, getUserByUsername, updateUser } from '../redux/service/apis';
import { validateEmail, validatePhoneNumber } from '../../../constants/common';

const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
});

const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const MyAccountPage = (props: IProps) => {
  const [accountId, setAccountId] = useState<string>('');

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const { getFieldDecorator } = props.form;
  const initUserData: UserEntity = {
    username: '',
    fullName: '',
    id: '',
    email: '',
    role: -1,
    address: '',
    department: '',
    organization: '',
    password: '',
    under: '',
    position: '',
    phoneNumber: '',
    status: 0,
  };
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(true);
  const [userData, setUserData] = useState(initUserData);
  const [organizationData, setOrganizationData] = useState<string[]>([]);

  const history = useHistory();

  useEffect(() => {
    getAllOrganization().then(rs => {
      if (rs.code !== 0) {
        return;
      }
      const data: string[] = rs.rows.map(item => item.name);
      setOrganizationData(data);
    });
  }, []);

  useEffect(() => {
    const username: string = props.authState.data?.username || '';
    setLoading(true);
    const param = {
      username: username,
    };
    getUserByUsername(param)
      .then(rs => {
        if (rs.code !== 0) {
          NotificationError('Th???t b???i', rs.message);
          setLoading(false);
          return;
        }
        console.log('UserData : ' + JSON.stringify(rs.item));
        setAccountId(rs.item?.id || '');
        setUserData(rs.item);
        setLoading(false);
      })
      .catch(err => {
        NotificationError('Th???t b???i', err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloading]);

  const onBtnUpdateUserClicked = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let role: number = -1;
        if (values.role == UserRole.ADMIN) {
          role = UserRole.ADMIN_VALUE;
        } else if (values.role == UserRole.PROVIDER) {
          role = UserRole.PROVIDER_VALUE;
        } else {
          role = UserRole.CONSUMER_VALUE;
        }

        let param: UpdateUserParam = {
          accountId: accountId,
          fullName: values.name,
          email: values.email,
          phoneNumber: values.phone,
          position: values.position,
          department: values.department,
          organization: values.organization,
          address: values.address,
          under: values.under,
          role: role,
        };

        setLoading(true);
        updateUser(param)
          .then(rs => {
            console.log(JSON.stringify(rs));
            if (rs.code !== 0) {
              NotificationError('Th???t b???i', rs.message);
              setLoading(false);
              return;
            }
            NotificationSuccess('Th??nh c??ng', 'C???p nh???t th??ng tin ng?????i d??ng th??nh c??ng');
            setLoading(false);
          })
          .catch(rs => {
            NotificationError('Th???t b???i', rs.message);
            setLoading(false);
          });
      }
    });
  };

  const validateCheckEmail = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback();
    }
    if (value === userData.email) {
      return true;
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

  const onBtnCancelClicked = (e: any) => {
    e.preventDefault();
    setReloading(!reloading);
    history.goBack();
  };

  const onChangeDisableField = (e: any) => {};

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
          name: {
            value: checkValue,
          },
        });
        return callback();
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
  //onPaste
  const pasteName = (value: any) => {
    const valueName = props.form.getFieldValue('name');
    props.form.setFields({
      name: {
        value: valueName.trim() + ' ',
      },
    });
  };

  const pastePosition = (value: any) => {
    const valuePosition = props.form.getFieldValue('position');
    props.form.setFields({
      position: {
        value: valuePosition.trim() + ' ',
      },
    });
  };

  const pasteDepartment = (value: any) => {
    const valueDepartment = props.form.getFieldValue('department');
    props.form.setFields({
      department: {
        value: valueDepartment.trim() + ' ',
      },
    });
  };

  const pasteOrganization = (value: any) => {
    const valueOrganization = props.form.getFieldValue('organization');
    props.form.setFields({
      organization: {
        value: valueOrganization.trim() + ' ',
      },
    });
  };

  const pasteAddress = (value: any) => {
    const valueAddress = props.form.getFieldValue('address');
    props.form.setFields({
      address: {
        value: valueAddress.trim() + ' ',
      },
    });
  };

  return (
    <Wrapper>
      <div className="header">Th??ng tin t??i kho???n c?? nh??n</div>

      <div className="content">
        <div style={{ maxWidth: '650px' }}>
          <Form {...formItemLayout}>
            <Form.Item label="T??n t??i kho???n" className="group-area">
              {getFieldDecorator('username', {
                initialValue: userData.username,
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
              })(<Input disabled={true} placeholder="Nh???p t??n t??i kho???n" onChange={onChangeDisableField} />)}
            </Form.Item>
            <Form.Item label="H??? v?? t??n" className="group-area">
              {getFieldDecorator('name', {
                initialValue: userData.fullName,
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateName }],
                validateTrigger: 'onBlur',
              })(
                <Input type="text" placeholder="Nh???p h??? v?? t??n" maxLength={255} onPaste={event => pasteName(event)} />,
              )}
            </Form.Item>
            <Form.Item label="S??? ??i???n tho???i" className="group-area">
              {getFieldDecorator('phone', {
                initialValue: userData.phoneNumber,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validatePhone }],
              })(<Input placeholder="Nh???p s??? ??i???n tho???i" />)}
            </Form.Item>
            <Form.Item label="Email" className="group-area">
              {getFieldDecorator('email', {
                initialValue: userData.email,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateCheckEmail }],
              })(<Input disabled={true} placeholder="Nh???p email" maxLength={255} />)}
            </Form.Item>
            <Form.Item label="Ch???c v???" className="group-area">
              {getFieldDecorator('position', {
                initialValue: userData.position,
                rules: [{ validator: validatePosition }],
                validateTrigger: 'onBlur',
              })(<Input placeholder="Nh???p ch???c v???" maxLength={255} onPaste={event => pastePosition(event)} />)}
            </Form.Item>
            <Form.Item label="Ph??ng ban" className="group-area">
              {getFieldDecorator('department', {
                initialValue: userData.department,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateDepartment }],
              })(<Input placeholder="Nh???p ph??ng ban" maxLength={255} onPaste={event => pasteDepartment(event)} />)}
            </Form.Item>
            <Form.Item label="????n v??? tri???n khai" className="group-area">
              {getFieldDecorator('organization', {
                initialValue: userData.organization,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }, { validator: validateUnit }],
              })(
                <Input
                  placeholder="Nh???p ????n v??? tri???n khai"
                  maxLength={255}
                  onPaste={event => pasteOrganization(event)}
                />,
              )}
            </Form.Item>
            <Form.Item label="?????a ch???" className="group-area">
              {getFieldDecorator('address', {
                initialValue: userData.address,
                rules: [{ validator: validateAddress }],
                validateTrigger: 'onBlur',
              })(<Input placeholder="Nh???p ?????a ch??? ????n v???" maxLength={255} onPaste={event => pasteAddress(event)} />)}
            </Form.Item>
            <Form.Item label="Tr???c thu???c" className="group-area">
              {getFieldDecorator('under', {
                initialValue: userData.under,
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
                validateTrigger: 'onBlur',
              })(
                <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
                  <Select.Option value={Under.INTERNAL}>Trong b??? KH&??T</Select.Option>
                  <Select.Option value={Under.EXTERNAL}>Ngo??i b??? KH&??T</Select.Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Vai tr?? tr??n h??? th???ng" className="group-area">
              {getFieldDecorator('role', {
                initialValue:
                  userData.role === 0 ? UserRole.ADMIN : userData.role === 1 ? UserRole.PROVIDER : UserRole.CONSUMER,
                rules: [{ required: true, message: '????y l?? tr?????ng b???t bu???c nh???p' }],
              })(
                <Select
                  disabled={true}
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  allowClear={true}
                >
                  <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
                  <Select.Option value={UserRole.PROVIDER}>Nh?? cung c???p d???ch v??? chia s???</Select.Option>
                  <Select.Option value={UserRole.CONSUMER}>Ng?????i s??? d???ng d???ch v??? chia s???</Select.Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label={' '} className="group-area">
              <>
                <Button type="default" className="mr-3" onClick={onBtnCancelClicked}>
                  H???y
                </Button>
                <Button className="mr-3" type="primary" htmlType="submit" onClick={onBtnUpdateUserClicked}>
                  L??u
                </Button>
              </>
            </Form.Item>
          </Form>
        </div>
      </div>
      {loading ? <Loading /> : null}
    </Wrapper>
  );
};

export default connector(Form.create<IProps>()(MyAccountPage));

const Wrapper = styled.div`
  padding: 10px 15px;
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }

  .content {
    padding: 10px 15px;
    background-color: #fff;
  }
`;
