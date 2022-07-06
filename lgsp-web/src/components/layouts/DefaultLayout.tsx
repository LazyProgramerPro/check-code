import React, {useEffect, useState} from 'react';
import Nav from './Nav';
import {Icon, Layout} from 'antd';
import Header from './Header';
import commonStyled from './styled/commonStyled';
import env from 'src/configs/env';

const {Sider} = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: LayoutProps) => {

  const screenWidth = document.documentElement.clientWidth;
  const [collapsed, setCollapsed] = useState(screenWidth <= env.tabletWidth ? true : false)

  function toggle() {
    setCollapsed(!collapsed)
  }

  useEffect(() => {

    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setCollapsed(true)
      else setCollapsed(false)
    }

    window.addEventListener('resize', updateSize);
    updateSize();
      return () => window.removeEventListener('resize', updateSize);

  }, []);

  return (
    <commonStyled.Container>
      <Layout>
        <Layout>
          <Sider className="menu" trigger={null} collapsible collapsed={collapsed} width={250}>
            {}
            <div className="logo">
              {}
              {collapsed ? (<h1 className="collapsed-logo"></h1>) : null}
            </div>
            <Nav hiddenLabel={collapsed}/>
          </Sider>
          <Layout className="content">
            <Header>
              <Icon
                className="trigger-menu"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={toggle}
              />
            </Header>
            {props.children}
          </Layout>
        </Layout>
      </Layout>
    </commonStyled.Container>
  );

};

export default DefaultLayout;
