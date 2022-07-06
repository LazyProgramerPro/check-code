import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { getopenOrderSaga } from './saga';
import { GetopenOrderState } from './types';

export const initialState: GetopenOrderState = {
  data: {},
  responseCancelOrder: {},
  pageIndex: 0,
  pageSize: 100,
};

const slice = createSlice({
  name: 'getopenOrder',
  initialState,
  reducers: {
    getopenOrderRequest(state, action: PayloadAction<any>) {},
    getopenOrderSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getopenOrderFail(state, action: PayloadAction<any>) {},
    cancelOrderRequest(state, action: PayloadAction<any>) {},
    cancelOrderSuccess(state, action: PayloadAction<any>) {
      state.responseCancelOrder = action.payload;
    },
    cancelOrderFail(state, action: PayloadAction<any>) {},
    setPageSize(state) {
      state.pageSize = state.pageSize + 10;
    },
  },
});

export const { actions: getopenOrderActions } = slice;

export const useGetopenOrderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: getopenOrderSaga });
  return { actions: slice.actions };
};
