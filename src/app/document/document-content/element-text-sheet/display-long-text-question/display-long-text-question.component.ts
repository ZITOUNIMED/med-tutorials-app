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
  textLines = [];

  constructor(protected appStoreService: AppStoreService){
    super(appStoreService);
  }

  changed(){
    let score = 0;
    if(this.isCorrectAnswer()){
      score = this.question.score;
    }

    this.appStoreService.setQuestionScore(this.question.key, score, this.questionCtrl.value);
  }

  setQuestionWrapperAnswers(questionWrapper:QuestionWrapper){
    if(questionWrapper){
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
  }

  ngOnChanges(changes){
    if(changes && this.text){
      this.question = JSON.parse(this.text);
      const questionComplement = this.question.questionComplement;
      if(questionComplement){
        this.textLines =questionComplement.split('\n');
        this.textLines = this.textLines.map(line => line.replace(/ /g, '&nbsp;'));
      }
      this.questionCtrl.patchValue(this.question.courrentAnswer);
    }
  }

  isCorrectAnswer(){
    if(this.question && this.question.correctAnswer){
      const currentValue = this.questionCtrl.value.trim().toUpperCase();
      const correctAnswer = this.question.correctAnswer.trim().toUpperCase();
  
      return correctAnswer == currentValue;
    }
    return false;
  }
}
