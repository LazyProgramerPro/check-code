import Navbar from 'app/components/Navbar';
import FiatSpotHeader from './components/Header';
import FiatSpotTable from './components/Table';
import {
  App,
  Parameter,
  LeftParameter,
  RightParameter,
  Balance,
  BalanceName,
  BalanceNumber,
  SpotAccountPnl,
  FirstLinePnl,
  SecondLinePnl,
  Tooltip,
} from './style';
import ShowIcon from 'app/assets/img/showpassIcon';
import IconSvg from 'app/assets/img/icon';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSpotWalletSlice } from './slice';
import { selectSpotWallet } from './slice/selectors';
import { useTranslation } from 'react-i18next';
const SpotWalletContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useSpotWalletSlice();
  const AllSpotWall: any = useSelector(selectSpotWallet);
  const getSpotWallet = () => {
    dispatch(actions.getSpotWalletRequest());
  };

  useEffect(() => {
    getSpotWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <App>
      <Navbar />
      <Container>
        <FiatSpotHeader reload={getSpotWallet} />
      </Container>
      <Parameter>
        <Container>
          <div className="content">
            <LeftParameter>
              <div className="title">
                <div className="title--text">{t('fiat-spot-balance')}</div>
                <div>
                  <button className="title--icon">
                    <ShowIcon name="show" className="show-icon" />
                  </button>
                </div>
              </div>
              <div className="amount">
                <div className="amount-coin">
                  <div className="amount-coin--number">0.00000000</div>
                  <div className="amount-coin--name">BTC</div>
                </div>
                <div className="amount-money">≈ $0.000000</div>
              </div>
            </LeftParameter>
            <RightParameter>
              <Balance>
                <BalanceName>
                  <div className="balance--name-text">{t('spot-balance')}</div>
                </BalanceName>
                <BalanceNumber>
                  <div className="amount-coin">
                    <div className="amount-coin--number">0.00000000</div>
                    <div className="amount-coin--name">BTC</div>
                  </div>
                  <div className="amount-money">≈ $0.000000</div>
                </BalanceNumber>
              </Balance>
              <Balance>
                <BalanceName>
                  <div className="balance--name-text">{t('fiat-balance')}</div>
                </BalanceName>
                <BalanceNumber>
                  <div className="amount-coin">
                    <div className="amount-coin--number">0.00000000</div>
                    <div className="amount-coin--name">BTC</div>
                  </div>
                  <div className="amount-money">≈ $0.000000</div>
                </BalanceNumber>
              </Balance>
              <SpotAccountPnl>
                <div className="title">
                  <div>
                    <Tooltip className="tooltip-box">
                      <div className="tooltip-title">
                        {t('p2p-tooltip-box')}
                      </div>
                      <div className="bn-tooltip-arrow"></div>
                      <i className="gap-fill"></i>
                    </Tooltip>
                    <div className="title-text">{t('yesterday-pnl')}</div>
                  </div>
                  <div className="title-icon">
                    <IconSvg name="next" />
                  </div>
                </div>
                <FirstLinePnl>
                  <div className="content-section">
                    <div className="content-main">--</div>
                  </div>
                </FirstLinePnl>
                <SecondLinePnl>
                  <div className="content-section">
                    <div className="content-main">--</div>
                  </div>
                </SecondLinePnl>
              </SpotAccountPnl>
            </RightParameter>
          </div>
        </Container>
      </Parameter>
      <FiatSpotTable dataSource={AllSpotWall.data.rows} />
    </App>
  );
};
export default SpotWalletContainer;
