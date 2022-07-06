import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.tradehistory || initialState;

export const selectTradehistory = createSelector([selectSlice], state => state);
