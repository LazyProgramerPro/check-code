import {ListResponseBase, ResponseBase} from "../../../../models/baseResponse";
import {GET, POST} from "../../../../services";
import {AnswerQuestionParam, DeleteQuestionParam} from "../models";

export const searchQuesiton = async (params?: any): Promise<ListResponseBase<any>> => {
  const response = (await GET('core-svc/question/search', params)) as ListResponseBase<any>;
  return {
    total: response.total,
    rows: response?.rows || [],
    code: response.code,
    message: response.message,
  };
};


export const answerQuestion = (param: AnswerQuestionParam): Promise<any>  => {
  return  POST('core-svc/question/answer-and-publish', param);
}

export const deleteQuestion = async (param: DeleteQuestionParam): Promise<ResponseBase> => {
  return (await POST(`core-svc/question/${param.questionId}/delete`, param));
}
