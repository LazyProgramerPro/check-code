import { Avatar, Dropdown, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Scrollbar from "react-custom-scrollbars";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import {
  FiBook,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClipboard,
  FiSettings,
} from "react-icons/fi";
import styled from "styled-components";

import useAuth from "../../../hooks/useAuth";
import vnFlag from "../../../assets/vn.png";
import enFlag from "../../../assets/en.png";
import Image from "next/image";

export default function Sidebar({ onCollapse }) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { lang } = useTranslation();

  return (
    <StyledSider collapsed={collapsed} theme="light">
      <div className="logo"></div>
      <ButtonCollapse
        onClick={() => {
          setCollapsed(!collapsed);
          onCollapse && onCollapse(!collapsed);
        }}
      >
        {collapsed ? (
          <FiChevronRight fontSize={16} />
        ) : (
          <FiChevronLeft fontSize={16} />
        )}
      </ButtonCollapse>
      <Scrollbar universal>
        <Menu
          inlineCollapsed={collapsed}
          mode="inline"
          defaultSelectedKeys={router.pathname.split("/")}
          defaultOpenKeys={router.pathname.split("/")}
        >
          <Menu.Item key="category" icon={<FiBook />}>
            <Link href="/admin/category">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="post" icon={<FiClipboard />}>
            <Link href="/admin/post">Bài viết</Link>
          </Menu.Item>
          <Menu.Item key="setting" icon={<FiSettings />}>
            <Link href="/admin/setting">Cấu hình</Link>
          </Menu.Item>
        </Menu>
      </Scrollbar>
      <StyledUser collapsed={collapsed}>
        <Dropdown
          trigger={["click"]}
          placement="topRight"
          overlay={
            <Menu>
              <Menu.Item onClick={() => setLanguage("vn")}>
                Tiếng Việt
              </Menu.Item>
              <Menu.Item onClick={() => setLanguage("en")}>English</Menu.Item>
            </Menu>
          }
        >
          <div>
            <Avatar size={40} style={{ background: "transparent" }}>
              <Image
                src={lang === "vn" ? vnFlag : enFlag}
                height={20}
                width={30}
              />
            </Avatar>
            <div className="user-info">
              {lang === "vn" ? "Tiếng Việt" : "English"}
            </div>
          </div>
        </Dropdown>
      </StyledUser>
      <StyledUser collapsed={collapsed}>
        <Avatar size={40}>{user?.username}</Avatar>
        <div className="user-info">
          <b>{user?.username}</b>
        </div>
        <span className="user-info-icon">
          <FiChevronDown />
        </span>
      </StyledUser>
    </StyledSider>
  );
}

const StyledSider = styled(Sider)`
  position: fixed;
  height: 100vh;
  background-color: #fff;
  z-index: 1001;

  .logo {
    height: 60px;
    background-color: #f4f4f4;
    margin: 10px 20px;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-flow: column;

    .ant {
      &-menu {
        &-sub {
          list-style: circle;

          .ant-menu-inline {
            background-color: #f9f9fb;
          }

          .ant-menu {
            &-item {
              height: 48px;
              line-height: 48px;
              margin: 0;
            }
          }
        }

        &-inline {
          &-collapsed {
            .ant-menu-item-icon {
              font-size: 20px !important;
              vertical-align: middle;
            }
          }
        }

        &-submenu {
          &-title {
            height: 48px !important;

            &:hover {
              color: #246bfe;

              a {
                color: #246bfe;
              }
            }
          }

          &-active,
          &-open,
          &-selected {
            .ant-menu-submenu-title {
              color: #246bfe;

              .ant-menu-item-icon {
                color: #246bfe;
              }
            }
          }
        }

        &-item {
          height: 48px;
          line-height: 48px;

          &:hover {
            color: #246bfe;

            a,
            .ant-menu-item-icon,
            .ant-menu-title-content {
              color: #246bfe;
            }
          }

          &-active {
            a,
            .ant-menu-item-icon,
            .ant-menu-title-content {
              color: #246bfe;
            }
          }

          &-icon {
            font-size: 20px;
            color: #95a1ac;
          }

          &-selected {
            background-color: #f3f4f9 !important;
            color: #246bfe;

            a,
            .ant-menu-item-icon,
            .ant-menu-title-content {
              color: #246bfe;
            }

            &::after {
              content: unset;
            }

            .ant-menu-item-dot {
              background-color: #246bfe;
            }
          }

          &-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-left: -24px;
            margin-right: 5px;
            min-width: 8px;
            max-width: 8px;
            background-color: #d9d9e4;
          }
        }
      }
    }
  }
`;

const ButtonCollapse = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  top: 20px;
  right: -15px;
  border: 0;
  padding: 0;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  z-index: 10;
`;

const StyledUser = styled.div`
  display: flex;
  height: 80px;
  bottom: 0;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "space-between")};
  border-top: 1px solid #f4f4f7;
  transition: all 0.2s;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;

  .user-info {
    display: ${(props) => (props.collapsed ? "none" : "unset")};
    flex: 1;
    margin: 0 10px;

    &-icon {
      display: ${(props) => (props.collapsed ? "none" : "unset")};
    }
  }
`;
