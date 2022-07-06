import { ListResponseBase, ResponseBase } from '../../../../models/baseResponse';
import { GET, POST } from '../../../../services';
import { CreateQuestionParam } from '../models';

export const searchQuesiton = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/question/publish/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};

export const createQuestion = async (param: CreateQuestionParam): Promise<ResponseBase> => {
  return await POST('core-svc/question/create', param);
};
