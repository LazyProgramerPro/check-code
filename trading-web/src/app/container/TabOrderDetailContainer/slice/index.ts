import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { TabOrderDetailState } from './types';

export const initialState: TabOrderDetailState = {
  buyerStatus: 'NOT_PAID',
  sellerStatus: 'HOLD',
  tradeStatus: 'PROCESSING',
  tradeType: '',
};

const slice = createSlice({
  name: 'tabOrderDetail',
  initialState,
  reducers: {
    setBuyerStatus(state, action: PayloadAction<string>) {
      state.buyerStatus = action.payload;
    },

    setSellerStatus(state, action: PayloadAction<string>) {
      state.sellerStatus = action.payload;
    },

    setTradeStatus(state, action: PayloadAction<string>) {
      state.tradeStatus = action.payload;
    },

    setTradeType(state, action: PayloadAction<string>) {
      state.tradeType = action.payload;
    },
  },
});

export const { actions: tabOrderDetailActions } = slice;

export const useTabOrderDetailSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTabOrderDetailSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
