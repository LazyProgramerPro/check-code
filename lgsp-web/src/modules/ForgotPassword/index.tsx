import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Footer from 'src/components/Footer';
import Loading from 'src/components/Loading';
import { NotificationError, NotificationSuccess } from 'src/components/Notification/Notification';
import { validateEmail } from 'src/constants/common';
import styled from 'styled-components';
import { sendRequestResetPasswordApi } from './services/api';

interface IProps extends FormComponentProps {}

const ForgotPassword = (props: IProps) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleSendRequest = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const email = values.email.trim();
        sendRequestResetPasswordApi(email)
          .then(res => {
            if (res.code === 0) {
              NotificationSuccess('Thành công', 'Gửi yêu cầu lấy lại mật khẩu thành công.');
              setLoading(false);
              return;
            }
            setLoading(false);
            NotificationError('Thất bại', 'Email đăng ký không tồn tại');
          })
          .catch(err => {
            setLoading(false);
            NotificationError('Thất bại', err.message);
          });
      }
    });
  };

  const validateEmailInput = (rule: any, text: any, callback: any) => {
    if (text === undefined || text.length === 0 || text === '') {
      return true;
    }
    const isValid: boolean = validateEmail(text);
    if (!isValid) {
      return callback('Email không hợp lệ');
    }
    return callback();
  };

  return (
    <>
      <Wrapper>
        <div className="containerForgotPassword">
          <div className="title">Quên mật khẩu?</div>
          <Form>
            <Form.Item label="Email đăng ký">
              {props.form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Đây là trường bắt buộc nhập' }, { validator: validateEmailInput }],
              })(<Input maxLength={255} />)}
            </Form.Item>

            <div className="containerButton">
              <Button className="btn mr-3" type="primary" onClick={handleSendRequest}>
                Gửi yêu cầu
              </Button>

              <Button className="btn" type="primary" onClick={handleGoBack}>
                Quay lại
              </Button>
            </div>
          </Form>
        </div>

        {loading && <Loading />}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: #ff6060;
  min-height: calc(100vh - 60px);

  .containerForgotPassword {
    margin: 0px auto;
    padding-top: 10%;
    max-width: 800px;
    width: 70%;
  }

  .title {
    font-size: 14px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  .ant-form-item label {
    font-size: 14px;
    color: #000000;
  }

  input {
    height: 40px;
    border-radius: 20px;
  }

  .containerButton {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    padding: 0px 20px;
    border: none;
    height: 40px;
    background: #043bff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-size: 16px;
    color: #ffffff;
  }

  .has-error .ant-form-explain {
    padding-top: 10px;
    color: #ffffff;
  }
`;

export default Form.create<IProps>()(ForgotPassword);
