import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import WithdrawContainer from 'app/container/WithdrawContainer';
import { useTranslation } from 'react-i18next';

export function WithdrawPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('withdraw')} | Trading View</title>
        <meta name="description" content="Withdraw Trading View Web" />
      </Helmet>
      <WithdrawContainer />
      {/* <FooterSticky /> */}
    </>
  );
}
