import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.tabP2P || initialState;

export const selectTabP2P = createSelector([selectSlice], state => state);
