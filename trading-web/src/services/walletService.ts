import apiClient from 'services/apiService';

export const WalletServices = {
  GetAllCoin(params) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token`,
      params: params,
    });
  },
  GetCoin(coin) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token/${coin}`,
    });
  },
  GetNetwork(id) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token/${id}/network`,
    });
  },
  GetWallet(network_id, token_id) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/wallet?network_id=${network_id}&token_id=${token_id}`,
    });
  },
  GetFeeTransfer(network_id, token_id) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/wallet/fee-transfer?network_id=${network_id}&token_id=${token_id}`,
    });
  },
  GetCoinBalance(wallet_type, token_id) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/wallet/balance?wallet_type=${wallet_type}&token_id=${token_id}`,
    });
  },
  Withdraw(payload) {
    return apiClient.request({
      method: 'POST',
      url: `/trading-wallet-svc/wallet/withdraw`,
      data: payload,
    });
  },
};
