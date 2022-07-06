import apiClient from 'services/apiService';

export const CurrentPairServices = {
  GetCurrentPair(pair, ts) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/trade-his?pair=${pair}&ts=${ts}`,
    });
  },
};
