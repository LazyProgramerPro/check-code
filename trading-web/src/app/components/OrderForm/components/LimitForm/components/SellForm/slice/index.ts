import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sellspotlimitSaga } from './saga';
import { SellspotlimitState } from './types';

export const initialState: SellspotlimitState = {
  data: {},
};

const slice = createSlice({
  name: 'sellspotlimit',
  initialState,
  reducers: {
    sellspotlimitRequest(state, action: PayloadAction<any>) {},
    sellspotlimitSuccess(state, action) {
      state.data = action.payload;
    },
    sellspotlimitFail(state, action) {},
    clearstate(state) {
      state.data = {};
    },
  },
});

export const { actions: sellspotlimitActions } = slice;

export const useSellspotlimitSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sellspotlimitSaga });
  return { actions: slice.actions };
};
