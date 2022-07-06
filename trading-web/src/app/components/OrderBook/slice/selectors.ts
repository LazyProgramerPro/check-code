import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.orderbook || initialState;

export const selectOrderbook = createSelector([selectSlice], state => state);
