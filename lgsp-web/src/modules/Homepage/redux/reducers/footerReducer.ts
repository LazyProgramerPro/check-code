import {GET_CONTENT_FOOTER_PAGE, GET_CONTENT_FOOTER_PAGE_ERROR, GET_CONTENT_FOOTER_PAGE_SUCCESS} from '../constants';
import {IFooterAction, IFooterState} from "../models";

const initState: IFooterState = {
  loading: false,
  error: undefined,
  data: {}
};

const footerReducer = (state = initState, {type, payload, error}: IFooterAction): IFooterState => {
  switch (type) {
    case GET_CONTENT_FOOTER_PAGE:
      return {
        ...state,
        loading: true
      };

    case GET_CONTENT_FOOTER_PAGE_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };

    case GET_CONTENT_FOOTER_PAGE_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
}

export default footerReducer;
