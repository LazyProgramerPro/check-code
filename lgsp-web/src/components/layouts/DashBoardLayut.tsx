import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';
import Modal from '../CustomModal';
import LeftMenu from '../SideBar/LeftMenu';

interface LayoutProps {
  children: React.ReactNode;
  collapseLeftMenu: boolean;
  handleCollapseLeftMenu: () => void;
}

const DashBoardLayout = (props: LayoutProps) => {
  const { children, collapseLeftMenu, handleCollapseLeftMenu } = props;

  return (
    <div className="dashboard-layout-wrapper">
      <div className="container">
        <SideBar hiddenLabel={false} showSidebar={collapseLeftMenu} />
        {/* <LeftMenu /> */}
        <div className="container-page">
          <Header handleShowSidebar={handleCollapseLeftMenu} />
          <div className="main-content">{children}</div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default DashBoardLayout;
