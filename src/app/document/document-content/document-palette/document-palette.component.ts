import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ELEMENTS_CHOICES} from '../../shared/element-choice';
import {ElementType} from '../../shared/element-type';
import {Element} from '../../shared/model/element.model';

@Component({
  selector: 'app-document-palette',
  templateUrl: './document-palette.component.html',
  styleUrls: ['./document-palette.component.css']
})
export class DocumentPaletteComponent implements OnInit, OnChanges {
  ELEMENTS_CHOICES = ELEMENTS_CHOICES;
  ElementType = ElementType;
  elementChoiceKey: string;
  elementForm: FormGroup;
  @Output() onSubmitChange = new EventEmitter<Element>();
  @Output() cancelChange = new EventEmitter<boolean>();
  @Input() element: Element;
  maxTextLength = 1200;
  isEditElement = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.elementForm = this.fb.group({
      type: ['', Validators.required],
      text: [
        '',
        [Validators.required, Validators.maxLength(this.maxTextLength)]
      ]
    });
  }

  selectElement() {
    this.elementChoiceKey = this.elementForm.get('type').value;
  }

  onSubmit() {
    const type = this.elementForm.get('type').value;
    const text = this.elementForm.get('text').value;
    const element: Element = {
      id: this.element ? this.element.id : null,
      type: type,
      text: text,
      row: this.element ? this.element.row : -1,
      page: this.element ? this.element.page : -1,
    };
    this.onSubmitChange.emit(element);
    this.clearForm();
  }

  onCancel() {
    this.clearForm();
    this.cancelChange.emit(true);
  }

  clearForm() {
    this.elementForm.reset();
    this.isEditElement = false;
    this.element = null;
  }

  ngOnChanges(changes: any) {
    if ( changes.element && changes.element.currentValue && this.elementForm ) {
      const element = changes.element.currentValue;
      this.isEditElement = true;
      this.elementForm.get('type').patchValue(element.type);
      this.elementForm.get('text').patchValue(element.text);
    }
  }

  get textSize() {
    return this.elementForm.get('text') && this.elementForm.get('text').value
      ? this.elementForm.get('text').value.length
      : 0;
  }
}
