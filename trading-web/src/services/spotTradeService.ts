import apiClient from 'services/apiService';

export const spotTradeServices = {
  buySpotLimit(
    pair_id: string,
    type: string,
    price: number,
    amount: number,
    stop: any,
    limit: any,
  ) {
    return apiClient.request({
      method: 'POST',
      url: '/wise-router/orders/buy',
      data: {
        pair_id,
        type,
        price,
        amount,
        stop,
        limit,
      },
    });
  },
  sellSpotLimit(
    pair_id: string,
    type: string,
    price: number,
    amount: number,
    stop: any,
    limit: any,
  ) {
    return apiClient.request({
      method: 'POST',
      url: '/wise-router/orders/sell',
      data: {
        pair_id,
        type,
        price,
        amount,
        stop,
        limit,
      },
    });
  },
};
