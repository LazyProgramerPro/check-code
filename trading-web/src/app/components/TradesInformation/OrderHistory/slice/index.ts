import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { orderhistorySaga } from './saga';
import { OrderhistoryState } from './types';

export const initialState: OrderhistoryState = {
  data: {},
  pageIndex: 0,
  pageSize: 10,
};

const slice = createSlice({
  name: 'orderhistory',
  initialState,
  reducers: {
    getOrderhistoryRequest(state, action: PayloadAction<any>) {},
    getOrderhistorySuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getOrderhistoryFail(state, action: PayloadAction<any>) {},
    setPageSize(state) {
      state.pageSize = state.pageSize + 10;
    },
  },
});

export const { actions: orderhistoryActions } = slice;

export const useOrderhistorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: orderhistorySaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useOrderhistorySlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
