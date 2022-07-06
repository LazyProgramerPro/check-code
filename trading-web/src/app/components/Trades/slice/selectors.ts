import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.trades || initialState;

export const selectTrades = createSelector([selectSlice], state => state);
