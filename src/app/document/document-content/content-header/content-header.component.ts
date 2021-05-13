import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Observable} from 'rxjs';

import {DocumentWrapperState} from '../shared/document-wrapper.state';
import {AppStoreService} from '../../../shared/service/app.store.service';
import { AppDocument } from '../../shared/model/document.model';
import { AppPermissions } from 'src/app/permissions/model/app.permissions.model';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import { oc } from 'src/app/shared/app-utils';
import { emptyElement } from '../../shared/model/element.model';
import { ElementType } from '../../shared/element-type';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit, OnChanges{
  @Input() documentWrapperState$: Observable<DocumentWrapperState>;
  @Input() doc: AppDocument;
  documentPermissions: AppPermissions;
  ElementType = ElementType;

  constructor(public appStoreService: AppStoreService){}
  
  ngOnInit(): void {
    this.documentPermissions = {
      targetType: AppTargetTypes.DOCUMENT,
      confidentialities: [],
      targetObject: this.doc,
    };
    
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "450px";
  }

  newEmptyElement(type: ElementType){
    const element = emptyElement();
    element.type = type;
    return element;
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
