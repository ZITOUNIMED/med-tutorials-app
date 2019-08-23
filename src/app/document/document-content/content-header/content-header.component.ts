import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Observable} from 'rxjs';

import {DocumentWrapperState} from '../shared/document-wrapper.state';
import {AppStoreService} from '../../../shared/service/app.store.service';
import { AppDocument } from '../../shared/model/document.model';
import { AppPermissions } from 'src/app/permissions/model/app.permissions.model';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import { oc, isNotEmptyArray } from 'src/app/shared/app-utils';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit, OnChanges{
  @Input() documentWrapperState$: Observable<DocumentWrapperState>;
  @Input() doc: AppDocument;
  documentPermissions: AppPermissions;
  pagesIndex = [];
  constructor(public appStoreService: AppStoreService){}
  
  ngOnInit(): void {
    this.documentPermissions = {
      targetType: AppTargetTypes.DOCUMENT,
      confidentialities: [],
      targetObject: this.doc,
    };

    this.appStoreService.getDocumentWrapper()
    .subscribe(documentWrapperState => {
      if(documentWrapperState && isNotEmptyArray(documentWrapperState.elements)){
        let elements = documentWrapperState.elements;
        const biggerPage = elements.sort((e1, e2) => e2.page - e1.page)[0].page;
        this.pagesIndex= Array(biggerPage + 1).fill(0).map((x,i)=>i);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.appStoreService.movePage(event.previousIndex, event.currentIndex);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(oc(changes).doc){
      this.documentPermissions = {
        targetType: AppTargetTypes.DOCUMENT,
        confidentialities: [],
        targetObject: changes.doc.currentValue,
      };
    }
  }
}
