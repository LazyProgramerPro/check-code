import React, {useEffect, useState} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import GuestLayout from './components/layouts/GuestLayout';
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from './constants/routes';
import history from './history';
import Homepage from './modules/Homepage/homepage';
import {useAppSelector} from './redux/hooks';
import GuestLayoutRoute from './routes/GuestLayoutRoute';
import PrivateLayoutRoute from './routes/PrivateLayoutRoute';
import {UserRole} from "./models/common";

function App() {
  const isLogin = useAppSelector(state => !!state.auth.auth.data?.token);
  const role = useAppSelector(state => state.auth.auth.data?.role);

  const [collapseLeftMenu, setCollapseLeftMenu] = useState(true);

  const a = window.location.href;
  console.log('LINH ~ App ~ a', a);

  const handleCollapseLeftMenu = () => {
    setCollapseLeftMenu(!collapseLeftMenu);
  };

  useEffect(() => {
    if (window.innerWidth > 1280) {
      setCollapseLeftMenu(false);
    }
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            {isLogin ?
              (
                role == UserRole.ADMIN_VALUE
                  ?
                  <Redirect to="/system-infor-manager"/>
                  :
                  (
                    role == UserRole.PROVIDER_VALUE
                      ?
                      <Redirect to="/manager-infor/group-api-config"/>
                      :
                      <Redirect to="/manager-infor/data-public"/>
                  )
              )
              :
              <Redirect to="/home"/>}
          </Route>

          {/*<Route path="/home" exact>*/}
          {/*  {isLogin ? (*/}
          {/*    <Redirect to="/system-infor-manager"/>*/}
          {/*  ) : (*/}
          {/*    <GuestLayout>*/}
          {/*      <Homepage/>*/}
          {/*    </GuestLayout>*/}
          {/*  )}*/}
          {/*</Route>*/}

          {PUBLIC_ROUTES.map(route => {
            return <GuestLayoutRoute {...route} key={route.path}/>
          })}

          {PRIVATE_ROUTES.map(route => {
            return (
              <PrivateLayoutRoute
                {...route}
                key={route.path}
                handleCollapseLeftMenu={handleCollapseLeftMenu}
                collapseLeftMenu={collapseLeftMenu}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
