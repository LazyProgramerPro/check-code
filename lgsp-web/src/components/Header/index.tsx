import React, { useState } from 'react';
import logo from '../../assets/images/header_logo.png';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Avatar, Button, Icon, Popover } from 'antd';
import { logout, showChangePasswordForm } from '../../modules/Auth/redux/actions';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router';

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 16px;
  .header-acc {
    display: flex;

    align-items: center;
    .anticon svg {
      color: #000000;
    }
  }
  .iconsidebar {
    margin-left: 16px;
    font-size: 19px;
  }
`;
const View = styled.div`
  .headerAdmin {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    background: white;
  }
  .anticon-user {
    color: #000000;
  }
`;
interface Iprops {
  handleShowSidebar: Function;
}

export const Header = (props: Iprops) => {
  const { handleShowSidebar } = props;

  const { path } = useRouteMatch();

  const user = useAppSelector(state => state.auth.auth.data);
  const dispatch = useAppDispatch();
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);

  const handleChangePassword = () => {
    dispatch(showChangePasswordForm());
  };

  const handleLogout = () => {
    dispatch(logout(true));
  };

  const clickShowSidebar = () => {
    handleShowSidebar();
  };

  const content = (
    <ul style={{ width: 160 }} className="list-item popup-popover">
      <li className="profile item">
        <Link to={'/my-account/' + user?.username}>Thông tin tài khoản</Link>
      </li>
      <li className="change-password item">
        <Link to={`/change-password/${user?.username}`}>Thay đổi mật khẩu</Link>
      </li>
      <li className="logout item">
        <Link onClick={handleLogout} to="avas">
          Đăng xuất
        </Link>
      </li>
    </ul>
  );

  const handleVisibleChange = (visible: boolean) => {
    setVisiblePopover(visible);
  };
  const renderMenuHeader = () => {
    let xhtml = null;
    if (user?.token) {
      xhtml = (
        <View>
          <div className="headerAdmin">
            <div>
              <Icon type="menu-unfold" onClick={clickShowSidebar} />
            </div>
            <div>
              <Avatar icon="user" />
              {/* <Icon type="user" /> */}
              <span style={{ marginLeft: 8, marginRight: 8 }}>{`${user?.username}`}</span>
              <Popover
                onVisibleChange={handleVisibleChange}
                visible={visiblePopover}
                overlayClassName="popover-userinfo"
                placement="bottomRight"
                content={content}
                trigger="click"
              >
                <Icon type="down" />
              </Popover>
            </div>
          </div>
        </View>
      );
    } else {
      xhtml = (
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/home">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/service">
              Dịch vụ
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/register">
              Đăng ký
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className={
                path === '/login' || path === '/forgot-password' || path === '/reset-password/:token' ? 'active' : ''
              }
              to="/login"
            >
              Đăng nhập
            </NavLink>
          </li>
        </ul>
      );
    }
    return xhtml;
  };

  if (user?.token) {
    return <>{renderMenuHeader()}</>;
  }

  return (
    <div className="header-wrapper">
      <div className={`header header-page main-color`}>
        {!user?.token && (
          <div className={`header--left `}>
            <div className="header--logo">
              <a href="#home">
                <img src={logo} />
              </a>
            </div>
            <div className="header--text">
              <p>bộ kế hoạch và đầu tư</p>
              <p className="text-white">nền tảng tích hợp, chia sẻ dữ liệu</p>
            </div>
          </div>
        )}

        <div className={'header--right'}>{renderMenuHeader()}</div>
      </div>
    </div>
  );
};

export default Header;
