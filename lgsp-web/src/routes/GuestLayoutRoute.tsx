import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import GuestLayout from '../components/layouts/GuestLayout';
import {useAppSelector} from "../redux/hooks";
import {UserRole} from "../models/common";

export interface IPublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}



const GuestLayoutRoute : React.FC<IPublicRouteProps> = ({component: Component, ...rest}) => {

const role = useAppSelector(state => state.auth.auth.data?.role);
const isLogin = useAppSelector(state => !!state.auth.auth.data?.token);
  if(!isLogin){
    return (
      <Route {...rest} render={props => (
        <GuestLayout>
          <Component {...props} />
        </GuestLayout>
      )} />
    )
  }
  if(role == UserRole.ADMIN_VALUE){
    return (
      <Route>
        <Redirect
          to={{
            pathname: '/system-infor-manager',
          }}
        />
      </Route>
    );
  }else if(role == UserRole.PROVIDER_VALUE){
    return (
      <Route>
        <Redirect
          to={{
            pathname: '/manager-infor/group-api-config',
          }}
        />
      </Route>
    );
  }else {
    return (
      <Redirect
        to={{
          pathname: '/manager-infor/data-public',
        }}
      />
    );
  }

  // return (
  //   <Route {...rest} render={props => (
  //     <GuestLayout>
  //       <Component {...props} />
  //     </GuestLayout>
  //   )} />
  // )
};

export default GuestLayoutRoute;
