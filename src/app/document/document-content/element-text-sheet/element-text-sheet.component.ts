import {Component, Input, OnChanges} from '@angular/core';
import {Element} from '../../shared/model/element.model';
import {ElementType} from '../../shared/element-type';

@Component({
  selector: 'app-element-text-sheet',
  templateUrl: './element-text-sheet.component.html',
  styleUrls: ['./element-text-sheet.component.css']
})
export class ElementTextSheetComponent implements OnChanges {
  ElementType = ElementType;
  @Input() element: Element;
  lineTotalCount = 1;

  ngOnChanges(changes){
    if(changes && changes.element && changes.element.currentValue && changes.element.currentValue.text){
      const text = changes.element.currentValue.text;
      this.lineTotalCount = (text.split('\n') || []).length;
    } else {
      this.lineTotalCount = 1;
    }
  }
}
