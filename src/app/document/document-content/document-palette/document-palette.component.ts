import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {ELEMENTS_CHOICES} from '../../shared/element-choice';
import {ElementType} from '../../shared/element-type';
import {Element, emptyElement} from '../../shared/model/element.model';

@Component({
  selector: 'app-document-palette',
  templateUrl: './document-palette.component.html',
  styleUrls: ['./document-palette.component.css']
})
export class DocumentPaletteComponent implements OnChanges {
  ELEMENTS_CHOICES = ELEMENTS_CHOICES;
  ElementType = ElementType;
  @Output() onSubmitChange = new EventEmitter<Element>();
  @Output() cancelChange = new EventEmitter<boolean>();
  @Input() element: Element = emptyElement();
  isEditElement = false;

  onSubmit() {
    this.onSubmitChange.emit(this.element);
    this.clearForm();
  }

  onCancel() {
    this.clearForm();
    this.cancelChange.emit(true);
  }

  clearForm() {
    this.isEditElement = false;
    this.element = emptyElement();
  }

  ngOnChanges(changes: any) {
    if ( changes.element && changes.element.currentValue) {
      if(changes.element.currentValue.row>-1 && changes.element.currentValue.page>-1){
        this.isEditElement = true;
      }
    } else {
      this.element = emptyElement();
    }
  }
}
