import { ISystemIntroInforEntity } from './../models';
import { CREATE_SYSTEM_INTRO_INFOR, CREATE_SYSTEM_INTRO_INFOR_ERROR, CREATE_SYSTEM_INTRO_INFOR_SUCCESS, SET_ROW_EDITTING, UPDATE_SYSTEM_INTRO_INFOR, UPDATE_SYSTEM_INTRO_INFOR_SUCCESS, UPDATE_SYSTEM_INTRO_INFOR_ERROR, UPDATE_SLIDER_INFOR, UPDATE_SLIDER_INFOR_SUCCESS, UPDATE_SLIDER_INFOR_ERROR, PUBLISH_INTRO_INFOR, PUBLISH_INTRO_INFOR_SUCCESS, PUBLISH_INTRO_INFOR_ERROR, UPDATE_ADDRESS_INFOR, UPDATE_ADDRESS_INFOR_SUCCESS, UPDATE_ADDRESS_INFOR_ERROR, DELETE_INTRO_INFOR, DELETE_INTRO_INFOR_ERROR, DELETE_INTRO_INFOR_SUCCESS } from './../constants';
import { ISystemIntroInforState } from '../models';
import { FETCH_SYSTEM_INTRO_INFOR, FETCH_SYSTEM_INTRO_INFOR_SUCCESS, FETCH_SYSTEM_INTRO_INFOR_ERROR, RELOAD_SYSTEM_INTRO_INFOR } from '../constants';


const initState: ISystemIntroInforState = {
  loading: false,
  data: [],
  total: 0,
  flag_reload: false,
  rowEditting: null,
  error: undefined,

};

const SystemIntroInforReducer = (state = initState, action: any): ISystemIntroInforState => {
  const { type, payload, error, rowEditting } = action;
  switch (type) {
    case UPDATE_SYSTEM_INTRO_INFOR:
    case UPDATE_SLIDER_INFOR:
    case FETCH_SYSTEM_INTRO_INFOR:
    case CREATE_SYSTEM_INTRO_INFOR:
    case UPDATE_ADDRESS_INFOR:
    case PUBLISH_INTRO_INFOR:
    case DELETE_INTRO_INFOR:
      return {
        ...state,
        loading: true,
      };

    case PUBLISH_INTRO_INFOR_SUCCESS:
    case CREATE_SYSTEM_INTRO_INFOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FETCH_SYSTEM_INTRO_INFOR_SUCCESS:
      return {
        ...state,
        data: payload?.rows,
        total: payload?.total,
        loading: false,
      };

    case UPDATE_SYSTEM_INTRO_INFOR_SUCCESS:
    case UPDATE_SLIDER_INFOR_SUCCESS:
    case UPDATE_ADDRESS_INFOR_SUCCESS:
      const cloneIntroInfor = JSON.parse(JSON.stringify(state.data)) || [];
      const newData = cloneIntroInfor.map((row: Partial<ISystemIntroInforEntity>) => {
        if (row?.id == payload?.id) {
          row = { ...row, ...payload }
        }
        return row;
      })
      return {
        ...state,
        loading: false,
        data: [...newData]
      };

      case DELETE_INTRO_INFOR_SUCCESS:
        const cloneListData = JSON.parse(JSON.stringify(state.data)) || [];
        const newDataAfterRemove = cloneListData.filter((row: Partial<ISystemIntroInforEntity>) => row?.id !== payload?.id)
        return {
          ...state,
          loading: false,
          total: state.total - 1,
          data: [...newDataAfterRemove]
        };

    case UPDATE_SYSTEM_INTRO_INFOR_ERROR:
    case UPDATE_SLIDER_INFOR_ERROR:
    case FETCH_SYSTEM_INTRO_INFOR_ERROR:
    case CREATE_SYSTEM_INTRO_INFOR_ERROR:
    case PUBLISH_INTRO_INFOR_ERROR:
    case UPDATE_ADDRESS_INFOR_ERROR:
    case DELETE_INTRO_INFOR_ERROR:
      return {
        ...state,
        loading: false,
        error: error
      };

    case SET_ROW_EDITTING:
      return {
        ...state,
        rowEditting: rowEditting
      };

    case RELOAD_SYSTEM_INTRO_INFOR:
      return {
        ...state,
        flag_reload: !state.flag_reload
      }

    default:
      return state;
  }
}

export default SystemIntroInforReducer;
