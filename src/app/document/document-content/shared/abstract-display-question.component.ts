import { AppStoreService } from "src/app/shared/service/app.store.service";
import { QuestionCommunDTO } from "../../shared/model/question-commun-dto";
import { QuestionWrapper } from "../../shared/model/question-wrapper";

export abstract class AbstractDisplayQuestionComponent{
    question: QuestionCommunDTO;
    constructor(protected appStoreService: AppStoreService){}

    ngOnInit(){
        this.appStoreService.getDocumentWrapperQuestions()
        .subscribe(questions => {
            let questionWrapper = null;
            if(questions){
                questionWrapper = questions[this.question.key];
            }
            this.setQuestionWrapperAnswers(questionWrapper);
        });
    }

    abstract showHideAnswer();
    abstract setQuestionWrapperAnswers(questionWrapper:QuestionWrapper);
}