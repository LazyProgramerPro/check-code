import apiClient from 'services/apiService';

export const OrderbookServices = {
  Orderbook({ pair, limit }) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/order/orderbook?pair=${pair}&limit=${limit}`,
    });
  },
};
