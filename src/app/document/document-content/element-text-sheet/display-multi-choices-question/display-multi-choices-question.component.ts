import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiChoicesQuestionDTO } from 'src/app/document/shared/model/multi-choices-question-dto.model';
import { AppStoreService } from 'src/app/shared/service/app.store.service';

@Component({
  selector: 'app-display-multi-choices-question',
  templateUrl: './display-multi-choices-question.component.html',
  styleUrls: ['./display-multi-choices-question.component.css']
})
export class DisplayMultiChoicesQuestionComponent implements OnChanges, OnInit {
  @Input() text;
  question: MultiChoicesQuestionDTO;
  isAnswerDisplayed = false;
  questionControls: FormControl[];
  answers = new Set<string>();

  constructor(private appStoreService: AppStoreService){}

  ngOnInit(){
    this.questionControls = this.question.items.map(item => new FormControl(false));
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
    if(this.question){
      this.appStoreService.setQuestionScore(this.question.key, 0);
      if(checked){
        this.answers.add(item);
      } else {
        this.answers.delete(item);
      }
      
      if(this.answers.size === this.question.correctAnswers.length){
        let twoListsEquals = true;
        this.answers.forEach(answer => {
            if(!this.question.correctAnswers.some(correctAnswer => correctAnswer === answer)){
              twoListsEquals = false;
            }
        });
        if(twoListsEquals){
          this.appStoreService.setQuestionScore(this.question.key, this.question.score);
        }
      }
    }
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
}
