import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.p2pWallet || initialState;

export const selectP2PWallet = createSelector([selectSlice], state => state);
