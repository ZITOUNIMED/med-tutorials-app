export interface OneChoiceQuestionDTO {
    question: string;
    key: string;
    items: string[];
    correctAnswer: string;
    courrentAnswer: string;
    score: number;
}

export const emptyOneChoiceQuestionDTO = (): OneChoiceQuestionDTO => {
    return {
        question: '',
        key: Math.random().toString(17),
        items: [],
        correctAnswer: '',
        courrentAnswer: '',
        score: 0,
    };
  }