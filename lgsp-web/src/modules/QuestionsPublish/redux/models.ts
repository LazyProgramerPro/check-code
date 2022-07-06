export interface SearchQuestionParam{
  text?: string,
  page?: number,
  size?: number
}

export interface CreateQuestionParam{
  question: string;
  answer: string;
}

export interface UpdateQuestionParam{
  questionId: string;
  question: string;
  answer: string;
}

export interface DeleteQuestionParam{
  questionId: string;
}
