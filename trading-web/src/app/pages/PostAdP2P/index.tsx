import PostAdP2PContainer from 'app/container/PostAdP2PContainer';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export function PostAdP2P() {
  const { t } = useTranslation();
  return (
    <App>
      <Helmet>
        <title>P2P - {t('trade-p2p')}</title>
        <meta name="description" content="Login Trading View Web" />
      </Helmet>
      <PostAdP2PContainer />
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
