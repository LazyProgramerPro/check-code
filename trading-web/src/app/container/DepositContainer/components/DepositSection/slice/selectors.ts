import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.depositCrypto || initialState;

export const selectDepositCrypto = createSelector(
  [selectSlice],
  state => state,
);
