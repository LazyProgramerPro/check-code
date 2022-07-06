import apiClient from './apiService';

export const tabP2PUserCenterServices = {
  getUserPaymentByToken() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2pPayment/p2PPaymentByEmail',
    });
  },

  getAllPaymentMethod() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2p-payment-method',
    });
  },

  deletePaymentMethod(params) {
    return apiClient.request({
      method: 'DELETE',
      url: `p2p-api/api/v1/p2pPayment/${params}`,
    });
  },
};
