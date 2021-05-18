import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiChoicesQuestionDTO } from 'src/app/document/shared/model/multi-choices-question-dto.model';
import { QuestionWrapper } from 'src/app/document/shared/model/question-wrapper';
import { AppStoreService } from 'src/app/shared/service/app.store.service';
import { AbstractDisplayQuestionComponent } from '../../shared/abstract-display-question.component';

@Component({
  selector: 'app-display-multi-choices-question',
  templateUrl: './display-multi-choices-question.component.html',
  styleUrls: ['./display-multi-choices-question.component.css']
})
export class DisplayMultiChoicesQuestionComponent extends AbstractDisplayQuestionComponent implements OnChanges, OnInit {
  @Input() text;
  question: MultiChoicesQuestionDTO;
  isAnswerDisplayed = false;
  questionControls: FormControl[];
  answers = new Set<string>();

  constructor(protected appStoreService: AppStoreService){
    super(appStoreService);
  }

  ngOnInit(){
    this.questionControls = this.question.items.map(item => new FormControl(false));
    super.ngOnInit();
  }

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
    }
  }

  showHideAnswer(){
    this.isAnswerDisplayed = !this.isAnswerDisplayed;
  }

  changed(checked, item){
    if(checked){
      this.answers.add(item);
    } else {
      this.answers.delete(item);
    }

    let score = 0;
    if(this.answers.size === this.question.correctAnswers.length){
      let twoListsEquals = true;
      this.answers.forEach(answer => {
          if(!this.question.correctAnswers.some(correctAnswer => correctAnswer === answer)){
            twoListsEquals = false;
          }
      });

      if(twoListsEquals){
        score = this.question.score;
      }
    }

    this.appStoreService.setQuestionScore(this.question.key, score, item);
  }

  findColor(item: string, checked){
    const isCorrectAnswer = this.question.correctAnswers.some(value => value === item);
    if(isCorrectAnswer && checked){
      return 'green';
    }

    if(isCorrectAnswer){
      return 'black';
    }

    return checked ? 'red' : '';
  }

  setQuestionWrapperAnswers(questionWrapper:QuestionWrapper){

  }
}
