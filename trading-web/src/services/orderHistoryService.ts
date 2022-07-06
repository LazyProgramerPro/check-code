import apiClient from 'services/apiService';

export const OrderHistoryServices = {
  getOrderHistory(startTime, endTime, status, pageIndex, pageSize) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/order/getOrderHistory`,
      params: {
        startTime: startTime,
        endTime: endTime,
        status: status,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  },
};
