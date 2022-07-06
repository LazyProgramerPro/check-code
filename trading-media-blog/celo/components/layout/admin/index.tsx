import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import useTranslation from "next-translate/useTranslation";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation("common");
  return (
    <Container>
      <Head>
        <title>{t("trading_coin_admin_panel")}</title>
      </Head>
      <Sidebar onCollapse={setCollapsed} />
      <Content collapsed={collapsed}>{children}</Content>
    </Container>
  );
}

const Container = styled(Layout)`
  display: flex;
  background-color: #f3f4f9;
  min-height: 100vh;
`;

const Content = styled(Layout.Content)`
  margin-left: ${(prop) => (prop.collapsed ? "80px" : "200px")};
  padding: 18px 20px;
  padding-top: 100px;
  transition: all 0.2s;

  .page-header {
    left: ${(prop) => (prop.collapsed ? "80px" : "200px")};
  }
`;
