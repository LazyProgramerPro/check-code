import {GET, POST, POSTIMAGE} from '../../../../services';
import { IGroupApiDetailResponse} from "../models";
import {RestApiEntity} from "../../../RestApi/redux/models";
import {ListResponseBase} from "../../../../models/baseResponse";


export const getGroupApiDetailService = async (groupId: string): Promise<IGroupApiDetailResponse> => {
  try {
    const response = (await GET(`core-svc/publisher-apis/${groupId}`)) as IGroupApiDetailResponse;
    return response;
  } catch (error) {
    return error as IGroupApiDetailResponse;
  }
};


