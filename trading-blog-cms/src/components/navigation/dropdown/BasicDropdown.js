import * as React from 'react';
import {Menu, Dropdown, Icon} from 'antd';
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>

    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>

    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>

    </Menu.Item>
  </Menu>
);

class BasicDropdown extends React.Component {
  render () {
    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>

      </Dropdown>
    );
  }
}
export default BasicDropdown;
