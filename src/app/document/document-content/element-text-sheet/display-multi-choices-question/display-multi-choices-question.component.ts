import { Component, Input, OnChanges } from '@angular/core';
import { MultiChoicesQuestionDTO } from 'src/app/document/shared/model/multi-choices-question-dto.model';

@Component({
  selector: 'app-display-multi-choices-question',
  templateUrl: './display-multi-choices-question.component.html',
  styleUrls: ['./display-multi-choices-question.component.css']
})
export class DisplayMultiChoicesQuestionComponent implements OnChanges {
  @Input() text;
  question: MultiChoicesQuestionDTO;

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
    }
  }

}
