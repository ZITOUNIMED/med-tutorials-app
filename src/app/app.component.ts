import { Component } from "@angular/core";

import { Document } from './document/shared/document.model';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  document: Document;

  onSelectDocument(document){
    this.document = document;
  }

  onReturnToSelectDocument(doReturn: boolean){
    if(doReturn){
      this.document = null;
    }
  }
}
