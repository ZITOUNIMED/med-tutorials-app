import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AppDocument} from '../shared/model/document.model';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/internal/operators';
import {ExportDocumentService} from '../shared/service/export-document.service';
import { DisplayPdfReportComponent } from '../shared/modal/display-pdf-report/display-pdf-report.document';
import {BreakpointObserver} from '@angular/cdk/layout';
import { ADMIN_AND_SOURCER_PERMISSIONS } from 'src/app/permissions/model/app.permissions.model';

@Component({
  selector: 'app-document-sheet',
  templateUrl: './document-sheet.component.html',
  styleUrls: ['./document-sheet.component.css']
})
export class DocumentSheetComponent implements OnInit {

  document: AppDocument;
  @Output() returnToSelectDocument = new EventEmitter<boolean>();
  canDisplayModalPdf = false;
  ADMIN_AND_SOURCER_PERMISSIONS = ADMIN_AND_SOURCER_PERMISSIONS;

  constructor(private route: ActivatedRoute,
              private exportDocumentService: ExportDocumentService,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    // this.breakpointObserver.observe(['(min-width: 1200px)'])
    //   .pipe(map(res => res && res.matches))
    //   .subscribe(canDisplayModalPdf => (this.canDisplayModalPdf = canDisplayModalPdf));
    this.canDisplayModalPdf = false;
    this.route.data
      .pipe(
        filter(data => data && !!data['document']),
        map(data => data['document']),
      )
      .subscribe(doc => {
        this.document = doc;
      });
  }

  exportAsPdf() {
    const doc = this.exportDocumentService.exportAsPdf(this.document);
    if (this.canDisplayModalPdf) {
      const dialogRef = this.dialog.open(DisplayPdfReportComponent, {
        height: '700px',
        width: '900px',
        data: {
          doc: doc
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          console.log(res);
        }
      });
    } else {
      doc.save(this.document.name + '.pdf');
    }
  }
}
