import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OneChoiceQuestionDTO } from 'src/app/document/shared/model/one-choice-question-dto.model';

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

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
    }
  }

  showHideAnswer(){
    this.isAnswerDisplayed = !this.isAnswerDisplayed;
  }
}
