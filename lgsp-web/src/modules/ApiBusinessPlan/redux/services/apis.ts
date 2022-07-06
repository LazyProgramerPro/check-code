import {GET, POST} from "../../../../services";
import {ListResponseBase} from "../../../../models/baseResponse";
import {
  GetApiSubscriptionUserParam,
  UpdateApiPolicyParam,
  UpdateApiPolicySubscriptionParam,
  UpdateApiStatusSubscriptionParam
} from "../models";

export const getAllPolicyService = async (): Promise<any> => {
  try {
    const response = (await GET(`core-svc/policy/subscription/getAll`)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
}

export const getApiPolicyService = async (apiId?: string): Promise<any> => {
  try {
    const response = (await GET(`core-svc/publisher-apis/${apiId}/business-plan`)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
};

export const updateApiPolicyService = async (params?: UpdateApiPolicyParam): Promise<any> => {
  try {
    return POST('core-svc/publisher-apis/update-business-plan', params);
  } catch(error) {
    return error;
  }
}

export const getApiSubscriptionUserService = async (params?: GetApiSubscriptionUserParam): Promise<any> => {
  try {
    const response = (await GET(`core-svc/subscription/list-user-access`, params)) as ListResponseBase<any>;
    return response;
  } catch(error) {
    return error;
  }
};

export const blockSubscription = async (params?: UpdateApiStatusSubscriptionParam): Promise<any> => {
  try {
    return POST('core-svc/subscription/block', params);
  } catch(error) {
    return error;
  }
}

export const unblockSubscription = async (params?: UpdateApiStatusSubscriptionParam): Promise<any> => {
  try {
    return POST('core-svc/subscription/unblock', params);
  } catch(error) {
    return error;
  }
}

export const updateApiPolicySubscriptionService = async (params?: UpdateApiPolicySubscriptionParam): Promise<any> => {
  try {
    return POST('core-svc/subscription/policy', params);
  } catch(error) {
    return error;
  }
}
