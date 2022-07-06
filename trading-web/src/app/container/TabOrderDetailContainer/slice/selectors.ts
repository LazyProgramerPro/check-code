import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.tabOrderDetail || initialState;

export const selectTabOrderDetail = createSelector(
  [selectSlice],
  state => state,
);
