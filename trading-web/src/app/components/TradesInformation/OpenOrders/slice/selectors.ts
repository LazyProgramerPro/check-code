import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.getopenOrder || initialState;

export const selectGetopenOrder = createSelector([selectSlice], state => state);
