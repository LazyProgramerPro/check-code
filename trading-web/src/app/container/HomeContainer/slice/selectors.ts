import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.websocket || initialState;

export const selectWebsocket = createSelector([selectSlice], state => state);
