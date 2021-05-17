export interface MultiChoicesQuestionDTO {
    question: string;
    key: string;
    items: string[];
    correctAnswers: string[];
    courrentAnswers: string[];
    score: number;
}

export const emptyMultiChoicesQuestionDTO = (): MultiChoicesQuestionDTO => {
    return {
        question: '',
        key: Math.random().toString(17),
        items: [],
        correctAnswers: [],
        courrentAnswers: [],
        score: 0,
    };
  }