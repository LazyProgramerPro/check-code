import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { buyspotlimitSaga } from './saga';
import { BuyspotlimitState } from './types';

export const initialState: BuyspotlimitState = {
  data: {},
};

const slice = createSlice({
  name: 'buyspotlimit',
  initialState,
  reducers: {
    buyspotlimitRequest(state, action: PayloadAction<any>) {},
    buyspotlimitSuccess(state, action) {
      state.data = action.payload;
    },
    buyspotlimitFail(state, action) {},
    clearstate(state) {
      state.data = {};
    },
  },
});

export const { actions: buyspotlimitActions } = slice;

export const useBuyspotlimitSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: buyspotlimitSaga });
  return { actions: slice.actions };
};
