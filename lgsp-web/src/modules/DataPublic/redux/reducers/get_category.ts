import { GET_CATEGORY, GET_CATEGORY_ERROR, GET_CATEGORY_SUCCESS, RELOAD_DATA_CATEGORY } from '../constant';
import { GetCategoryAction, GetCategoryState } from '../models';

const initState: GetCategoryState = {
  loading: false,
  rows: [],
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
};

export const getCategoryState = (
  state = initState,
  { type, payload, error, params }: GetCategoryAction,
): GetCategoryState => {
  switch (type) {
    case GET_CATEGORY: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        rows:
          payload?.rows.map((item, index) => {
            return {
              ...item,
              index,
            };
          }) || [],
        total: payload?.total || 0,
      };
    }

    case GET_CATEGORY_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_CATEGORY: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
