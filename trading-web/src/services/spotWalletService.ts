import apiClient from 'services/apiService';

export const SpotWalletServices = {
  getAllSpotWallet() {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/spot`,
    });
  },
  getPairValueSpotWallet(pairId) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/spot/self?pair_id=${pairId}`,
    });
  },

  getValidateKey(params) {
    return apiClient.request({
      method: 'GET',
      url: 'p2p-api/api/v1/code/validate/qr-code',
      params: params,
    });
  },

  transferMoneyToP2P(data) {
    return apiClient.request({
      method: 'POST',
      url: '/api-svc/wallet/transfer-spot-to-p2p',
      data: data,
    });
  },
};
