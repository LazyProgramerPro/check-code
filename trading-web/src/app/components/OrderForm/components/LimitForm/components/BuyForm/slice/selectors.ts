import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.buyspotlimit || initialState;

export const selectBuyspotlimit = createSelector([selectSlice], state => state);
