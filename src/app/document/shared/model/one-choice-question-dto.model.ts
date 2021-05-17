export interface OneChoiceQuestionDTO {
    question: string;
    items: string[];
    correctAnswer: string;
    courrentAnswer: string;
    score: number;
    unitScore: number;
}

export const emptyOneChoiceQuestionDTO = (): OneChoiceQuestionDTO => {
    return {
        question: '',
        items: [],
        correctAnswer: '',
        courrentAnswer: '',
        score: 0,
        unitScore: 0,
    };
  }