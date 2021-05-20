import { QuestionCommunDTO } from "./question-commun-dto";

export interface TextQuestionDTO extends QuestionCommunDTO {
    question: string;
    key: string;
    questionComplement: string;
    correctAnswer: string;
    courrentAnswer: string;
    score: number;
}

export const emptyTextQuestionDTO = (): TextQuestionDTO => {
    return {
        question: '',
        key: Math.random().toString(17),
        questionComplement: '',
        correctAnswer: '',
        courrentAnswer: '',
        score: 0,
    };
  }