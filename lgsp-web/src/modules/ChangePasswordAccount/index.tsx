import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { RootState } from 'src/redux/reducers';
import styled from 'styled-components';
import { changePasswordSelfApi, validatePassWordAccount } from './service/api';
import { ParamsOldPassword, ParamsUpdatePassword } from './service/models';

const mapState = (rootState: RootState) => ({});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux, FormComponentProps {}

function ChangePasswordAccount(props: IProps) {
  const history = useHistory();
  const { getFieldDecorator, getFieldValue } = props.form;

  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params: ParamsUpdatePassword = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          reNewPassword: values.reNewPassword,
        };

        setLoading(true);

        changePasswordSelfApi(params)
          .then(res => {
            setLoading(false);

            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Thay đổi mật khẩu thành công');
              return;
            }
            if (res.code !== 0) {
              NotificationError('Thất bại', res.message);
            }
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Thất bại', err.message);
          });
      }
    });
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[:\[\]\\;".,|/+={}~`?!@'#$%<>^&*()_-])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d:\[\]\\;".,|/+={}~<>`?!@'#$%^&*()_-]{8,}$/;

    if (value === undefined || value.trim() === '') {
      callback();
    } else if (!regex.test(value)) {
      callback(
        'Mật khẩu phải có tối thiểu 8 ký tự bao gồm một chữ cái viết hoa, một ký tự đặc biệt và các ký tự chữ và số.',
      );
    } else {
      callback();
    }
  };

  const compareToOldPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== getFieldValue('newPassword')) {
      callback('Mật khẩu và Xác nhận mật khẩu không trùng nhau. Vui lòng kiểm tra lại');
    } else {
      callback();
    }
  };

  // const validateOldPassword = (rule: any, value: any, callback: any) => {
  //   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/;

  //   if (value === undefined || value.trim() === '') {
  //     callback();
  //   } else if (!regex.test(value)) {
  //     callback('Sai mật khẩu');
  //   } else {
  //     callback();
  //   }
  // };
  const onBlurPasswordInput = (rule: any, text: any, callback: any) => {
    // const value: string = e.target.value;
    // if (value === undefined || value === '') {
    //   return;
    // }
    // let param : ParamsOldPassword = {
    //   password: pass
    // };
    // validatePassWordAccount().then(rs => {});
    try {
      props.form.validateFields((err, values) => {
        if (!err) {
          const params: ParamsOldPassword = {
            password: values.password,
          };
          const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/;
          if (!regex.test(text)) {
            callback('Mật khẩu cũ không chính xác');
          }
          const response = validatePassWordAccount(params);
          response
            .then(rs => {
              if (rs.code != 0) {
                callback('Mật khẩu cũ không chính xác');
              } else {
                callback();
              }
            })
            .catch(rs => {});
        }
      });
    } catch (error) {}
  };

  const validatePasswordOld = (rule: any, text: any, callback: any) => {
    if (text == undefined || text.length == 0) {
      return callback();
    }
    const form = props.form;
    // const params = form.getFieldValue('oldPassword');
    const params: ParamsOldPassword = {
      password: form.getFieldValue('oldPassword'),
    };
    const response = validatePassWordAccount(params);
    response.then(rs => {
      if (rs.code !== 0) {
        return callback('Sai mật khẩu');
      }
      return callback();
    });
  };

  return (
    <Wrapper>
      <div className="header">Thay đổi mật khẩu tài khoản cá nhân</div>
      <div className="containerChangePass">
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item label="Mật khẩu hiện tại">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePasswordOld }],
            })(<Input.Password autoComplete="new-password" maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Mật khẩu mới">
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePassword }],
            })(<Input.Password maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Xác nhận mật khẩu mới">
            {getFieldDecorator('reNewPassword', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: compareToOldPassword }],
            })(<Input.Password maxLength={255} />)}
          </Form.Item>

          <Form.Item label={' '}>
            <div className="container-button">
              <Button className="mr-3" onClick={handleCancel}>
                Hủy
              </Button>

              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Thay đổi
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {loading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0px 15px;
  .header {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }

  .containerChangePass {
    width: 100%;
    padding: 10px 15px;
    background-color: #fff;
    &-button {
      margin-top: 20px;
    }
  }
`;

export default connector(Form.create<IProps>()(ChangePasswordAccount));
