import { Tabs } from 'antd';
import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
interface IConfigItems {}

const MenuLinks = ({ label, to, exact = false }: { label: string; to: string; exact?: boolean }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => {
        const active = match ? 'active-config' : '';
        return (
          <div className={`item`}>
            <NavLink className={`item-link ${active}`} to={to}>
              {label}
            </NavLink>
          </div>
        );
      }}
    />
  );
};

const ConfigItems = (props: IConfigItems) => {
  const { path, url } = useRouteMatch();
  return (
    <View>
      <MenuLinks label="Tổng quan" exact={true} to={url} />

      <MenuLinks label="Thông tin chung" to={`${url}/general-information`} />

      <MenuLinks label="Resources" to={`${url}/resources`} />

      <MenuLinks label="Endpoint" to={`${url}/endpoint`} />

      <MenuLinks label="Giới hạn truy cập" to={`${url}/business-plan`} />

      <MenuLinks label="Runtime" to={`${url}/runtime`} />

      <MenuLinks label="Triển khai" to={`${url}/implementation`} />

      <MenuLinks label="Tài liệu " to={`${url}/documentation`} />

      <MenuLinks label="Kiểm thử" to={`${url}/testing`} />
    </View>
  );
};

export default ConfigItems;

const View = styled.div`
  height: 45px;
  display: flex;
  align-items: center;

  background-color: #fff;

  border-bottom: 1px solid #e8e8e8;
  .item {
    &-link {
      display: inline-block;
      color: inherit;
      padding: 0px 15px;
      height: 45px;
      line-height: 45px;

      &:hover {
        color: #1890ff;
        border-bottom: 2px solid #1890ff;
      }
    }
  }

  .active-config {
    border-bottom: 2px solid #1890ff;
    color: #1890ff;
    font-weight: 500;
  }
`;
