import { Container, Row, Col } from 'react-bootstrap';
import { Main, LeftMenu } from './style';
import Stepper from './components/Stepper';
import AccountDetail from './components/AccountDetail';
import EmailVerification from './components/EmailVerification';
import { useState, useEffect } from 'react';
import AuthNavbar from 'app/components/Navbar/authNav';
import AuthFooter from 'app/components/AuthFooter';
import { useSelector, useDispatch } from 'react-redux';
import { selectRegister } from './slice/selectors';
import { useRegisterSlice } from './slice';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const [emailRegister, setEmailRegister] = useState('');
  const { actions } = useRegisterSlice();
  const dataRegister: any = useSelector(selectRegister);

  useEffect(() => {
    return () => {
      dispatch(actions.handleStepRegister(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthNavbar />
      <Main>
        <Container>
          <Row className="justify-content-md-center">
            <LeftMenu xs lg="4">
              {dataRegister.stepRegister === 1 ? (
                <AccountDetail emailregis={setEmailRegister} />
              ) : dataRegister.stepRegister === 2 ? (
                <EmailVerification email={emailRegister} />
              ) : null}
            </LeftMenu>
            <Col xs lg="4">
              <Stepper footStep={dataRegister.stepRegister} />
            </Col>
          </Row>
        </Container>
      </Main>
      <AuthFooter />
    </>
  );
};
export default RegisterContainer;
