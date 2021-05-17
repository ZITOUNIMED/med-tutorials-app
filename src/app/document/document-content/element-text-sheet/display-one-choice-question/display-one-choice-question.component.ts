import { Component, Input, OnChanges } from '@angular/core';
import { OneChoiceQuestionDTO } from 'src/app/document/shared/model/one-choice-question-dto.model';

@Component({
  selector: 'app-display-one-choice-question',
  templateUrl: './display-one-choice-question.component.html',
  styleUrls: ['./display-one-choice-question.component.css']
})
export class DisplayOneChoiceQuestionComponent implements OnChanges {
  @Input() text;
  question: OneChoiceQuestionDTO;

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
    }
  }
}
