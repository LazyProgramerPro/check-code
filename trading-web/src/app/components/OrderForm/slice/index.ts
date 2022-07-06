import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { getBalancePairSaga } from './saga';
import { GetBalancePairState } from './types';

export const initialState: GetBalancePairState = {
  data: {},
  reGetBalancePair: false,
};

const slice = createSlice({
  name: 'getBalancePair',
  initialState,
  reducers: {
    getBalancePairSpotRequest(state, action: PayloadAction<any>) {},
    getBalancePairSpotSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getBalancePairSpotFail(state, action: PayloadAction<any>) {},
    regetBalance(state) {
      state.reGetBalancePair = !state.reGetBalancePair;
    },
  },
});

export const { actions: getBalancePairActions } = slice;

export const useGetBalancePairSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: getBalancePairSaga });
  return { actions: slice.actions };
};
