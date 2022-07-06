import { Icon, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import SubMenu from 'antd/es/menu/SubMenu';

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: !!state.auth.auth.data?.user,
    auth: state.auth.auth.data,
  };
};

interface ParentProps {
  hiddenLabel: boolean;
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends ParentProps, PropsFromRedux {}

const Nav = (props: IProps) => {
  const paths = window.location.pathname.split('/');

  return (
    <Menu className="menu-left" defaultOpenKeys={[paths[1]]} defaultSelectedKeys={[paths[2]]} mode="inline">
      <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="user" />
            <span>Quản lý nguời dùng</span>
          </span>
        }
      >
        <Menu.Item key="users" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/users">{!props.hiddenLabel ? <span>Người dùng</span> : null}</Link>
        </Menu.Item>
        <Menu.Item key="roles" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/roles">{!props.hiddenLabel ? <span>Vai trò</span> : null}</Link>
        </Menu.Item>
        <Menu.Item key="permissions" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/permissions">{!props.hiddenLabel ? <span>Quyền</span> : null}</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="home" />
            <span>Dịch vụ</span>
          </span>
        }
      >
        <Menu.Item key="groupRestApi" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/group-rest-api">{!props.hiddenLabel ? <span>Nhóm dịch vụ Restful API</span> : null}</Link>
        </Menu.Item>
        <Menu.Item key="dataServices" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/data-service">{!props.hiddenLabel ? <span>Nhóm dịch vụ Data Service</span> : null}</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default connector(Nav);
