import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { tradehistorySaga } from './saga';
import { TradehistoryState } from './types';

export const initialState: TradehistoryState = {
  data: [],
  pageIndex: 0,
  pageSize: 10,
};

const slice = createSlice({
  name: 'tradehistory',
  initialState,
  reducers: {
    getTradeHistoryRequest(state, action: PayloadAction<any>) {},
    getTradeHistorySuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getTradeHistoryFail(state, action: PayloadAction<any>) {},
    setPageSize(state) {
      state.pageSize = state.pageSize + 10;
    },
  },
});

export const { actions: tradehistoryActions } = slice;

export const useTradehistorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tradehistorySaga });
  return { actions: slice.actions };
};
