import apiClient from './apiService';

export const tabOrderDetailService = {
  createTrade(data: any) {
    return apiClient.request({
      method: 'POST',
      url: 'p2p-api/api/v1/p2pTrade',
      data: data,
    });
  },

  getTradeById(id) {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2pTrade/${id}`,
    });
  },

  updateTradeById(data) {
    return apiClient.request({
      method: 'POST',
      url: `p2p-api/api/v1/p2pTrade/${data.id}`,
      params: {
        status: data.status,
        paymentId: data.paymentId || -1,
      },
    });
  },

  getListAppealReason() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2p-appeal-reason',
    });
  },

  getQRCode() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/code/generate-google-authenticator-qr-code',
    });
  },

  verifyDigitCode(params: any) {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/code/validate/key',
      params: {
        code: params.code,
        tradeId: params.tradeId,
      },
    });
  },

  getPayment() {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/p2pPayment/p2PPaymentByEmail',
    });
  },

  getPaymentById(params: any) {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2pPayment/${params}`,
    });
  },

  uploadFile(data) {
    return apiClient.request({
      method: 'POST',
      url: 'api-svc/file/uploadFile',
      data: data,
    });
  },

  updateAppealStatus(params) {
    return apiClient.request({
      method: 'POST',
      url: `p2p-api/api/v1/appeal/${params?.id}`,
      params: {
        status: params?.status,
      },
    });
  },

  createAppeal(data) {
    return apiClient.request({
      method: 'POST',
      url: 'p2p-api/api/v1/appeal',
      data: data,
    });
  },

  getAppealByTradeId(params) {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/appeal/p2PAppealByTrade',
      params: params,
    });
  },
};
