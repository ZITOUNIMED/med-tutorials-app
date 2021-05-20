import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionWrapper } from 'src/app/document/shared/model/question-wrapper';
import { TextQuestionDTO } from 'src/app/document/shared/model/text-question-dto';
import { AppStoreService } from 'src/app/shared/service/app.store.service';
import { AbstractDisplayQuestionComponent } from '../../shared/abstract-display-question.component';

@Component({
  selector: 'app-display-long-text-question',
  templateUrl: './display-long-text-question.component.html',
  styleUrls: ['./display-long-text-question.component.css']
})
export class DisplayLongTextQuestionComponent extends AbstractDisplayQuestionComponent implements OnInit {
  @Input() text;
  question: TextQuestionDTO;
  questionCtrl = new FormControl('');

  constructor(protected appStoreService: AppStoreService){
    super(appStoreService);
  }

  ngOnInit(): void {
  }

  changed(){
    let score = 0;
    if(this.isCorrectAnswer()){
      score = this.question.score;
    }

    this.appStoreService.setQuestionScore(this.question.key, score, this.questionCtrl.value);
  }

  setQuestionWrapperAnswers(questionWrapper:QuestionWrapper){
    
  }if(questionWrapper){
    let answers = Array.from(questionWrapper.answers);
    if(answers){
      answers = answers.filter((item: string) => item && item.length)
    }
    if(answers.length){
      const value = answers[answers.length - 1];
      if(value !== this.questionCtrl.value){
        this.questionCtrl.patchValue(value);
      }
    }
  }

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
      this.questionCtrl.patchValue(this.question.courrentAnswer);
    }
  }

  isCorrectAnswer(){
    const currentValue = this.questionCtrl.value.trim().toUpperCase();
    const correctAnswer = this.question.correctAnswer.trim().toUpperCase();

    return correctAnswer.includes(currentValue);
  }
}
