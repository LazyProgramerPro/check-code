import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.sellspotlimit || initialState;

export const selectSellspotlimit = createSelector(
  [selectSlice],
  state => state,
);
