import apiClient from 'services/apiService';

export const P2PWalletServices = {
  getAllP2PWallet() {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/p2p`,
    });
  },

  transferP2pToSpot(data) {
    return apiClient.request({
      method: 'POST',
      url: '/api-svc/wallet/transfer-p2p-to-spot',
      data: data,
    });
  },
};
