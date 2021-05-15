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
    .subscribe(res => {
      console.log(res);
    })
  }

}
