import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import TabOrderAllContainer from 'app/container/TabOrderAllContainer';

export function OrderAllPage() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>P2P - {t('wallet')} | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <TabOrderAllContainer />
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
