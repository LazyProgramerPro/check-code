import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.toast || initialState;

export const selectToast = createSelector([selectSlice], state => state);
