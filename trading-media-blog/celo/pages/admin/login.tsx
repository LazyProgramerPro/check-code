import React from "react";
import styled from "styled-components";
import { Button, Form, Input, notification } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { STORAGE } from "../../constants/common";
import request from "../../utils/request";
import useTranslation from "next-translate/useTranslation";

export default function login() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const { data } = await request.post("users/login", values);
      localStorage.setItem(STORAGE.TOKEN, data.accessToken);
      localStorage.setItem(STORAGE.USER, JSON.stringify(data.result));

      router.push("/admin");
      notification.success({
        message: t("login_success"),
      });
    } catch (e) {
      localStorage.removeItem(STORAGE.TOKEN);
      localStorage.removeItem(STORAGE.USER);

      notification.error({
        message: t("login_fail"),
        description: t("account_or_password_wrong"),
      });
    }
  };

  return (
    <>
      <Head>
        <title>Trading Coin - Admin Panel</title>
      </Head>
      <LoginContainer>
        <LoginForm onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            label={t("account")}
            rules={[
              {
                required: true,
                message: t("input_account"),
              },
            ]}
          >
            <StyledInput />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("password")}
            rules={[
              {
                required: true,
                message: t("input_password"),
              },
            ]}
          >
            <StyledInputPassword />
          </Form.Item>
          <StyledButton block type="primary" htmlType="submit">
            {t("login")}
          </StyledButton>
        </LoginForm>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f9;
`;

const LoginForm = styled(Form)`
  width: 300px;
  max-width: 90%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: #ccc 0 0 5px;
`;

const StyledInput = styled(Input)`
  border-radius: 5px;
`;

const StyledInputPassword = styled(Input.Password)`
  border-radius: 5px;
`;

const StyledButton = styled(Button)`
  border-radius: 5px;
`;
