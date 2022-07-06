import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ToastState } from './types';

export const initialState: ToastState = {
  openSuccessToast: false,
  titleSuccessToast: '',
  messageSuccessToast: '',
  openErrorToast: false,
  titleErrorToast: '',
  messageErrorToast: '',
};

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openSuccessToast(state, action: PayloadAction<any>) {
      state.openSuccessToast = true;
      state.titleSuccessToast = action.payload.title;
      state.messageSuccessToast = action.payload.message;
    },
    closeSuccessToast(state) {
      state.openSuccessToast = false;
      state.titleSuccessToast = '';
      state.messageSuccessToast = '';
    },
    openErrorToast(state, action: PayloadAction<any>) {
      state.openErrorToast = true;
      state.titleErrorToast = action.payload.title;
      state.messageErrorToast = action.payload.message;
    },
    closeErrorToast(state) {
      state.openErrorToast = false;
      state.titleErrorToast = '';
      state.messageErrorToast = '';
    },
  },
});

export const { actions: toastActions } = slice;

export const useToastSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
