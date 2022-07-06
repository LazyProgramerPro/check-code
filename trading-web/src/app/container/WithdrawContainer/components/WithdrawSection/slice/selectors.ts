import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.withdrawCrypto || initialState;

export const selectWithdrawCrypto = createSelector(
  [selectSlice],
  state => state,
);
