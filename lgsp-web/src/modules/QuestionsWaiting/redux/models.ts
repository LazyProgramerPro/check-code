export interface SearchQuestionParam{
  text?: string,
  page?: number,
  size?: number
}

export interface CreateQuestionParam{
  question: string;
}

export interface AnswerQuestionParam{
  questionId: string,
  answer: string
}

export interface DeleteQuestionParam{
  questionId: string
}
