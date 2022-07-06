import React, { useEffect } from 'react';
import LgspPresent from './components/lgspPresent';
import Banner from './components/Banner';
import Category from './components/Category';
import Organization from './components/Organization';
import Statistics from './components/Statistics';
import { IHomePagePayload } from './redux/models';
import { getContentHomePage } from './redux/actions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

function Homepage() {
  const selectHomePageState = useAppSelector(state => state.mainPage.homePage.data);
  const { categories, stats, images } = selectHomePageState as IHomePagePayload;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContentHomePage({}));
  }, [dispatch]);

  return (
    <div className="homepage-wrapper">
      <LgspPresent />
      <Banner images={images} />
      <Category categories={categories} />
      <Organization />
      <Statistics statistics={stats} />
    </div>
  );
}

export default Homepage;
