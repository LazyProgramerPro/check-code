/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { useThemeContext } from 'app/components/common/themeContext';
import { useGetallpairSlice } from 'app/components/Market/slice';
import { ErrorToast, SuccessToast } from 'app/components/Toast';
import { useToastSlice } from 'app/components/Toast/slice';
import { selectToast } from 'app/components/Toast/slice/selectors';
import { P2PWalletPage } from 'app/pages/P2PWalletPage/Loadable';
import { SpotWalletPage } from 'app/pages/SpotWalletPage/Loadable';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
//get store redux
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { authService } from 'services/authService';
// Theme
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global-styles';
import { darkTheme, lightTheme } from 'theme/theme';
import PrivateRoute from './components/common/privateRoute';
import PublicRoute from './components/common/publicRoute';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { PostAdP2P } from './pages/PostAdP2P/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { TradeP2PPage } from './pages/TradeP2P/Loadable';
import { StyledToastContainer } from './style';
import { DepositPage } from './pages/DepositPage/Loadable';
import { WithdrawPage } from './pages/WithdrawPage/Loadable';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { OrderAllPage } from './pages/OrderAllPage';
import { P2PUserCenterPage } from './pages/P2PUserCenterPage/Loadable';
import { PaymentP2pPage } from './pages/PaymentP2pPage/Loadable';

export function App() {
  const dispatch = useDispatch();
  const { actions: toastActions } = useToastSlice();
  const { actions: actionsAllPair } = useGetallpairSlice();
  const basePair = 'B2_USDT';
  const dataToast: any = useSelector(selectToast);
  const { i18n } = useTranslation();
  const { theme } = useThemeContext();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  //Get all pair
  useEffect(() => {
    dispatch(actionsAllPair.getAllPairRequest());
  }, [actionsAllPair, dispatch]);
  // check access token
  useEffect(() => {
    authService.checkAccessToken();
    authService.autoRefreshAccessToken();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode}>
        <Helmet htmlAttributes={{ lang: i18n.language }}>
          <meta name="description" content="Trading View" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Navigate to={`/trade/${basePair}`} />} />
          <Route path="/trade/:pair" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/wallet/spot"
            element={
              <PrivateRoute>
                <SpotWalletPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/wallet/:wallettype/deposit/crypto/:currency"
            element={
              <PrivateRoute>
                <DepositPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet/:wallettype/withdraw/crypto/:currency"
            element={
              <PrivateRoute>
                <WithdrawPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet/p2p"
            element={
              <PrivateRoute>
                <P2PWalletPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trade-p2p/p2p/"
            element={
              <PrivateRoute>
                <TradeP2PPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/trade-p2p/express/*"
            element={
              <PrivateRoute>
                <TradeP2PPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/en/postAd"
            element={
              <PrivateRoute>
                <PostAdP2P />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/orderDetail/:id"
            element={
              <PrivateRoute>
                <OrderDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/all"
            element={
              <PrivateRoute>
                <OrderAllPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:action/:pm"
            element={
              <PrivateRoute>
                <PaymentP2pPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/p2pUserCenter"
            element={
              <PrivateRoute>
                <P2PUserCenterPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <StyledToastContainer>
          <SuccessToast
            close={() => dispatch(toastActions.closeSuccessToast())}
            show={dataToast.openSuccessToast}
            title={dataToast.titleSuccessToast}
            message={dataToast.messageSuccessToast}
          />
          <ErrorToast
            close={() => dispatch(toastActions.closeErrorToast())}
            show={dataToast.openErrorToast}
            title={dataToast.titleErrorToast}
            message={dataToast.messageErrorToast}
          />
        </StyledToastContainer>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}
