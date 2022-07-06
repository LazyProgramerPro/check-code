import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.spotWallet || initialState;

export const selectSpotWallet = createSelector([selectSlice], state => state);
