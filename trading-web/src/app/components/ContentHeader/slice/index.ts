import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { currentPairSaga } from './saga';
import { CurrentPairState } from './types';

export const initialState: CurrentPairState = {
  data: {},
};

const slice = createSlice({
  name: 'currentPair',
  initialState,
  reducers: {
    getCurrentPairRequest(state, action: PayloadAction<any>) {},
    getCurrentPairSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getCurrentPairFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: currentPairActions } = slice;

export const useCurrentPairSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: currentPairSaga });
  return { actions: slice.actions };
};
