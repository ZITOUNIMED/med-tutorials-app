import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import * as jsPDF from 'jspdf';

import {Document} from '../shared/model/document.model';
import {Element} from '../shared/model/element.model';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/internal/operators';
import {ElementType} from '../shared/element-type';
import {excelReportConfig} from '../../../environments/report/excel.config';

@Component({
  selector: 'app-document-sheet',
  templateUrl: './document-sheet.component.html',
  styleUrls: ['./document-sheet.component.css']
})
export class DocumentSheetComponent implements OnInit {
  document: Document;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  editMode = false;
  element: Element;
  newOrEditElement: Element;
  shouldCancelChanges = true;

  constructor(private route: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(data => data && !!data['document']),
        map(data => data['document']),
      )
      .subscribe(document => {
        this.document = document;
      });
  }

  onSubmit(element) {
    this.newOrEditElement = element;
  }

  onEditElementChange(element) {
    this.element = element;
  }

  onEditModeChange(editMode) {
    this.editMode = editMode;
  }

  onCancelChange(cancel) {
    this.shouldCancelChanges = cancel;
  }

  exportAsPdf() {
    const doc = new jsPDF();
    const htmlStringNodes = this.convertDocumentElementstoHtmlNodes();
    let nextLine = 0;
    for (let i = 0; i < htmlStringNodes.length; i++) {
      const htmlText = htmlStringNodes[i];
      doc.fromHTML(htmlText, 20, nextLine);
      if (nextLine === 25 * 10) {
        doc.addPage();
        nextLine = 0;
      } else {
        nextLine += 10;
      }
    }
    doc.save(this.document.name + '.pdf');
    // const doc = new jsPDF();
    // let page = 0;
    // this.document.elements.sort((e1, e2) => (e1.row - e2.row) + (e1.page - e2.page) * 100);
    // const titlesMap = new Map();
    // titlesMap.set(ElementType.BIG_TITLE, 'h1');
    // titlesMap.set(ElementType.MEDIUM_TITLE, 'h2');
    // titlesMap.set(ElementType.SMALL_TITLE, 'h3');
    // titlesMap.set(ElementType.VERY_SMALL_TITLE, 'h4');
    // do {
    //   if ( page > 0 ) {
    //     doc.addPage();
    //   }
    //   const elements = this.document.elements.filter(e => e.page === page);
    //   elements.sort((e1, e2) => (e1.row - e2.row));
    //   elements.forEach(element => {
    //     doc.setFontSize(12);
    //     const titletag = titlesMap.get(element.type);
    //     if (titletag) {
    //       doc.fromHTML(`<${titletag}>${element.text}</${titletag}>`, element.row * 10 + 20);
    //     } else if (element.type === ElementType.SOURCE_CODE) {
    //       // const lines = element.text.split(/\r*\n/).length;
    //       // doc.fromHTML("<textarea rows='4'>" + element.text + '</textarea>', element.row * 10 + 20);
    //       doc.setFontSize(10);
    //       doc.text(element.text, 20, element.row * 10 + 20);
    //     } else {
    //       doc.text(element.text, 20, element.row * 10 + 20);
    //     }
    //   });
    //   page++;
    // } while ( this.document.elements.some(e => e.page >= page) );
    // doc.save(this.document.name + '.pdf');
  }

  convertDocumentElementstoHtmlNodes() {
    const documentHtmlTextElements = [];
    let pages = this.document.elements.map(element => element.page);
    pages = pages.filter((page, index) => {
      return pages.indexOf(page) >= index;
    });
    pages.forEach( page => {
      const pageHtmlElements = this.convertPageElementstoHtmlNodes(page);
      if (pageHtmlElements && pageHtmlElements.length) {
        documentHtmlTextElements.push(...pageHtmlElements);
      }
    });

    return documentHtmlTextElements;
  }

  convertPageElementstoHtmlNodes(page: number) {
    const htmlTexts = [];
    const titlesMap = new Map();
    titlesMap.set(ElementType.BIG_TITLE, 'h1');
    titlesMap.set(ElementType.MEDIUM_TITLE, 'h2');
    titlesMap.set(ElementType.SMALL_TITLE, 'h3');
    titlesMap.set(ElementType.VERY_SMALL_TITLE, 'h4');

    const elements = this.document.elements.filter(element => element.page === page)
      .sort((e1, e2) => e1.row - e2.row);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const titletag = titlesMap.get(element.type);
      if (element.text) {
        if (titletag) {
          htmlTexts.push(`<${titletag}>${element.text}</${titletag}>`);
        } else if (element.type === ElementType.TEXT) {
          const subTexts = element.text.split(/\r\n|\n/);
          if (subTexts && subTexts.length) {
            htmlTexts.push(...subTexts);
          }
        }
      }
    }
    return htmlTexts;
  }

  formatElements() {
    return this.document.elements.map(element => {
      const text = element.text ? element.text.replace(/\n/g, excelReportConfig.sourceCodeNewLineSeparator) : '';
      return {
        ...element,
        text: text
      };
    });
  }

  getOptions() {
    const options = {
      ...excelReportConfig.options,
      title: this.document.name,
      keys: ['type', 'text', 'row', 'page']
    };
    return options;
  }
}
