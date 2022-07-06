import { IGroupApiResourcesAction } from './../models';
import { IRestApiObject } from 'src/modules/GroupApi/redux/models';
import { GET_GROUP_API_RESOURCES } from './../constants';
export const getGroupApiResuorces = (payload: IRestApiObject): IGroupApiResourcesAction => {
  return {
    type: GET_GROUP_API_RESOURCES,
    payload
  }
}
