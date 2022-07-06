import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import RegisterContainer from 'app/container/RegisterContainer';
import { useTranslation } from 'react-i18next';
export function RegisterPage() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>{t('register-page')} | Trading View</title>
        <meta name="description" content="Register Trading View Web" />
      </Helmet>
      <RegisterContainer />
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
