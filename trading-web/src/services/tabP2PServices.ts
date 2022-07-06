import apiClient from './apiService';

export const tabP2PService = {
  getListOrder() {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder`,
    });
  },

  getOrderById(id) {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder/${id}`,
    });
  },

  getListOrderBy(params) {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder/orders`,
      params: {
        fiat: params.fiat,
        paymentMethod: params.paymentMethod,
        amount: params.amount,
        orderType: params.orderType,
        tokenId: params.tokenId,
      },
    });
  },

  getListFiat() {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/P2pFiat`,
    });
  },

  getListPayments() {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2p-payment-method`,
    });
  },

  getListToken() {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/token`,
    });
  },

  getOrderByEmail(params) {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2pOrder/p2POrdersByEmail?email=${params}`,
    });
  },

  getOrderByToken() {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2pOrder/p2POrdersByEmail`,
    });
  },

  getListTimeLimit() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/P2PPaymentTime',
    });
  },

  getUserPayments() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2pPayment/p2PPaymentByEmail',
    });
  },

  getUserWallet() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/walletP2p',
    });
  },
};
