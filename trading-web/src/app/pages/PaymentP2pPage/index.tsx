import PaymentP2PContainer from 'app/container/PaymentP2PContainer';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export function PaymentP2pPage() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>P2P - {t('trade-p2p')}</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <PaymentP2PContainer />
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
