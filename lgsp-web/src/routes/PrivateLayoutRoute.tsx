import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import DashBoardLayout from '../components/layouts/DashBoardLayut';
import { useAppSelector } from '../redux/hooks';
import { UserRole } from '../models/common';
export interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  collapseLeftMenu: boolean;
  handleCollapseLeftMenu: () => void;
}
const PrivateLayoutRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  handleCollapseLeftMenu,
  collapseLeftMenu,
  ...rest
}) => {
  const providerPermission = [
    '/manager-account/interaction-history',
    '/manager-infor/group-api-config',
    '/manager-infor/data-public',
    '/change-password',
    '/manager-data-services/manager-data-services',
    '/manager-data-services/task-run-periodically',
    '/questions',
    '/my-account',
    '/not-found',
  ];

  const consumerPermission = [
    '/manager-account/interaction-history',
    '/manager-infor/data-public',
    'change-password',
    '/questions',
    '/my-account',
    '/not-found',
  ];

  const publicRoute = [
    '/login',
    '/register',
    '/service',
    '/forgot-password',
    '/reset-password'
  ]

  const isLogin = useAppSelector(state => !!state.auth.auth.data?.token);
  const role = useAppSelector(state => state.auth.auth.data?.role);

  const authorizeProvider = (props: any) => {
    const path: string = props.history.location.pathname;
    const isPublic = publicRoute.find(item => path.includes(item));
    if(path == '' || path == '/' || isPublic != undefined){
      return (
        <Redirect
          to={{
            pathname: '/manager-infor/group-api-config',
            state: { from: props.location },
          }}
        />
      );
    }
    const check = providerPermission.find(item => path.includes(item));
    if (check == undefined) {
      return (
        <Redirect
          to={{
            pathname: '/manager-infor/group-api-config',
            state: { from: props.location },
          }}
        />
      );
    } else {
      return (
        <DashBoardLayout handleCollapseLeftMenu={handleCollapseLeftMenu} collapseLeftMenu={collapseLeftMenu}>
          <Component {...props} />
        </DashBoardLayout>
      );
    }
  };

  const authorizeConsumer = (props: any) => {
    const path: string = props.history.location.pathname;
    const isPublic = publicRoute.find(item => path.includes(item));
    if(path == '' || path == '/' || isPublic != undefined){
      return (
        <Redirect
          to={{
            pathname: '/manager-infor/data-public',
            state: { from: props.location },
          }}
        />
      );
    }
    const check = consumerPermission.find(item => path.includes(item));
    if (check == undefined) {
      return (
        <Redirect
          to={{
            pathname: '/manager-infor/data-public',
            state: { from: props.location },
          }}
        />
      );
    } else {
      return (
        <DashBoardLayout handleCollapseLeftMenu={handleCollapseLeftMenu} collapseLeftMenu={collapseLeftMenu}>
          <Component {...props} />
        </DashBoardLayout>
      );
    }
  };

  return (
    <Route
      {...rest}
      render={props =>
        isLogin
         ? (
          role == UserRole.ADMIN_VALUE ? (
            <DashBoardLayout handleCollapseLeftMenu={handleCollapseLeftMenu} collapseLeftMenu={collapseLeftMenu}>
              <Component {...props} />
            </DashBoardLayout>
          ) : role == UserRole.PROVIDER_VALUE ? (
            authorizeProvider(props)
          ) : (
            authorizeConsumer(props)
          )
        )
          :
          (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );

  // return (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isLogin ? (
  //         <DashBoardLayout handleCollapseLeftMenu={handleCollapseLeftMenu} collapseLeftMenu={collapseLeftMenu}>
  //           <Component {...props} />
  //         </DashBoardLayout>
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: '/login',
  //             state: { from: props.location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
};

export default PrivateLayoutRoute;
