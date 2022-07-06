import LoginContainer from 'app/container/LoginContainer';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
export function LoginPage() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>{t('sign-page')} | Trading View</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <LoginContainer />
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
  color: ${({ theme }) => theme.text};
`;
