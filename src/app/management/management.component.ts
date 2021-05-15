import { Component, OnInit } from '@angular/core';
import { ManagementService } from './shared/services/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private service: ManagementService) { }

  ngOnInit() {
  }

  exportDocumentsAsJson(){
    this.service.exportDocumentsAsJson()
    .subscribe(data => this.downloadFile(JSON.stringify(data))),
                 error => console.log('Error downloading the file.'),
                 () => console.info('OK');
  }

  downloadFile(data) {
    const a = document.createElement("a");
    document.body.appendChild(a);

    const blob = new Blob([data], { type: 'text/json' });

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "allAocuments.json";
    a.click();
  }
}
