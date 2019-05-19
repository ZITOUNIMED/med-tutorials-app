import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs';

import {DocumentWrapperState} from '../shared/document-wrapper.state';
import {AppStoreService} from '../../../shared/service/app.store.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
})
export class ContentHeaderComponent {
  @Input() documentWrapperState$: Observable<DocumentWrapperState>;
  constructor(public appStoreService: AppStoreService){}
}
