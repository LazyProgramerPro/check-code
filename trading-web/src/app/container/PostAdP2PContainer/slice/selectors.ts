import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.postAdP2P || initialState;

export const selectPostAdP2P = createSelector([selectSlice], state => state);
