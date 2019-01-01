import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { ElementType } from '../shared/element-type';
import { Element } from '../shared/element.model';
import { ELEMENTS_CHOICES } from '../shared/element-choice';

@Component({
  selector: 'app-document-palette',
  templateUrl: './document-palette.component.html',
  styleUrls: ['./document-palette.component.css']
})
export class DocumentPaletteComponent implements OnInit {

  ELEMENTS_CHOICES = ELEMENTS_CHOICES;
  ElementType = ElementType;
  elementChoiceKey: string;
  elementForm: FormGroup;
  @Output() onSubmitChange = new EventEmitter<Element>();
  element: Element;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.elementForm = this.fb.group({
      type: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  selectElement() {
    this.elementChoiceKey = this.elementForm.get("type").value;
    // const component =
    // this.onSelectComponentChange.emit(component);
  }

  onSubmit() {
    const type = this.elementForm.get("type").value;
    const text = this.elementForm.get("text").value;
    const element: Element = {
      id: null,
      type: type,
      text: text,
      row: 0
    };
    this.elementForm.get("text").setValue("");
    this.onSubmitChange.emit(element);
  }

}
