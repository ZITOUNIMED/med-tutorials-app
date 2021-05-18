import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OneChoiceQuestionDTO } from '../../../shared/model/one-choice-question-dto.model';
import { AppStoreService } from '../../../../shared/service/app.store.service';
import { AbstractDisplayQuestionComponent } from '../../shared/abstract-display-question.component';
import { QuestionWrapper } from 'src/app/document/shared/model/question-wrapper';

@Component({
  selector: 'app-display-one-choice-question',
  templateUrl: './display-one-choice-question.component.html',
  styleUrls: ['./display-one-choice-question.component.css']
})
export class DisplayOneChoiceQuestionComponent extends AbstractDisplayQuestionComponent implements OnChanges, OnInit {
  @Input() text;
  question: OneChoiceQuestionDTO;
  isAnswerDisplayed = false;
  questionCtrl = new FormControl('');

  constructor(protected appStoreService: AppStoreService){
    super(appStoreService);
  }

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
      this.questionCtrl.patchValue(this.question.courrentAnswer);
    }
  }

  showHideAnswer(){
    this.isAnswerDisplayed = !this.isAnswerDisplayed;
  }

  changed(){
    let score = 0;
    if(this.questionCtrl.value === this.question.correctAnswer){
      score = this.question.score;
    }

    this.appStoreService.setQuestionScore(this.question.key, score, this.questionCtrl.value);
  }

  setQuestionWrapperAnswers(questionWrapper:QuestionWrapper){
    if(questionWrapper){
      let answers = Array.from(questionWrapper.answers);
      if(answers){
        answers = answers.filter(item => item && item.length)
      }
      if(answers.length){
        const value = answers[answers.length - 1];
        if(value !== this.questionCtrl.value){
          this.questionCtrl.patchValue(value);
        }
      }
    }
  }
}
