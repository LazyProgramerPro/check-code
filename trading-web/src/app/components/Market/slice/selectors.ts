import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.getallpair || initialState;

export const selectGetallpair = createSelector([selectSlice], state => state);
