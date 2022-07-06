import {AppError} from 'src/models/common';

import {GET_STATISTIC_BY_MONTH, GET_STATISTIC_BY_MONTH_ERROR, GET_STATISTIC_BY_MONTH_SUCCESS} from '../../constant';

export interface StatisticByMonthState {
  loading: boolean;
  error?: AppError;
  item?: any;
}

const initialState: StatisticByMonthState = {
  loading: false
};

export default (state = initialState, action: any): StatisticByMonthState => {
  const {type, payload, error} = action;

  switch (type) {
    case GET_STATISTIC_BY_MONTH:
      return {
        ...state,
        error: undefined,
        loading: true,
      };

    case GET_STATISTIC_BY_MONTH_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };

    case GET_STATISTIC_BY_MONTH_SUCCESS:
      return {
        ...state,
        item: payload.data,
        loading: false,
      };
    default:
      return state;
  }

};
