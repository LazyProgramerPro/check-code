import { AutoComplete, Button, Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import { NotificationError, NotificationSuccess } from '../../../components/Notification/Notification';
import { Under, UserRole, UserStatus } from '../../../models/common';
import { RootState } from '../../../redux/reducers';
// import { getAllOrganization } from '../../DataPublic/redux/service/apis';
import { acceptUser } from '../redux/action/create_user';
import { UpdateUserParam, UserEntity } from '../redux/models';
import { checkExistEmail, getUser, updateUser } from '../redux/service/apis';
import ModalReason from './ModalReason';
import { validateEmail, validatePhoneNumber } from '../../../constants/common';

const mapStateToProps = (rootState: RootState) => ({
  updateState: rootState.user.updateState,
  createState: rootState.user.createState,
  authState: rootState.auth.auth,
});

const conn = connect(mapStateToProps, { acceptUser });

type ReduxProps = ConnectedProps<typeof conn>;

interface IProps extends ReduxProps, FormComponentProps {}

const UserDetailPage = (props: IProps) => {
  const { createState } = props;
  const history = useHistory();

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

  const params: any = useParams();
  const [accountId] = useState<string>(params.accountId);
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
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState(false);
  const [organizationData, setOrganizationData] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserEntity>(initUserData);

  const [openModalReason, setOpenModalReason] = useState<boolean>(false);

  const handleOpenModalReason = () => {
    setOpenModalReason(true);
  };

  const handleCloseModalReason = () => {
    setOpenModalReason(false);
  };

  useEffect(() => {
    if (props.authState.data?.role !== UserRole.ADMIN_VALUE) {
      return;
    }
    getUser(accountId)
      .then(rs => {
        if (rs.code != 0) {
          setLoading(false);
          NotificationError('Thất bại', 'Lấy thông tin người dùng không thành công');
          return;
        }
        setUserData(rs.item);
        setLoading(false);
      })
      .catch(() => {
        NotificationError('Thất bại', 'Lấy thông tin người dùng không thành công');
        setLoading(false);
      });

    // getAllOrganization().then(rs => {
    //   if (rs.code != 0) {
    //     return;
    //   }
    //   const data: string[] = rs.rows.map(item => item.name);
    //   setOrganizationData(data);
    // });
  }, [accountId, props.authState.data, props.createState.loading]);

  const onBtnUpdateUserClicked = (e: any) => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
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
          password: values.password,
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

        updateUser(param)
          .then(rs => {
            if (rs.code !== 0) {
              setLoading(false);
              NotificationError('Thất bại', rs.message);
              return;
            }
            setLoading(false);
            NotificationSuccess('Thành công', 'Cập nhật thông tin tài khoản thành công');
          })
          .catch(rs => {
            setLoading(false);
            NotificationError('Thất bại', rs.message);
          });
      }
    });
  };

  const onBtnCancelClicked = (e: any) => {
    history.push('/manager-account/users');
  };

  const onBtnApproveUserClicked = (e: any) => {
    props.acceptUser(accountId);
  };

  const onBtnRejectUserClicked = (e: any) => {
    handleOpenModalReason();
  };

  const onChangeDisableField = (e: any) => {
    e.stopPropagation();
  };

  const validateEmailInput = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback();
    }
    if (value === userData.email) {
      return true;
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
    if (value.length === 0) {
      callback();
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
      <div className="header">Thông tin người dùng</div>

      <div className="content">
        {props.authState.data?.role === UserRole.ADMIN_VALUE ? (
          <div className="mb-3">
            <span style={{ color: 'red' }}>Thông tin của tài khoản : {userData?.username}</span>
            {userData.status === UserStatus.ACTIVE ? (
              <span style={{ color: 'green', marginLeft: '20px' }}>(Hoạt động)</span>
            ) : (
              <>
                {userData.status === UserStatus.PENDING ? (
                  <span style={{ color: 'orange', marginLeft: '20px' }}>(Tạo mới)</span>
                ) : (
                  <span style={{ color: 'red', marginLeft: '20px' }}>(Không hoạt động)</span>
                )}
              </>
            )}
          </div>
        ) : null}
        <div style={{ maxWidth: '650px' }}>
          <Form {...formItemLayout}>
            <Form.Item label="Tên tài khoản" className="group-area">
              {getFieldDecorator('username', {
                initialValue: userData.username,
              })(
                <Input
                  disabled={true}
                  placeholder="Nhập tên tài khoản"
                  onChange={onChangeDisableField}
                  maxLength={255}
                />,
              )}
            </Form.Item>
            <Form.Item label="Họ và tên" className="group-area">
              {getFieldDecorator('name', {
                initialValue: userData.fullName,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateName }],
              })(
                <Input type="text" placeholder="Nhập họ và tên" maxLength={255} onPaste={event => pasteName(event)} />,
              )}
            </Form.Item>
            <Form.Item label="Số điện thoại" className="group-area">
              {getFieldDecorator('phone', {
                initialValue: userData.phoneNumber,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePhone }],
              })(<Input placeholder="Nhập số điện thoại" />)}
            </Form.Item>
            <Form.Item label="Email" className="group-area">
              {getFieldDecorator('email', {
                initialValue: userData.email,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateEmailInput }],
              })(<Input disabled={true} placeholder="Nhập email" maxLength={255} />)}
            </Form.Item>
            <Form.Item label="Chức vụ" className="group-area">
              {getFieldDecorator('position', {
                initialValue: userData.position,
                validateTrigger: 'onBlur',
                rules: [{ validator: validatePosition }],
              })(<Input placeholder="Nhập chức vụ" maxLength={255} onPaste={event => pastePosition(event)} />)}
            </Form.Item>
            <Form.Item label="Phòng ban" className="group-area">
              {getFieldDecorator('department', {
                initialValue: userData.department,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateDepartment }],
              })(<Input placeholder="Nhập phòng ban" maxLength={255} onPaste={event => pasteDepartment(event)} />)}
            </Form.Item>
            <Form.Item label="Đơn vị triển khai" className="group-area">
              {getFieldDecorator('organization', {
                initialValue: userData.organization,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateUnit }],
              })(
                <Input
                  placeholder="Nhập đơn vị triển khai"
                  maxLength={255}
                  onPaste={event => pasteOrganization(event)}
                />,
              )}
            </Form.Item>
            <Form.Item label="Địa chỉ" className="group-area">
              {getFieldDecorator('address', {
                initialValue: userData.address,
                validateTrigger: 'onBlur',
                rules: [{ validator: validateAddress }],
              })(<Input placeholder="Nhập địa chỉ đơn vị" maxLength={255} onPaste={event => pasteAddress(event)} />)}
            </Form.Item>
            <Form.Item label="Trực thuộc" className="group-area">
              {getFieldDecorator('under', {
                initialValue: userData.under,
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
                initialValue:
                  userData.role === 0 ? UserRole.ADMIN : userData.role === 1 ? UserRole.PROVIDER : UserRole.CONSUMER,
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
              })(
                <Select showSearch style={{ width: '100%' }} optionFilterProp="children" allowClear={true}>
                  <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
                  <Select.Option value={UserRole.PROVIDER}>Nhà cung cấp dịch vụ chia sẻ</Select.Option>
                  <Select.Option value={UserRole.CONSUMER}>Người sử dụng dịch vụ chia sẻ</Select.Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label={' '} className="group-area">
              <div>
                {userData.status === UserStatus.PENDING ? (
                  <>
                    <Button type="primary" className="mr-3" onClick={onBtnApproveUserClicked}>
                      Duyệt
                    </Button>
                    <Button className="mr3" type="danger" onClick={onBtnRejectUserClicked}>
                      Từ chối
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="default" className="mr-3" onClick={onBtnCancelClicked}>
                      Hủy
                    </Button>
                    <Button className="mr-3" type="primary" htmlType="submit" onClick={onBtnUpdateUserClicked}>
                      Lưu
                    </Button>
                  </>
                )}
              </div>
            </Form.Item>
          </Form>
          {createState.loading ? <Loading /> : null}
        </div>
      </div>

      <ModalReason visible={openModalReason} onClose={handleCloseModalReason} accountId={accountId} />
    </Wrapper>
  );
};

export default conn(Form.create<IProps>()(UserDetailPage));

const Wrapper = styled.div`
  padding: 10px 15px;

  .header {
    height: 52px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .content {
    padding: 10px 15px;
    background-color: #fff;
  }
`;
