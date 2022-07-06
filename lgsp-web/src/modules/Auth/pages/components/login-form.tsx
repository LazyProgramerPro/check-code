import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import Styled from './../styled/loginStyled';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useHistory} from "react-router";

interface IProps extends FormComponentProps {
  onLogin(username: string, password: string, remember?: boolean, previous?: string): void;

  loading: boolean;
}

const View = styled.div`
  .has-error .ant-form-explain {
    margin-top: 5px;
  }
`;

export const Login = (props: IProps) => {
  const { getFieldDecorator } = props.form;
  const [data, setData] = useState({ remember: false });
  const [initUsername, setInitUsername] = useState('');
  const [initPassword, setInitPassword] = useState('');

  const history: any = useHistory();

  useEffect(() => {
    const remember: string = localStorage.getItem('auth-n-remember') || '';
    if (remember == 'true') {
      setData({
        ...data,
        remember: true,
      });
      const username = localStorage.getItem('auth-n-username') || '';
      setInitUsername(username);
      const password = localStorage.getItem('auth-n-password') || '';
      setInitPassword(password);
    }
  }, []);

  const onCheckRememberPasswordChange = () => {
    setData({
      ...data,
      remember: !data.remember,
    });
  };

  const onLoginFormSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const previous:any = history.location.state;
        if( previous == undefined){
          props.onLogin(values.username, values.password, data.remember, '');
        }else{
          props.onLogin(values.username, values.password, data.remember, previous.from.pathname);
        }
      }
    });
  };

  return (
    <View>
      <Styled.Container>
        <div className="loginContent">
          <Row gutter={16}>
            <Col span={24}>
              {/* <h3 className="title">Đăng nhập</h3> */}
              <Form onSubmit={onLoginFormSubmit}>
                <Form.Item label="Tên đăng nhập">
                  {getFieldDecorator('username', {
                    initialValue: initUsername,
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                    ],
                    normalize: value => value.trim(),
                  })(<Input autoFocus={true} placeholder="Nhập tên đăng nhập" maxLength={255} />)}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                  {getFieldDecorator('password', {
                    initialValue: initPassword,
                    rules: [
                      {
                        required: true,
                        message: 'Đây là trường bắt buộc nhập',
                      },
                    ],
                  })(<Input type="password" placeholder="Nhập mật khẩu" autoComplete="new-password" maxLength={255} />)}
                </Form.Item>

                <div>
                  <div>
                    <Checkbox
                      checked={data.remember}
                      onChange={onCheckRememberPasswordChange}
                      className="remember-password"
                    >
                      Nhớ mật khẩu
                    </Checkbox>
                  </div>
                  <Link to="/forgot-password" className="forgot-password">
                    Quên mật khẩu
                  </Link>
                </div>

                <Form.Item style={{ textAlign: 'center' }}>
                  <Button block={true} className="mt-3" type="primary" htmlType="submit" disabled={props.loading}>
                    {props.loading ? 'Vui lòng đợi...' : 'Đăng nhập'}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Styled.Container>
    </View>
  );
};

export default Form.create<IProps>()(Login);
