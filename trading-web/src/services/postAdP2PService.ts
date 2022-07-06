import { DataPostAdP2PState } from 'app/container/PostAdP2PContainer/slice/types';
import apiClient from './apiService';

export const postAdP2PServices = {
  getAllAllowBuySellService() {
    return apiClient.request({
      method: 'GET',
      url: '/p2p-api/api/v1/token',
    });
  },

  getAllFiatService() {
    return apiClient.request({
      method: 'GET',
      url: '/p2p-api/api/v1/P2pFiat',
    });
  },

  getAllPaymentP2PService() {
    return apiClient.request({
      method: 'GET',
      url: '/p2p-api/api/v1/p2pPayment/p2PPaymentByEmail',
    });
  },

  getAllPaymentTimeP2PService() {
    return apiClient.request({
      method: 'GET',
      url: '/p2p-api/api/v1/P2PPaymentTime',
    });
  },

  postCreateOrderAdP2PService(data: DataPostAdP2PState) {
    return apiClient.request({
      method: 'POST',
      data,
      url: '/p2p-api/api/v1/p2pOrder',
    });
  },

  getProfileUser() {
    return apiClient.request({
      method: 'GET',
      url: '/account-svc/users/auth/getUser',
    });
  },

  getOrderPrice(type: 0 | 1, tokenId: string, fiatId: string) {
    return apiClient.request({
      method: 'get',
      url: `/p2p-api/api/v1/p2pOrder/orderPrice?type=${type}&tokenId=${tokenId}&fiatId=${fiatId}`,
    });
  },
};
