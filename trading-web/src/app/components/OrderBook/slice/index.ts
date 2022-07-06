import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { orderbookSaga } from './saga';
import { OrderbookState } from './types';

export const initialState: OrderbookState = {
  data: {},
  selectPrice: 0,
  openOrder: [],
};

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    getOrderbookRequest(state, action: PayloadAction<any>) {},
    getOrderbookSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getOrderbookFail(state, action: PayloadAction<any>) {},
    selectPrice(state, action: PayloadAction<any>) {
      state.selectPrice = action.payload;
    },
    setOpenOrder(state, action: PayloadAction<any>) {
      state.openOrder = action.payload;
    },
  },
});

export const { actions: orderbookActions } = slice;

export const useOrderbookSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: orderbookSaga });
  return { actions: slice.actions };
};
