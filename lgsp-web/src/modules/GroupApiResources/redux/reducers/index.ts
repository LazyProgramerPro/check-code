import { GET_GROUP_API_RESOURCES } from './../constants';
import { IGroupApiResourcesState } from './../models';



const initState: IGroupApiResourcesState = {
  loading: false,
  data: null,
  flag_reload: false,
  error: undefined
};

const groupApiResourcesReducer = (state = initState, {type, payload, error}: any): IGroupApiResourcesState => {
  switch (type) {
    case GET_GROUP_API_RESOURCES:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }


}
export default groupApiResourcesReducer;
