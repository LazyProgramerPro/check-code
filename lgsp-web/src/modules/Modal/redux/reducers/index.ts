import { IModalState, IModalAction } from './../models';
import { SHOW_MODAL, HIDE_MODAL, CHANGE_MODAL_TITLE, CHANGE_MODAL_CONTENT } from './../constants';


const initState: IModalState = {
  showModal: false,
  title: '',
  component: null
};

const modalReducer = (state = initState, { type, payload }: IModalAction): IModalState => {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        title: '',
        component: null
      };
      case CHANGE_MODAL_TITLE:
        return {
          ...state,
          title: payload?.title,
        };
        case CHANGE_MODAL_CONTENT:
          return {
            ...state,
            component: payload?.component,
          };
    default:
      return state;
  }
}

export default modalReducer;
