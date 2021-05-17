export interface MultiChoicesQuestionDTO {
    question: string;
    items: string[];
    correctAnswers: string[];
    courrentAnswers: string[];
    score: number;
    unitScore: number;
}

export const emptyMultiChoicesQuestionDTO = (): MultiChoicesQuestionDTO => {
    return {
        question: '',
        items: [],
        correctAnswers: [],
        courrentAnswers: [],
        score: 0,
        unitScore: 0,
    };
  }