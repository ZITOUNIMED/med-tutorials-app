import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ElementType } from '../shared/element-type';
import { Element } from '../shared/element.model';
import { ELEMENTS_CHOICES } from '../shared/element-choice';

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
  @Input() element: Element;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.elementForm = this.fb.group({
      type: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  selectElement() {
    this.elementChoiceKey = this.elementForm.get("type").value;
  }

  onSubmit() {
    const type = this.elementForm.get("type").value;
    const text = this.elementForm.get("text").value;

    if(this.element && this.element.id){
      this.element.type = type;
      this.element.text = text;
    } else {
      this.element = {
        id: null,
        type: type,
        text: text,
        row: 0
      } as Element;
    }

    this.clearForm();
    this.onSubmitChange.emit(this.element);
  }

  clearForm(){
    this.elementForm.reset();
  }

  ngOnChanges(changes){
    if(this.element && this.elementForm){
      this.elementForm.get('type').patchValue(this.element.type);
      this.elementForm.get('text').patchValue(this.element.text)
    }
  }

}
