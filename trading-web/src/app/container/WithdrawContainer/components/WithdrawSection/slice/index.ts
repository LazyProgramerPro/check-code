import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { withdrawCryptoSaga } from './saga';
import { WithdrawCryptoState } from './types';

export const initialState: WithdrawCryptoState = {
  coinList: [],
  selectedCoin: {},
  networksList: [],
  feeTransfer: {},
  coinBalance: 0,
};

const slice = createSlice({
  name: 'withdrawCrypto',
  initialState,
  reducers: {
    getCoinRequest(state, action: PayloadAction<any>) {},
    getCoinSuccess(state, action: PayloadAction<any>) {
      state.selectedCoin = action.payload;
    },
    getCoinFail(state, action: PayloadAction<any>) {},
    getListCoinRequest(state, action: PayloadAction<any>) {},
    getListCoinSuccess(state, action: PayloadAction<any>) {
      state.coinList = action.payload;
    },
    getListCoinFail(state, action: PayloadAction<any>) {},
    getNetworkRequest(state, action: PayloadAction<any>) {},
    getNetworkSuccess(state, action: PayloadAction<any>) {
      state.networksList = action.payload;
    },
    getNetworkFail(state, action: PayloadAction<any>) {},
    getFeeTransferRequest(state, action: PayloadAction<any>) {},
    getFeeTransferSuccess(state, action: PayloadAction<any>) {
      state.feeTransfer = action.payload;
    },
    getFeeTransferFail(state, action: PayloadAction<any>) {},
    getCoinBalanceRequest(state, action: PayloadAction<any>) {},
    getCoinBalanceSuccess(state, action: PayloadAction<any>) {
      state.coinBalance = action.payload;
    },
    getCoinBalanceFail(state, action: PayloadAction<any>) {},
    withdrawRequest(state, action: PayloadAction<any>) {},
    withdrawSuccess(state, action: PayloadAction<any>) {},
    withdrawFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: withdrawCryptoActions } = slice;

export const useWithdrawCryptoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: withdrawCryptoSaga });
  return { actions: slice.actions };
};
