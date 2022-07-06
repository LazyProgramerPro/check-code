import {GET} from '../../../../services';
import {IFooterResponse, IHomePageResponse} from "../models";

export const getContentHomePageService = async (params?: any): Promise<IHomePageResponse> => {
  const response = (await GET('api-svc/public/data', params)) as any;
  console.log("response: " + JSON.stringify(response));

  return {
    payload: response?.item,
    code: response.code,
    message: response.message,
  };
};

export const getContentFooterService = async (params?: any): Promise<IFooterResponse> => {
  const response = (await GET('api-svc/public/footer-address', params)) as any;
  return {
    payload: response,
    code: 0,
    message: "thành công",
  };
};



