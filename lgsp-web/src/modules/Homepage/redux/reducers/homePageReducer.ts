import {GET_CONTENT_HOME_PAGE, GET_CONTENT_HOME_PAGE_ERROR, GET_CONTENT_HOME_PAGE_SUCESS} from '../constants';
import {IHomePageAction, IHomePageState} from '../models';

const initState: IHomePageState = {
  loading: false,
  error: undefined,
  data: {}
};

const homePageReducer = (state = initState, {type, payload, error}: IHomePageAction): IHomePageState => {
  switch (type) {
    case GET_CONTENT_HOME_PAGE:
      return {
        ...state,
        loading: true
      };

    case GET_CONTENT_HOME_PAGE_SUCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };

    case GET_CONTENT_HOME_PAGE_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
}

export default homePageReducer;
