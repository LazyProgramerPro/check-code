import NavMenu from 'app/components/Navbar';
import { App, Header, ReturnDirect, ForWardDirect, MainContent } from './style';
import { IoCaretBack, IoArrowForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TutorialDeposit from 'app/container/DepositContainer/components/TutorialDeposit';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import RightBar from './components/RightBar';
import DepositSection from './components/DepositSection';
import RecentDeposits from './components/RecentDeposits';
export const DepositContainer = () => {
  const { t } = useTranslation();
  return (
    <App>
      <NavMenu></NavMenu>
      <Header>
        <div className="wrapper">
          <div className="directional">
            <ReturnDirect>
              <Link to="/wallet/spot">
                <IoCaretBack className="return-direct-icon" />
              </Link>
              <div data-bn-type="text" className="return-direct-title">
                {t('deposit-crypto')}
              </div>
            </ReturnDirect>
            <ForWardDirect data-bn-type="button">
              {t('deposit-fiat')} <IoArrowForwardOutline />
            </ForWardDirect>
          </div>
        </div>
      </Header>
      <MainContent>
        <Container>
          <TutorialDeposit />
          <Row>
            <Col md={6}>
              <DepositSection />
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <RightBar />
            </Col>
          </Row>
          <Row>
            <RecentDeposits />
          </Row>
        </Container>
      </MainContent>
    </App>
  );
};
export default DepositContainer;
