import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import Loading from 'src/components/Loading';
import { ChangePasswordToken } from './services/models';
import { useHistory, useParams } from 'react-router';
import { changePasswordTokenApi } from './services/api';

interface ParamPath {
  token: string;
}

interface IProps extends FormComponentProps {}

function ResetPassword(props: IProps) {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, getFieldValue } = props.form;

  const history = useHistory();
  const paramPath: ParamPath = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);

        const params: ChangePasswordToken = {
          password: values.newPassword,
          rePassword: values.confirmPassword,
          token: paramPath.token,
        };

        changePasswordTokenApi(params)
          .then(res => {
            setLoading(false);
            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Thay đổi mật khẩu thành công');
              history.replace('/login');
              return;
            }

            NotificationError('Thất bại', res.message);
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

    if (value === undefined) {
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

  return (
    <Wrapper>
      <div className="containerPassword">
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Mật khẩu mới">
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validatePassword }],
            })(<Input.Password autoComplete="new-password" maxLength={255} />)}
          </Form.Item>

          <Form.Item label="Xác nhận mật khẩu mới">
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: compareToOldPassword }],
            })(<Input.Password maxLength={255} />)}
          </Form.Item>

          <Button type="primary" htmlType="submit" className="btnAccept">
            XÁC NHẬN
          </Button>
        </Form>
      </div>

      {loading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ff6060;
  min-height: calc(100vh - 60px);
  padding-top: 10%;
  .containerPassword {
    margin: 0px auto;
    padding: 32px 40px;

    width: 70%;
    max-width: 500px;
    background: rgba(255, 255, 255, 0.53);
    border-radius: 30px;

    input {
      height: 40px;
      background: #ffffff;
      border-radius: 20px;
    }

    .ant-form-item label {
      font-size: 16px;
      color: #000000;
    }

    .btnAccept {
      display: block;
      margin: 0px auto;
      padding: 0px 40px;
      height: 40px;
      font-size: 16px;
      background: #043bff;
      border-radius: 10px;
    }
  }
`;

export default Form.create<IProps>()(ResetPassword);
