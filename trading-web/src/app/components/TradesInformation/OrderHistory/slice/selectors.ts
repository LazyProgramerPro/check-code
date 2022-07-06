import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.orderhistory || initialState;

export const selectOrderhistory = createSelector([selectSlice], state => state);
