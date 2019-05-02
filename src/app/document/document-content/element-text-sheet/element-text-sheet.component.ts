import {Component, Input, OnInit} from '@angular/core';
import {Element} from '../../shared/model/element.model';
import {ElementType} from '../../shared/element-type';

@Component({
  selector: 'app-element-text-sheet',
  templateUrl: './element-text-sheet.component.html',
  styleUrls: ['./element-text-sheet.component.css']
})
export class ElementTextSheetComponent implements OnInit {
  ElementType = ElementType;
  @Input() element: Element;
  textLines = [];

  ngOnInit() {
    this.textLines = this.element && this.element.text && this.element.text.split('\n') || [];
    this.textLines = this.textLines.map(line => line.replace(/ /g, '&nbsp;'));
  }
}
