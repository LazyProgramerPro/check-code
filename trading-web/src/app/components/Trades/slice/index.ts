import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { tradesSaga } from './saga';
import { TradesState } from './types';

export const initialState: TradesState = {
  data: {},
};

const slice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    getTradesRequest(state, action: PayloadAction<any>) {},
    getTradesSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getTradesFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: tradesActions } = slice;

export const useTradesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tradesSaga });
  return { actions: slice.actions };
};
