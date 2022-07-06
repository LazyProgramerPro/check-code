import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { WebsocketState } from './types';

export const initialState: WebsocketState = {
  Orderfilled: {},
};

const slice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    updateOrderFilled(state, action: PayloadAction<any>) {
      state.Orderfilled = action.payload;
    },
  },
});

export const { actions: websocketActions } = slice;

export const useWebsocketSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
