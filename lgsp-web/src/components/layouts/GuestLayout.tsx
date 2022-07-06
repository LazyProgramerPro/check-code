import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { useRouteMatch } from 'react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const AUTHORIZE_ROUTE = ['/login', '/register', '/forgot-password', '/reset-password/:token'];

const GuestLayout = (props: LayoutProps) => {
  const { children } = props;
  const { path } = useRouteMatch();

  const checkCurrentRoute = () => {
    const isCheck = AUTHORIZE_ROUTE.find(route => path.includes(route));
    return !isCheck;
  };

  const functionProps = () => {};

  return (
    <div className="guest-layout-wrapper">
      <Header handleShowSidebar={functionProps} />
      <div className="container-page">
        <div className="main-content">{children}</div>
        {checkCurrentRoute() && <Footer />}
      </div>
    </div>
  );
};

export default GuestLayout;
