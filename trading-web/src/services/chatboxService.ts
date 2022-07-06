import apiChatClient from './apiChatService';

export const ChatboxService = {
  getMessageHistory(data) {
    console.log('getMessageHistory', data);
    return apiChatClient.request({
      method: 'GET',
      url: `/chat?to=${data?.email}&ts=${data?.ts}&size=${data?.size}&page=${data?.page}`,
    });
  },
  removeUpload(data: any) {
    return apiChatClient.request({
      method: 'POST',
      url: `/file/delete/${data}`,
    });
  },
};
