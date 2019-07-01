import { Component, OnInit, Input } from "@angular/core";
import { ElementType } from "../shared/element-type";
import { oc, isNotEmptyArray } from "src/app/shared/app-utils";
import { Document } from '../shared/model/document.model';
import { Element } from '../shared/model/element.model';
import { AppStoreService } from "src/app/shared/service/app.store.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit{
  @Input() doc: Document;
  ElementType = ElementType;

  elements: Element[] = [];

  constructor(public appStoreService: AppStoreService){}

  ngOnInit(){
    if(isNotEmptyArray(oc(this.doc).elements)){
      const pagesMap = new Map<number, Element[]>();
      this.doc.elements.filter(elt => elt.type === ElementType.BIG_TITLE ||
        elt.type === ElementType.MEDIUM_TITLE ||
        elt.type === ElementType.SMALL_TITLE
      )
      .forEach(elt => {
        let pageElements = pagesMap.get(elt.page);
        if(isNotEmptyArray(pageElements)){
          pageElements.push(elt);
        } else {
          pagesMap.set(elt.page, [elt]);
        }
      });
      const keys = Array.from(pagesMap.keys());
      keys.sort((k1, k2) => k1 - k2)
      .forEach(k => {
        const elts = pagesMap.get(k).sort((e1, e2) => e1.row - e2.row);
        this.elements.push(...elts);
      });
    }
  }
}
