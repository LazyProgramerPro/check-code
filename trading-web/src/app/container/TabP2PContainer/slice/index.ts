import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { TabP2PState } from './type';

export const initialState: TabP2PState = {
  data: {},
  searchParam: {
    action: 'buy',
    crypto: 'BTC',
    fiat: '',
    payment: 'All payments',
  },
  listToken: [],
  listFiat: [],
  listPayment: [],
  amount: -1,
};

const slice = createSlice({
  name: 'tabP2P',
  initialState,
  reducers: {
    /**
     *
     * @param state
     * @param action | payload {action, crypto, fiat, payment}
     */
    upTabP2P(state, action: PayloadAction<any>) {
      state.searchParam = action.payload;
    },

    /**
     * @param state
     * @param action | payload: action
     */
    actionTabP2P(state, action: PayloadAction<'buy' | 'sell'>) {
      state.searchParam = { ...state.searchParam, action: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: crypto
     */
    cryptoTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, crypto: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: fiat
     */
    fiatTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, fiat: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: payment method
     */
    paymentTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, payment: action.payload };
    },

    getListToken(state, action: PayloadAction<any>) {
      state.listToken = action.payload;
    },

    getListFiat(state, action: PayloadAction<any>) {
      state.listFiat = action.payload;
    },

    getListPayment(state, action: PayloadAction<any>) {
      state.listPayment = action.payload;
    },

    amountTabP2P(state, action: PayloadAction<any>) {
      state.amount = action.payload;
    },
  },
});

export const { actions: TabP2PActions } = slice;

export const useTabP2PSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
