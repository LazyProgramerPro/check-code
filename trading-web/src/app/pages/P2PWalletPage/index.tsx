import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import P2PWalletContainer from 'app/container/P2PWalletContainer';
import { useTranslation } from 'react-i18next';
export function P2PWalletPage() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>P2P - {t('wallet')} | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <P2PWalletContainer />
    </App>
  );
}
export const App = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: ${({ theme }) => theme.background};
`;
