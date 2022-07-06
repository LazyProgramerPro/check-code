import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { chatboxSaga } from './saga';
import { ChatboxState } from './types';

export const initialState: ChatboxState = {
  listMessage: [],
  pageSize: 10,
  pageIndex: 1,
  ts: new Date().getTime(),
  totalMessage: 0,
};

const slice = createSlice({
  name: 'chatbox',
  initialState,
  reducers: {
    removeUploadImgRequest(state, action: PayloadAction<any>) {},
    removeUploadImgSuccess(state, action: PayloadAction<any>) {},
    removeUploadImgFail(state, action: PayloadAction<any>) {},
    getMessageRequest(state, action: PayloadAction<any>) {},
    getMessageSuccess(state, action: PayloadAction<any>) {
      state.listMessage = action.payload;
    },
    getMessageFail(state, action: PayloadAction<any>) {},
    setTs(state, action: PayloadAction<any>) {
      state.ts = action.payload;
    },
    changePageIndex(state) {
      state.pageIndex += 1;
    },
    setTotalMessage(state, action: PayloadAction<any>) {
      state.totalMessage = action.payload;
    },
  },
});

export const { actions: chatboxActions } = slice;

export const useChatboxSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: chatboxSaga });
  return { actions: slice.actions };
};
