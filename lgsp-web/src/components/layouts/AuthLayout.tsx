import React from 'react';
import commonStyled from './styled/commonStyled';

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = (props: LayoutProps) => {
  return <commonStyled.Container>{props.children}</commonStyled.Container>;
};

export default AuthLayout;
