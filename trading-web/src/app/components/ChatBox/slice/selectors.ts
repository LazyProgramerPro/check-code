import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.chatbox || initialState;

export const selectChatbox = createSelector([selectSlice], state => state);
