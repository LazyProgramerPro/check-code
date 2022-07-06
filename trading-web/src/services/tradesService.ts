import apiClient from 'services/apiService';

export const tradesServices = {
  Trades(pair) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/trade/getAllTrade?symbol=${pair}`,
    });
  },
  TradeHistory(startTime, endTime, pageIndex, pageSize) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/trade/getTradeByUser`,
      params: {
        startTime: startTime,
        endTime: endTime,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  },
};
