import React, { useEffect } from 'react';
import LoginForm from './components/login-form';
import * as actions from './../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import env from 'src/configs/env';
import Loading from 'src/components/Loading';
import { useAppSelector } from 'src/redux/hooks';
import { useHistory, useLocation } from 'react-router-dom';

const mapToState = ({ auth: { auth } }: RootState) => ({ auth });

const connector = connect(mapToState, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

function LoginPage(props: IProps) {
  const user = useAppSelector(state => state.auth.auth.data);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    document.title = env.pageTitle + 'Đăng Nhập';
  }, []);

  useEffect(() => {
    if (user?.token) {
      const { from } = (location.state as any) || { from: { pathname: '/' } };
      if (from) {
        history.push(from);
      }
    }
  }, [history, location.state, user]);

  const onLogin = (username: string, password: string, remember: boolean, previous: string) => {
    props.login({ username, password, remember, previous });
  };

  return (
    <>
      <LoginForm onLogin={onLogin} loading={false} />

      {props.auth.loading ? <Loading /> : null}
    </>
  );
}

export default connector(LoginPage);
