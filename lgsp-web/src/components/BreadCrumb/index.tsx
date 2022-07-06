import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Route {
  path: string;
  breadcrumbName: string;
  icon?: ReactNode;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}

export interface IBreadCrumb {
  routes?: Route[];
  actionName?: string;
  iconAction?: ReactNode;
  onClick?: () => void;
}

const BreadCrumb = (props: IBreadCrumb) => {
  const { actionName, iconAction, onClick } = props;

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <div className="bread-item">
        {route?.icon}
        {route.breadcrumbName}
      </div>
    ) : (
      <Link to={paths.join('/')} className="bread-item">
        {route?.icon}
        <span>{route.breadcrumbName}</span>
      </Link>
    );
  }

  const handleClickAction = () => {
    onClick && onClick();
  };
  const Content = styled.div`
    color: rgba(0, 0, 0, 0.65);
    margin-top: 0px;
    padding: 14px 0px;
    /* height: 0px; */
  `;
  const View = styled.div`
    .breadcrumb-container {
      height: 58px;
    }
  `;
  return (
    <View>
      <div className="breadcrumb-container">
        <Content> Danh sách người dùng</Content>
        <div className="breadcrumb-right">
          {actionName && (
            <div className="action">
              <Button onClick={handleClickAction} className="button" icon="plus-circle" style={{ border: 'none' }}>
                {iconAction}
                {actionName}
              </Button>
            </div>
          )}
        </div>
      </div>
    </View>
  );
};

export default BreadCrumb;
