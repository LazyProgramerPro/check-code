import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.verifyEmailRegister || initialState;

export const selectVerifyEmailRegister = createSelector(
  [selectSlice],
  state => state,
);
