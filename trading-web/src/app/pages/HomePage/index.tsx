import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import HomeContainer from 'app/container/HomeContainer';
import FooterSticky from 'app/components/FooterSticky';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  let { pair } = useParams();
  const { t } = useTranslation();
  // save LocalStorage pair
  React.useEffect(() => {
    const findIndex: any = pair?.indexOf('_');
    const changeFormatPair = `${pair?.substring(
      0,
      findIndex,
    )}/${pair?.substring(findIndex + 1)}`;
    localStorage.setItem('pair', changeFormatPair);
  }, [pair]);
  return (
    <>
      <Helmet>
        <title>{t('home-page')} | Trading View</title>
        <meta name="description" content="Home page Trading View Web" />
      </Helmet>
      <HomeContainer />
      <FooterSticky />
    </>
  );
}
