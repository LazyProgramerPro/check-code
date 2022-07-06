import TabP2PUserCenterContainer from 'app/container/TabP2PUserCenterContainer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export function P2PUserCenterPage() {
  const { t } = useTranslation();

  return (
    <App>
      <Helmet>
        <title>P2P - {t('wallet')} | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <TabP2PUserCenterContainer />
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
