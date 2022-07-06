import AuthNavbar from 'app/components/Navbar/authNav';
import Alert from './components/Alert';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Main,
  LeftMenu,
  GroupHelpButton,
  StyledLink,
  StyledToastContainer,
} from './style';
import LoginByEmail from './components/LoginByEmail';
import EmailVerification from './components/EmailVerification';
import { useEffect, useState } from 'react';
import AuthFooter from 'app/components/AuthFooter';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from './slice/selectors';
import { useLoginSlice } from './slice';
import { useTranslation } from 'react-i18next';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useLoginSlice();
  const [emailLogin, setEmailLogin] = useState('');
  const dataLogin: any = useSelector(selectLogin);
  useEffect(() => {
    return () => {
      dispatch(actions.handleStepLogin(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AuthNavbar />
      <Alert />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {dataLogin.stepLogin === 1 ? (
                <>
                  <div className="title">{t('auth.welcome-title')}</div>
                  <div className="sub-title">{t('auth.welcome-subtitle')}</div>
                  <LoginByEmail emailLogin={setEmailLogin} />
                  <GroupHelpButton>
                    <StyledLink to="/">{t('auth.forgot-password')}</StyledLink>
                    <StyledLink to="/register">{t('register-now')}</StyledLink>
                  </GroupHelpButton>
                </>
              ) : dataLogin.stepLogin === 2 ? (
                <EmailVerification email={emailLogin} />
              ) : null}
            </LeftMenu>
            <Col xs lg="3"></Col>
          </Row>
        </Container>
        <StyledToastContainer></StyledToastContainer>
      </Main>
      <AuthFooter />
    </>
  );
};
export default LoginContainer;
