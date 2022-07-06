import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'src/redux/reducers';
import {Button, Form, Modal} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import Password from 'antd/lib/input/Password';
import {changePassword, hideChangePasswordForm} from './.././redux/actions';
import Loading from 'src/components/Loading';

const mapState = ({auth: {changePassword, changePasswordFrom, auth}}: RootState) => ({
  changePassword,
  changePasswordFrom,
  auth,
});

const mapDispatch = {
  hideChangePasswordForm,
  changePassword
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ChangePasswordModal(props: IProps) {
  let retypeNewPassword: any;
  const {getFieldDecorator, resetFields} = props.form;

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  useEffect(() => {
    if (props.changePasswordFrom.visible) {
      resetFields();
    }
    // eslint-disable-next-line
  }, [props.changePasswordFrom.visible]);

  function handleCancel(e: any) {
    e.target.disabled = true;
    e.target.disabled = false;
    resetFields();
    props.hideChangePasswordForm();
  }

  function handleSubmit(e: any) {
    e.stopPropagation();
    e.target.disabled = true;
    e.target.disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (values.new_password !== values.retype_new_password) {
        return false;
      }
      if (!err) {
        const mode = {
          id: props.auth.data?.user.id,
          old_password: values.old_password,
          new_password: values.new_password,
        };
        props.changePassword(mode);
      }
    });
    return false;
  }

  const compareToNewPassword = (rule: any, value: any, callback: any) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('new_password') && value.length >= 8) {
      callback('Nhập lại mật khẩu mới không trùng khớp.');
    } else {
      callback();
    }
  }

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = props.form;
    if (value && value.length >= 8) {
      props.form.validateFields(['retype_new_password']);
    }
    callback();
  }

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title="Đổi mật khẩu"
      visible={props.changePasswordFrom?.visible}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        props.hideChangePasswordForm();
      }}
      footer={""}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Mật khẩu hiện tại">
          {getFieldDecorator('old_password', {
            initialValue: '',
            rules: [{required: true, message: 'Trường Mật khẩu hiện tại bắt buộc'}],
          })(<Password></Password>)}
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          {getFieldDecorator('new_password', {
            initialValue: '',
            rules: [
              {required: true, message: 'Trường Mật khẩu mới bắt buộc'},
              {min: 8, message: 'Mật khẩu phải >=8 kí tự'},
              {max: 20, message: 'Không cho phép nhập Mật khẩu quá 20 kí tự'},
              {
                validator: compareToFirstPassword,
              }
            ],
          })(<Password maxLength={20}></Password>)}
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu mới">
          {getFieldDecorator('retype_new_password', {
            initialValue: '',
            rules: [{
              required: true, message: 'Trường Nhập lại mật khẩu mới bắt buộc',
            },
              {min: 8, message: 'Mật khẩu phải >=8 kí tự'},
              {max: 20, message: 'Không cho phép nhập Mật khẩu quá 20 kí tự'},
              {
                validator: compareToNewPassword,
              }],
          })(<Password ref={element => retypeNewPassword = element} maxLength={20}></Password>)}
        </Form.Item>
        <Form.Item label=" " style={{marginBottom: '0'}} colon={false}>
          <Button type="danger" htmlType="submit" onClick={handleSubmit}>
            Đổi mật khẩu
          </Button>
          <Button type="default" className="ml-3 pl-5 pr-5" onClick={handleCancel}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
      {props.changePassword.loading ? <Loading/> : null}
    </Modal>
  );
}

export default connector(Form.create<IProps>()(ChangePasswordModal));
