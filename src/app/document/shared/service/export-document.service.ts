import {Document} from '../model/document.model';
import {Element} from '../model/element.model';
import {ElementType} from '../element-type';
import * as jsPDF from 'jspdf';
import {Injectable} from '@angular/core';

@Injectable()
export class ExportDocumentService {

  exportAsPdf(document: Document) {
    const doc = new jsPDF();
    const htmlStringNodes = this.convertDocumentElementstoHtmlNodes(document.elements);
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
    doc.save(document.name + '.pdf');
  }

  private convertDocumentElementstoHtmlNodes(elements: Element[]): string[] {
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
    return [`<${titletag}>${text}</${titletag}>`];
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
      return subTexts.map(txt => `<textarea>${txt}</textarea><br/>`);
    }
    return [];
  }
}
