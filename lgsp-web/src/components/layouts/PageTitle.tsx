import React from 'react';
import { Breadcrumb } from 'antd';

interface LayoutProps {
  children: React.ReactNode;
}

const PageTitle = (props: LayoutProps) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <div className="page-title">{props.children}</div>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default PageTitle;
