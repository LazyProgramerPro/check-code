import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.getBalancePair || initialState;

export const selectGetBalancePair = createSelector(
  [selectSlice],
  state => state,
);
