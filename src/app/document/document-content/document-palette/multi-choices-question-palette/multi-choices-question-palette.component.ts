import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementType } from 'src/app/document/shared/element-type';
import { emptyMultiChoicesQuestionDTO } from 'src/app/document/shared/model/multi-choices-question-dto.model';
import { AbstractPaletteComponent } from '../abstract-palette.component';

@Component({
  selector: 'app-multi-choices-question-palette',
  templateUrl: './multi-choices-question-palette.component.html',
  styleUrls: ['./multi-choices-question-palette.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiChoicesQuestionPaletteComponent),
    multi: true
  }
 ]
})
export class MultiChoicesQuestionPaletteComponent extends AbstractPaletteComponent implements OnInit {
  questionForm: FormGroup;
  question = emptyMultiChoicesQuestionDTO();

  ngOnInit() {
    const fb = new FormBuilder();
    this.questionForm = fb.group({
      question: [''],
      score: [0],
      questionComplement: [''],
      newCorrectAnswer: [''],
      newChoice: []
    });
  }

  deleteChoice(item){
    this.question.items = this.question.items.filter(i => i !== item);
    this.element.text = JSON.stringify(this.question);
    this.onChange(this.element);
  }

  deleteCorrectAnswer(item){
    this.question.correctAnswers = this.question.correctAnswers.filter(i => i !== item);
    this.element.text = JSON.stringify(this.question);
    this.onChange(this.element);
  }

  addNewChoice(){
    const item = this.questionForm.get('newChoice').value;
    this.question.items.push(item);
    this.element.text = JSON.stringify(this.question);
    this.questionForm.get('newChoice').setValue('');
    this.onChange(this.element);
  }

  addNewCorrectAnswer(){
    const item = this.questionForm.get('newCorrectAnswer').value;
    this.question.correctAnswers.push(item);
    this.element.text = JSON.stringify(this.question);
    this.questionForm.get('newCorrectAnswer').setValue('');
    this.onChange(this.element);
  }

  changed(){
    if(this.element && this.element.type === ElementType.MULTI_CHOICES_QUESTION){
      this.formToQuestion();
      this.element.text = JSON.stringify(this.question);
      this.onChange(this.element);
    }
  }

  writeValue(value){
    if(value && value.text){
      this.elementToQuestion(value);
      this.questionToForm();
    }
    super.writeValue(value);
  }

  private elementToQuestion(value){
    if(value && value.text){
      this.question = JSON.parse(value.text);
    }
  }

  private questionToForm(){
    this.questionForm.get('question').patchValue(this.question.question);
    this.questionForm.get('score').patchValue(this.question.score);
    this.questionForm.get('questionComplement').patchValue(this.question.questionComplement);
  }

  private formToQuestion(){
    this.question.score = this.questionForm.get('score').value;
    this.question.question = this.questionForm.get('question').value;
    this.question.questionComplement = this.questionForm.get('questionComplement').value;
  }
}
