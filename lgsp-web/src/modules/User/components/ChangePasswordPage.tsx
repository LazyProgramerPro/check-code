import React, { useState } from 'react';
import { Breadcrumb, Form, Input } from 'antd';
import { RootState } from '../../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import Password from 'antd/es/input/Password';

const mapStateToProps = (rootState: RootState) => ({
  authState: rootState.auth.auth,
});

const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {}

const ChangePasswordPage = (props: IProps) => {
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
  const [firstPassword, setFirstPassword] = useState('');

  return (
    <div style={{ marginBottom: '50px' }}>
      <Breadcrumb style={{ width: '98%', margin: '20px auto 20px' }}>
        <Breadcrumb.Item>Thay đổi mật khẩu tài khoản cá nhân</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="Nhập mật khẩu cũ" className="group-area">
            {getFieldDecorator('oldPassword', {
              initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Password placeholder="Nhập mật khẩu cũ" maxLength={255}/>)}
          </Form.Item>
          <Form.Item label="Nhập mật khẩu mới" className="group-area">
            {getFieldDecorator('newPassword', {
              initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Password placeholder="Nhập mật khẩu mới" maxLength={255}/>)}
          </Form.Item>
          <Form.Item label="Xác nhận mật khẩu mới" className="group-area">
            {getFieldDecorator('retypeNewPassword', {
              initialValue: '',
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }],
            })(<Password placeholder="Nhập mật khẩu cũ" maxLength={255}/>)}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connector(Form.create<IProps>()(ChangePasswordPage));
