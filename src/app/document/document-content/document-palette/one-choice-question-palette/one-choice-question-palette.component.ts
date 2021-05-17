import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { emptyOneChoiceQuestionDTO } from '../../../shared/model/one-choice-question-dto.model';
import { AbstractPaletteComponent } from '../abstract-palette.component';
import { ElementType } from 'src/app/document/shared/element-type';

@Component({
  selector: 'app-one-choice-question-palette',
  templateUrl: './one-choice-question-palette.component.html',
  styleUrls: ['./one-choice-question-palette.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OneChoiceQuestionPaletteComponent),
    multi: true
  }
 ]
})
export class OneChoiceQuestionPaletteComponent extends AbstractPaletteComponent implements OnInit {
  questionForm: FormGroup;
  question = emptyOneChoiceQuestionDTO();

  ngOnInit() {
    const fb = new FormBuilder();
    this.questionForm = fb.group({
      question: [''],
      score: [0],
      correctAnswer: [''],
      newItem: []
    });
  }

  deleteItem(item){
    this.question.items = this.question.items.filter(i => i !== item);
    this.element.text = JSON.stringify(this.question);
    this.onChange(this.element);
  }

  addItem(){
    const item = this.questionForm.get('newItem').value;
    this.question.items.push(item);
    this.element.text = JSON.stringify(this.question);
    this.questionForm.get('newItem').setValue('');
    this.onChange(this.element);
  }

  changed(){
    if(this.element && this.element.type === ElementType.ONE_CHOICE_QUESTION){
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
    this.questionForm.get('correctAnswer').patchValue(this.question.correctAnswer);
  }

  private formToQuestion(){
    this.question.correctAnswer = this.questionForm.get('correctAnswer').value;
    this.question.score = this.questionForm.get('score').value;
    this.question.question = this.questionForm.get('question').value;
  }

}
