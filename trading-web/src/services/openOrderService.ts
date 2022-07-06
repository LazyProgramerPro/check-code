import apiClient from 'services/apiService';

export const OpenOrderServices = {
  getOpenOrder(pageIndex, pageSize) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/order/getOpenOrder`,
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  },
  cancelOpenOrder(orderId, baseSymbol, quoteSymbol, wallet) {
    return apiClient.request({
      method: 'POST',
      url: `/wise-router/orders/cancel`,
      data: {
        orderId,
        baseSymbol,
        quoteSymbol,
        wallet,
      },
    });
  },
};
