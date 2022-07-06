import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.currentPair || initialState;

export const selectCurrentPair = createSelector([selectSlice], state => state);
