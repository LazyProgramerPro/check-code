import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from './components/layouts/DefaultLayout';
import AuthLayout from './components/layouts/AuthLayout';
import Routes from './routes';
import Login from './modules/Auth/pages/login';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/redux';
// import history from './history';

const mapState = (state: RootState) => {
  return {
    isLogin: !!state.auth.auth.data?.user,
  };
};

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux) {
  return (
    <div className="App">
      <BrowserRouter>
        {props.isLogin ? (
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        ) : (
          <AuthLayout>
            <Login />
          </AuthLayout>
        )}
      </BrowserRouter>
    </div>
  );
}

export default connector(App);
