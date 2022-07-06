import {DATA_GENERAL, DATA_GENERAL_SUCCESS, DATA_GENERAL_ERROR, RELOAD_DATA_GENERAL} from '../constanst'
import { DataGeneral, DataGeneralState, DataGeneralAction} from '../models'
const initData: DataGeneral = {
  threadNumber: '',
  directoryNumber: '',
  loggingDirectoryNumber: '',
}

const initState: DataGeneralState = {
  loading: false,
  item: initData,
  total: 0,
  flag_reload: false,
  params: undefined,
  error: undefined,
}

export const getGeneralState = (
  state = initState,
  { type, payload, error, params }: DataGeneralAction,
): DataGeneralState => {
  switch (type) {
    case DATA_GENERAL: {
      return {
        ...state,
        loading: true,
        params: {
          ...state.params,
          ...params,
        },
      };
    }

    case DATA_GENERAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        item: payload?.item,
      };
    }

    case DATA_GENERAL_ERROR: {
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case RELOAD_DATA_GENERAL: {
      return {
        ...state,
        flag_reload: !state.flag_reload,
      };
    }
    default:
      return state;
  }
};
