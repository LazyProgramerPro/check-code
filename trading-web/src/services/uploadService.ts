import apiClient from 'services/apiService';

export const UploadImgServices = {
  Upload() {
    return apiClient.request({
      method: 'GET',
      url: `/file/upload`,
    });
  },
};
