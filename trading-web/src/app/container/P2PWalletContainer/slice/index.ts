import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { p2pWalletSaga } from './saga';
import { P2PWalletState } from './types';

export const initialState: P2PWalletState = {
  data: {},
};

const slice = createSlice({
  name: 'p2pWallet',
  initialState,
  reducers: {
    getP2PWalletRequest(state) {},
    getP2PWalletSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getP2PWalletFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: P2PWalletActions } = slice;

export const useP2PWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: p2pWalletSaga });
  return { actions: slice.actions };
};
