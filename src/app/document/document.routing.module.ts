import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentComponent} from './document.component';
import {DocumentSheetComponent} from './document-sheet/document-sheet.component';
import {DocumentResolverService} from './shared/service/document-resolver.service';

const routes: Routes = [
  {
    path: 'document',
    children: [
      {
        path: '',
        component: DocumentComponent
      },
      {
        path: ':id',
        component: DocumentSheetComponent,
        resolve: {
          document: DocumentResolverService
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocumentRoutingModule {

}
