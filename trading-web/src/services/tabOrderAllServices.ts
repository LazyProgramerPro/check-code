import apiClient from 'services/apiService';

export const OrderAllServices = {
  getTradeByToken() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2pTrade/p2pTradeByEmail',
    });
  },
  getTradeByStatus(params) {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2pTrade/p2pTradeByEmail',
      params: {
        status: params,
      },
    });
  },
};
