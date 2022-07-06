import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import DepositContainer from 'app/container/DepositContainer';
import { useTranslation } from 'react-i18next';

export function DepositPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('deposit')} | Trading View</title>
        <meta name="description" content="Deposit Trading View Web" />
      </Helmet>
      <DepositContainer />
      {/* <FooterSticky /> */}
    </>
  );
}
