import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { spotWalletSaga } from './saga';
import { SpotWalletState } from './types';

export const initialState: SpotWalletState = {
  data: {},
};

const slice = createSlice({
  name: 'spotWallet',
  initialState,
  reducers: {
    getSpotWalletRequest(state) {},
    getSpotWalletSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getSpotWalletFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: spotWalletActions } = slice;

export const useSpotWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: spotWalletSaga });
  return { actions: slice.actions };
};
