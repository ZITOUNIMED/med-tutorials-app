import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OneChoiceQuestionDTO } from '../../../shared/model/one-choice-question-dto.model';
import { AppStoreService } from '../../../../shared/service/app.store.service';

@Component({
  selector: 'app-display-one-choice-question',
  templateUrl: './display-one-choice-question.component.html',
  styleUrls: ['./display-one-choice-question.component.css']
})
export class DisplayOneChoiceQuestionComponent implements OnChanges {
  @Input() text;
  question: OneChoiceQuestionDTO;
  isAnswerDisplayed = false;
  questionCtrl = new FormControl('');

  constructor(private appStoreService: AppStoreService){}

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
    if(this.question){
      if(this.questionCtrl.value === this.question.correctAnswer){
        this.appStoreService.setQuestionScore(this.question.key, this.question.score);
      } else {
        this.appStoreService.setQuestionScore(this.question.key, 0);
      }
    }
  }
}
