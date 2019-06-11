import {Document} from '../model/document.model';
import {Element} from '../model/element.model';
import {ElementType} from '../element-type';
import * as jsPDF from 'jspdf';
import {Injectable, ElementRef} from '@angular/core';
import {excelReportConfig} from '../../../../environments/report/excel.config';

const FIRST_LINE = 30;
const LINES_MARGIN = 8;
const LINES_LEFT_MARGIN = 20;
const MAX_CONTENT_WITH = 250;
const PAGE_CENTER = 100;
@Injectable()
export class ExportDocumentService {

  exportAsPdf(doc: Document): any {
    const pdf = new jsPDF();
    pdf.page = 1;
    const htmlStringNodes = this.convertdocumentElementstoHtmlNodes(doc.elements);
    let nextLine = FIRST_LINE;
    this.insertPageHeader(doc, pdf);
    for (let i = 0; i < htmlStringNodes.length; i++) {
      const htmlText = htmlStringNodes[i];
      pdf.fromHTML(htmlText, LINES_LEFT_MARGIN, nextLine);

      if (nextLine >= MAX_CONTENT_WITH) {
        pdf.addPage();
        this.insertPageHeader(doc, pdf);
        nextLine = FIRST_LINE;
      } else {
        nextLine += LINES_MARGIN;
      }
    }

    this.addFooters(pdf);
    return pdf;
  }

  // iframe.nativeElement.src = pdf.output('datauristring');
  // pdf.save(document.name + '.pdf');

  private insertPageHeader(doc: Document, pdf: any) {
    const page = pdf.internal.getCurrentPageInfo().pageNumber;
    if (page === 1) { // first page
      pdf.fromHTML(`<h3>${doc.name}<h3>`, PAGE_CENTER - 20, 10);
    }
  }

  private addFooters(pdf: any) {
    const pageCount = pdf.internal.getNumberOfPages();
    pdf.setFontSize(11);
    for (let i = 0; i < pageCount; i++) {
      pdf.setPage(i);
      const page = pdf.internal.getCurrentPageInfo().pageNumber;
      const text = `Page ${page}/${pageCount}`;
      pdf.text(text, PAGE_CENTER, 280);
    }
  }

  private convertdocumentElementstoHtmlNodes(elements: Element[]): string[] {
    const documentHtmlTextElements = [];
    const biggerPage = this.getElementsBiggerPage(elements);
    for (let page = 0; page <= biggerPage; page++) {
      const pageHtmlElements = this.convertPageElementstoHtmlNodes(elements, page);
      if (pageHtmlElements && pageHtmlElements.length) {
        documentHtmlTextElements.push(...pageHtmlElements);
      }
    }

    return documentHtmlTextElements;
  }

  private convertPageElementstoHtmlNodes(elements: Element[], page: number) {
    const htmlTexts = [];
    const titlesMap = new Map();
    titlesMap.set(ElementType.BIG_TITLE, 'h1');
    titlesMap.set(ElementType.MEDIUM_TITLE, 'h2');
    titlesMap.set(ElementType.SMALL_TITLE, 'h3');
    titlesMap.set(ElementType.VERY_SMALL_TITLE, 'h4');

    const elts = elements.filter(element => element.page === page)
      .sort((e1, e2) => e1.row - e2.row);

    for (let i = 0; i < elts.length; i++) {
      let subTexts = [];
      const element = elts[i];
      const titletag = titlesMap.get(element.type);
      if (element.text) {
        if (titletag) {
          subTexts = this.convertTitleToHtmlNodes(titletag, element.text);
        } else if (element.type === ElementType.TEXT) {
          subTexts = this.convertTextToHtmlNodes(element.text);
        } else if (element.type === ElementType.SOURCE_CODE) {
          subTexts = this.convertSourceCodeToHtmlNodes(element.text);
        }
        htmlTexts.push(...subTexts);
      }
    }
    return htmlTexts;
  }

  private getElementsBiggerPage(elements: Element[]): number {
    let biggerPage = 0;
    if (elements && elements.length > 0) {
      biggerPage = elements.sort((e1, e2) => e2.page - e1.page)[0].page;
    }
    return biggerPage;
  }

  private convertTitleToHtmlNodes(titletag: string, text: string): string[] {
    return [`<${titletag}>${text}</${titletag}>`, ''];
  }

  private convertTextToHtmlNodes(text: string): string[] {
    const subTexts = text.split(/\r\n|\n/);
    if (subTexts && subTexts.length) {
      return subTexts.map(txt => `<span>${txt}</span><br/>`);
    }
    return [];
  }

  private convertSourceCodeToHtmlNodes(text: string): string[] {
    const subTexts = text.split(/\r\n|\n/);
    if (subTexts && subTexts.length) {
      subTexts.unshift('');
      return subTexts.map(txt => `<textarea>${txt}</textarea><br/>`);
    }
    return [];
  }

  formatElementsTextForExcelExporting(elements: Element[]): Element[] {
    const excelData = [];
    elements.forEach(element => {
      let text = element.text ? element.text.replace(/\n/g, excelReportConfig.newLineSeparator) : '';
      text = text ? text.replace(/"/g, excelReportConfig.doubleQuoteString) : '';
      excelData.push({...element, text: text});
    });
    return excelData;
  }
}
