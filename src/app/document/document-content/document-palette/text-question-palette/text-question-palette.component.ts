import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementType } from 'src/app/document/shared/element-type';
import { emptyTextQuestionDTO } from 'src/app/document/shared/model/text-question-dto';
import { AbstractPaletteComponent } from '../abstract-palette.component';

@Component({
  selector: 'app-text-question-palette',
  templateUrl: './text-question-palette.component.html',
  styleUrls: ['./text-question-palette.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextQuestionPaletteComponent),
    multi: true
  }
 ]
})
export class TextQuestionPaletteComponent extends AbstractPaletteComponent implements OnInit {
  questionForm: FormGroup;
  question = emptyTextQuestionDTO();

  ngOnInit() {
    const fb = new FormBuilder();
    this.questionForm = fb.group({
      question: [''],
      score: [0],
      questionComplement: [''],
      correctAnswer: [''],
    });
  }

  changed(){
    if(this.element && (this.element.type === ElementType.SHORT_TEXT_QUESTION || this.element.type === ElementType.LONG_TEXT_QUESTION)){
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
    this.questionForm.get('questionComplement').patchValue(this.question.questionComplement);
    this.questionForm.get('score').patchValue(this.question.score);
    this.questionForm.get('correctAnswer').patchValue(this.question.correctAnswer);
  }

  private formToQuestion(){
    this.question.correctAnswer = this.questionForm.get('correctAnswer').value;
    this.question.questionComplement = this.questionForm.get('questionComplement').value;
    this.question.score = this.questionForm.get('score').value;
    this.question.question = this.questionForm.get('question').value;
  }
}